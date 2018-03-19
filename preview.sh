#!/usr/bin/bash

cleanup () {
	rm -rf public/*
	lsof -ti tcp:8088 | xargs kill
}
trap "exit" INT TERM
trap "cleanup" EXIT

devd --port=8088 -l public &
makewatch 

