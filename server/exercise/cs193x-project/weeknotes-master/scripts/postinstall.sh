#!/bin/bash
if $BUILD_WEBPACK; then
  cd client
  npm run build
fi  

