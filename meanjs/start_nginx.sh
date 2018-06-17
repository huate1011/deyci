#!/bin/bash
docker stop nginx || true
docker rm nginx || true
docker run --name nginx --link meanjs:meanjs -v ${PWD}/nginx/conf.d:/etc/nginx/conf.d -v ${PWD}/nginx/certs:/etc/nginx/certs -d -p 443:443 -p 80:80 nginx:1.14.0
