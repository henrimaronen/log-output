# The Project

## Commands 1.5

- `docker build -t henronen/the-project:1.6 .`
- `docker push henronen/the-project:1.6`
- `kubectl apply -f the-project/manifests/deployment.yaml`
- `kubectl rollout status deploy/the-project`
- `kubectl logs -l app=the-project`
- `kubectl port-forward deploy/the-project 3000:9000`

## Exercise 1.6

- `k3d cluster create --port 9000:30080@agent:0 -p 8081:80@loadbalancer --agents 2`

```
localhost:9000
↓
k3d load balancer (k3d-k3s-default-serverlb, 192.168.148.5)
↓
node:30080 (NodePort, the-project-svc, port 1234)
↓
Pod container:9000 (the-project)
```

## Exercices 1.7

```bash
kubectl delete -f log-output/manifests/
```

```bash
kubectl apply -f the-project/manifests/
```

```bash
kubectl describe ingress the-project-ingress
```

```bash
curl -s localhost:8081 | jq .
```

## Exercise 1.12

`docker compose up -d`

```bash
curl -s localhost:8080 | jq .
```

```bash
curl -s localhost:8080/picture | jq .
```

```bash
docker exec k3d-k3s-default-agent-0 ls /tmp/kube/the-project
```

## Exercise 2.2

Local (`npm run dev` in both services, todo-app on 9000, todo-backend on 3000)

```bash
curl -i -X POST localhost:3000/todos -d "title=Learn Kubernetes"
```

```bash
curl -s localhost:3000/todos | jq .
```

Build and push

```bash
docker build -t henronen/todo-backend:1.1 the-project/services/todo-backend
docker push henronen/todo-backend:1.1
docker build -t henronen/the-project:1.8 the-project/services/todo-app
docker push henronen/the-project:1.8
```

Deploy

```bash
kubectl delete ingress log-output-ingress
kubectl apply -f the-project/manifests/ \
  -f the-project/services/todo-app/manifests/ \
  -f the-project/services/todo-backend/manifests/
kubectl rollout status deploy/the-project
kubectl rollout status deploy/todo-backend
```

Verify

```bash
kubectl get pods,svc,ingress
curl -i -X POST localhost:8081/todos -d "title=From ingress"
curl -s localhost:8081/todos | jq .
```

## Exercise 2.4

Create new namespace

- `kubectl create ns project`

Delete resources from default namespace

- `kubectl delete deployment the-project todo-backend -n default`
- `kubectl delete service the-project-svc todo-backend-svc -n default`
- `kubectl delete ingress the-project-ingress -n default`

Verify that default namespace is empty

- `kubectl get pvc -n default` 
