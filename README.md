# EARForest

## setup

1. after cloning the repo run `npm install` to download dependencies
2. then create a file called `.env` in the root directory with the following:
```
SERVER_IP=165.232.132.201
SERVER_PORT=80
MAX_IP=192.168.86.42
MAX_PORT=2222
```
where SERVER_IP && SERVER_PORT refer to the IP/PORT of the machine running `server.js`, and MAX_IP/MAX_PORT refers to the machine running `proxy.js` as well as the MAX app.

## run

1. on the machine running the server run:
```
node server.js
```

2. on the machine running the MAX app run:
```
node proxy.js
```
