#!/bin/bash

domain=$1;
path=$2;

mkdir -p $path \
   && mkcert -key-file $path/$domain.key.pem \
   -cert-file $path/$domain.cert.pem "$domain"

mkcert -install
