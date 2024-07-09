#!/bin/bash
# Publish pages via Helix admin API
# takes as input a list of page paths to publish, without leading /
export OWNER=bdelacretaz
export REPO=devblog24
export REF=main

if [[ -z "$HLX_COOKIES" ]]
then
  echo "HLX_COOKIES is not set"
  exit 1
fi
while read path
do
  URL="https://admin.hlx.page/live/${OWNER}/${REPO}/${REF}/${path}"
  echo "publishing via $URL"
  curl -XPOST -H cookie:$HLX_COOKIES $URL
  echo
done