#!/bin/bash

mkdir -p public/
cp client/*.html public/

mkdir -p public/js/
6to5 --modules amd client/js/ -d public/js/

