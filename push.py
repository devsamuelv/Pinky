#! /usr/bin/python

from os import system

VERSION_NUMBER: float = input("Image Number: ")

print("PUSHING WITH VERSION NUMBER " + VERSION_NUMBER)

if VERSION_NUMBER != None and type(VERSION_NUMBER) != float:
    system("docker build -t devsamuelv/pinky-bot .")
    # system("docker tag pinky-bot devsamuelv/pinky-bot")
    system("docker push devsamuelv/pinky-bot:" + VERSION_NUMBER)
else:
    print("Please enter the proper version number")
