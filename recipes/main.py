from sys import argv

with open(argv[1], 'r') as file:
    cont = file.read()

i = 0

while cont.count('id: IDManger.getNextId(),'):
    i += 1
    cont = cont.replace('id: IDManger.getNextId(),', f'id: {i},', 1)

with open(argv[1], 'w') as file:
    file.write(cont)