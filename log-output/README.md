# Log output

## 1.1

Create a cluster
`k3d cluster create -a 2`

Build and push the image
`docker build -t <name>/log-output:1.0 .`
`docker push <name>/log-output:1.0`

Deploy
`kubectl apply -f manifests/deployment.yaml`

Check the deployment and pod
`kubectl get deployments`
`kubectl get pods`

Debug if the pod doesn't start
`kubectl describe pod -l app=log-output`

Inspect logs
`kubectl logs -f deployment/log-output`

Clean up
`kubectl delete -f manifests/deployment.yaml`

## 1.7

Build and push the image
`docker build -t henronen/log-output:1.7 .`
`docker push henronen/log-output:1.7`

Deploy the deployment, service and ingress
`kubectl apply -f manifests/`

Call the endpoint

```
curl -s localhost:8081/status | jq .
{
  "timestamp": "2026-11-07T12:20:49.565Z",
  "randomString": "7a766f251dd63d4a9c8e6a71"
}
```

Inspect logs of pod
`kubectl logs {pod-name}`



```
localhost:8081
↓
k3d load balancer (port 80)
↓
Traefik Ingress (log-output-ingress, path /)
↓
ClusterIP Service (log-output-svc, port 2345)
↓
Pod container:8888 (log-output)
```
## 1.10

`docker build -t henronen/log-output:2.1 log-output`
`docker push henronen/log-output:2.1`
`kubectl logs deploy/log-output -c log-writer -f`
`kubectl logs deploy/log-output -c log-reader -f`
`curl localhost:8081/`