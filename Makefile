.PHONY: release

# Usage: make release TAG=1.7 FOLDER=the-project
release:
	@test -n "$(TAG)" -a -n "$(FOLDER)" || { echo "Usage: make release TAG=<tag> FOLDER=<folder>" >&2; exit 1; }
	./scripts/release.sh $(TAG) $(FOLDER)
