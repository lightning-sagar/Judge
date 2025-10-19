"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Wifi, CheckCircle, XCircle, Loader2, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const workers = [
  { id: 1, name: "Worker 1", url: process.env.NEXT_PUBLIC_WOKRER1 as string },
  { id: 2, name: "Worker 2", url: process.env.NEXT_PUBLIC_WORKER2 as string},
  { id: 3, name: "Worker 3", url: process.env.NEXT_PUBLIC_WORKER3 as string},
  { id: 4, name: "Microservice", url: process.env.NEXT_PUBLIC_Microservice  as string},
]

type WorkerStatus = "idle" | "countdown" | "pinging" | "success" | "error"

interface WorkerState {
  status: WorkerStatus
  responseTime?: number
  countdown?: number
}

export function PingWorker() {
  const [isOpen, setIsOpen] = useState(false)
  const [workerStates, setWorkerStates] = useState<Record<number, WorkerState>>(
    workers.reduce(
      (acc, worker) => ({
        ...acc,
        [worker.id]: { status: "idle" },
      }),
      {},
    ),
  )

  const pingWorker = async (worker: (typeof workers)[0]) => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000)  
    const startTime = Date.now()

    try {
      const response = await fetch(worker.url, {
        method: "GET",
        signal: controller.signal,
      })

      const endTime = Date.now()
      const responseTime = endTime - startTime

      if (response.ok) {
        setWorkerStates((prev) => ({
          ...prev,
          [worker.id]: { status: "success", responseTime },
        }))
      } else {
        setWorkerStates((prev) => ({
          ...prev,
          [worker.id]: { status: "error" },
        }))
      }
    } catch (error) {
      setWorkerStates((prev) => ({
        ...prev,
        [worker.id]: { status: "error" },
      }))
      console.error("Ping error:", error)
    } finally {
      clearTimeout(timeout)
    }
  }

  const startPinging = async () => {
    setWorkerStates(
      workers.reduce(
        (acc, worker) => ({
          ...acc,
          [worker.id]: { status: "countdown", countdown: 3 },
        }),
        {},
      ),
    )

    for (let i = 3; i >= 1; i--) {
      setWorkerStates(() =>
        workers.reduce(
          (acc, worker) => ({
            ...acc,
            [worker.id]: { status: "countdown", countdown: i },
          }),
          {},
        ),
      )
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    setWorkerStates(() =>
      workers.reduce(
        (acc, worker) => ({
          ...acc,
          [worker.id]: { status: "pinging" },
        }),
        {},
      ),
    )

    await Promise.all(workers.map((worker) => pingWorker(worker)))
  }


  const getStatusIcon = (state: WorkerState) => {
    switch (state.status) {
      case "countdown":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "pinging":
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Wifi className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusText = (state: WorkerState) => {
    switch (state.status) {
      case "countdown":
        return `${state.countdown}...`
      case "pinging":
        return "Pinging..."
      case "success":
        return `${state.responseTime}ms`
      case "error":
        return "Failed"
      default:
        return "Ready"
    }
  }

  const getStatusColor = (state: WorkerState) => {
    switch (state.status) {
      case "countdown":
        return "bg-orange-100 text-orange-700"
      case "pinging":
        return "bg-blue-100 text-blue-700"
      case "success":
        return "bg-green-100 text-green-700"
      case "error":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="border-orange-500 text-orange-500 hover:bg-orange-50"
      >
        <Wifi className="w-4 h-4 mr-2" />
        Ping Workers
        <ChevronDown className={cn("w-4 h-4 ml-2 transition-transform", isOpen && "rotate-180")} />
      </Button>

      {isOpen && (
        <Card className="absolute top-full mt-2 w-80 z-10 shadow-lg">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Worker Status</h4>
                <Button
                  size="sm"
                  onClick={startPinging}
                  disabled={Object.values(workerStates).some(
                    (state) => state.status === "countdown" || state.status === "pinging",
                  )}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Start Ping Test
                </Button>
              </div>

              <div className="space-y-2">
                {workers.map((worker) => {
                  const state = workerStates[worker.id]
                  return (
                    <div key={worker.id} className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(state)}
                        <span className="font-medium text-sm">{worker.name}</span>
                      </div>
                      <Badge variant="secondary" className={getStatusColor(state)}>
                        {getStatusText(state)}
                      </Badge>
                    </div>
                  )
                })}
              </div>

              <div className="text-xs text-gray-500 pt-2 border-t">
                <p>Testing connectivity to JudgeLib worker instances</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
