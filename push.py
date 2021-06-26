#! /usr/bin/python

from os import system

TAG: str = input("Version Tag: ")

system("docker build -t devsamuelv/pinky-bot .")
system("docker tag devsamuelv/pinky-bot devsamuelv/pinky-bot:"+TAG)
system("docker push devsamuelv/pinky-bot:"+TAG)
