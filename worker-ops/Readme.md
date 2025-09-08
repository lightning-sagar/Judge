

---

# Judge Workers Kubernetes Setup

This repository contains the Kubernetes manifests required to deploy and scale the **Judge Workers** application. It includes:

1. **Deployment** – Runs multiple instances of the `judge-worker` container.
2. **Horizontal Pod Autoscaler (HPA)** – Automatically scales the number of worker pods based on CPU utilization.
3. **Service** – Exposes the workers via a `NodePort` for external access.

---

## **Architecture Overview**

```
          +--------------------+
          |   User / Client    |
          +--------------------+
                    |
                    v
            [ NodePort Service ]
                    |
                    v
           +-------------------+
           |  Judge Workers    |
           |  Deployment       |
           |  (Pods)           |
           +-------------------+
                    |
                    v
              [ Redis Cache ]
```

The `judge-workers` interact with Redis to process tasks efficiently. The system scales dynamically based on CPU load.

---

## **Files Overview**

| File              | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| `hpa.yaml`        | Defines the Horizontal Pod Autoscaler (HPA) to manage scaling. |
| `deployment.yaml` | Defines the Deployment for judge-workers.                      |
| `service.yaml`    | Defines the NodePort Service to expose the application.        |

> In this example, all three configurations are combined in a single YAML file.

---

## **Components**

### 1. **Horizontal Pod Autoscaler (HPA)**


**Explanation:**

* **minReplicas:** Minimum of 3 pods running at all times.
* **maxReplicas:** Can scale up to 12 pods if CPU demand increases.
* **averageUtilization:** Each pod tries to maintain 70% CPU utilization.

---

### 2. **Deployment**



**Key Features:**

* **Replicas:** Starts with 3 pods.
* **Resource Requests & Limits:**

  * Request: 256Mi memory, 500m CPU
  * Limit: 512Mi memory, 1000m CPU
* **Readiness Probe:** Ensures the pod is ready by checking if `g++` is available.
* **Environment Variables:**

  * Configures Redis host and password.
  * Assigns worker ID and port.

---

### 3. **Service**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: cpu-service
spec:
  type: NodePort
  selector:
    app: judge-workers
  ports:
    - protocol: TCP
      port: 5000
      targetPort: 5000
      nodePort: 30000
```

**Key Details:**

* **Type:** `NodePort` – exposes the service on each node’s IP at port `30000`.
* **Port Mapping:**

  * External Port: `30000`
  * Internal Container Port: `5000`

---

## **How to Deploy**

### Step 1: Apply the Configuration

Make sure you are connected to your Kubernetes cluster, then run:

```bash
kubectl apply -f judge-workers.yaml
kubectl apply -f hpa.yaml
```

---

### Step 2: Verify Deployment

Check if pods are running:

```bash
kubectl get pods
```

Check if HPA is working:

```bash
kubectl get hpa
```

---

### Step 3: Access the Application

Get the node IP:

```bash
kubectl get nodes -o wide
```

Then access your service at:

```
http://<NODE_IP>:30000
```

---

## **Scaling Behavior**

| CPU Utilization | Number of Pods                       |
| --------------- | ------------------------------------ |
| Below 70%       | Stays at minimum (3 pods)            |
| Around 70%      | Stable pod count                     |
| Above 70%       | Scales up gradually to max (12 pods) |

---

## **Cleanup**

To remove all resources:

```bash
kubectl delete -f judge-workers.yaml
```

---

## **Future Improvements**

* Add logging and monitoring with **Prometheus & Grafana**.
* Use **ConfigMaps** or **Secrets** for Redis credentials.
* Implement rolling updates for zero downtime.

---

## **Author**

**Lightning Sagar**
Docker Image: `lightningsagar/worker:4`

---

