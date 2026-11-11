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