import os

comment = input("commit message: ")

os.system('git add .')
os.system('git commit -m "' + comment + '"')
