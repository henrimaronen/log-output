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