.PHONY: apply

# The /pingpong route lives in the Ingress shared with log-output.
SHARED_INGRESS := ../log-output/manifests/ingress.yaml

# Usage: make apply
apply:
	kubectl apply -f manifests/ -f $(SHARED_INGRESS)
