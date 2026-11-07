# The Project

## Commands 1.5

- `docker build -t henronen/the-project:1.6 .`
- `docker push henronen/the-project:1.6`
- `kubectl apply -f the-project/manifests/deployment.yaml`
- `kubectl rollout status deploy/the-project`
- `kubectl logs -l app=the-project`
- `kubectl port-forward deploy/the-project 3000:9000`



## Exercise 1.6


```
localhost:9000
↓
k3d load balancer (k3d-k3s-default-serverlb, 192.168.148.5)
↓
node:30080 (NodePort, the-project-svc, port 1234)
↓
Pod container:9000 (the-project)
```

