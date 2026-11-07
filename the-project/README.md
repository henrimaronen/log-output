# The Project

## Commands 1.5

`docker build -t henronen/the-project:1.6 .`
`docker push henronen/the-project:1.6`
`kubectl apply -f the-project/manifests/deployment.yaml`
`kubectl rollout status deploy/the-project`
`kubectl logs -l app=the-project`
`kubectl port-forward deploy/the-project 3000:9000`
