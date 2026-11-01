#!/usr/bin/env bash
# Usage: ./release.sh <tag> <folder>   e.g. ./release.sh 1.2 the-project
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <tag> <folder>" >&2
  exit 1
fi

readonly TAG="$1"
readonly FOLDER="${2%/}"

if [[ ! -d "$FOLDER" ]]; then
  echo "Error: folder '$FOLDER' does not exist" >&2
  exit 1
fi

if git rev-parse -q --verify "refs/tags/$TAG" >/dev/null; then
  echo "Error: tag '$TAG' already exists" >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Error: uncommitted changes, commit them before tagging" >&2
  exit 1
fi

git tag "$TAG"
git push origin main
git push origin "$TAG"

repo_url="$(git remote get-url origin)"
repo_url="${repo_url%.git}"
repo_url="${repo_url/git@github.com:/https://github.com/}"

echo
echo "Released: $repo_url/tree/$TAG/$FOLDER"
