
# JudgeLib

**JudgeLib** is a scalable, Redis-backed Node.js library for secure and efficient online code execution. Designed for educational and competitive programming platforms, JudgeLib provides distributed execution, language support, and isolated process handling out of the box.

---

## Official Documentation

[View Docs](https://judge-lib-mg91.vercel.app/)

> Make sure that the workers are running. You can ping the worker [here](https://judge-lib-mg91.vercel.app/npm).
> If using the microservice, hit/open [link](https://judge-microser.onrender.com) to ensure the service is active.

---

## Installation

Install JudgeLib in your Node.js project:

```bash
npm install lib-judge
```

---

## Getting Started

### Example (ES Modules)

```js
import { judge } from 'lib-judge';

const result = await judge({
  codePath: '/path/to/temp/file.py',
  ques_name: 'sum of array',
  input: '5 1 2 3 4 5 ### 3 1 2 3 ### 2 1 2',
  output: '15 ### 6 ### 3',
  timeout: 2,           // timeout per test case in seconds
  sizeout: 64,          // max output size in KB
  language: 'py'        // language code: 'py', 'cpp', 'java'
});

console.log(result);
```

---

## Supported Languages

| Language | Version | Extension |
| -------- | ------- | --------- |
| Python   | 3.11    | `.py`     |
| Java     | 17      | `.java`   |
| C++      | GCC 11  | `.cpp`    |

---

## How It Works

1. Each submission is split into multiple test cases.
2. Test cases are pushed into a Redis queue.
3. Distributed workers poll the queue and process tasks.
4. Code is compiled (if needed), executed, and validated securely.
5. Results are aggregated and returned.

---

## Deployment Options

### 1. NPM Library (Required)

Install this library in your app to submit code for evaluation.

* Splits test cases into batches
* Sends to Redis queue
* Retrieves results back

### 2a. Free Microservice (Cloud Hosted)

Use our free hosted service on Render:

* 3 worker instances
* Slow cold starts
* Good for testing

### 2b. Self-Host (Recommended)

Deploy on your infrastructure with Docker & Kubernetes:

* Docker isolation
* Auto-scaling with KEDA
* Production ready

---

### Quick Comparison

| Feature      | Free Microservice | Self-Host       |
| ------------ | ----------------- | --------------- |
| Security     | Basic             | Docker Isolated |
| Performance  | Slow starts       | Fast            |
| Auto-scaling | Fixed             | ✓ KEDA          |
| Best For     | Testing           | Production      |

> Self-hosting gives better security, performance, and auto-scaling. Ideal for production workloads.

---

## Why Use JudgeLib?

* **Batch Processing** – Divides large sets of test cases into smaller batches for faster execution.
* **Redis Integration** – Test cases and execution data are stored and managed in Redis for distributed coordination.
* **Worker System** – Background workers fetch batched test cases from Redis and execute them in isolated environments.
* **Language Agnostic** – Use JudgeLib from any programming language or framework via simple HTTP requests.
* **Horizontal Scaling** – Deploy multiple worker instances behind a load balancer.
* **Isolated Environment** – Run code execution separately from your main application.

---

## Self-Host Prerequisites

1. **Chocolatey Package Manager**
   Follow the [official installation guide](https://chocolatey.org/install). (Requires admin privileges)

2. **Kubernetes CLI (kubectl)**

```bash
choco install kubernetes-cli
kubectl version --client
```

3. **Kind (Kubernetes IN Docker)**

```bash
choco install kind
kind version
```

4. **Helm**

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
```

5. **Port Forward to Redis (Optional)**

```bash
kubectl port-forward -n judge-namespace redis-0 6379:6379
```

---

## Self-Host Setup

### Step 1: Install NPM Package

```bash
npm install lib-judge
```

### Step 2: Environment Configuration

Create a `.env` file:

```ini
password_redis=your_redis_password
host_redis=redis-service.judge-namespace.svc.cluster.local
redis_port=6379
```

### Step 3: Deploy Worker Container (Optional)

```bash
docker pull lightningsagar/worker:e78c86a716f441816d766f08459ab86ae32f9717
```

### Step 4: Setup Kubernetes Operations

```bash
git clone https://github.com/lightning-sagar/worker-ops
```

> Customize code as needed.

### Step 5: Deploy to Kubernetes

```bash
# Create Cluster
kind create cluster --config ./cluster.yml -n workers-clusters

# Create Namespace
kubectl create namespace judge-namespace

# Deploy Workers
kubectl apply -f judge-workers
```

> The HPA configuration automatically scales your worker pods based on CPU usage and request load.

---

## Performance & Scaling

Currently deployed on Render with 3 active workers:

| Metric            | Estimate                  |
| ----------------- | ------------------------- |
| Uptime            | ~98–99%                   |
| Avg Response Time | 0.8–1.5s per test case    |
| Executions/Day    | ~20,000–40,000 test cases |

> JudgeLib scales horizontally; adding more workers reduces latency and increases throughput.

---

## Built With

* Node.js
* Redis
* Docker & Kubernetes
* Helm
* Kind (Kubernetes IN Docker)

---

