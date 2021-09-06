#! /usr/bin/python

from os import system

TAG = input("Version Tag: ")

system("docker build -t devsamuelv/pinky .")
system("docker tag devsamuelv/pinky devsamuelv/pinky:"+str(TAG))
system("docker push devsamuelv/pinky:"+str(TAG))
