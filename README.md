# centos7sv2 The SecureVisit Playground

A docker playground for SecureVisit 2.0.0.9 RHEL.
It contains
- a SecureVisit 2.0.0.9 RHEL running on a CentOS7.9, port 8888 for admin portal.
- a dumy backend web application server, port 3000 for direct web access.
- a PostgreSQL server for the backend server, service on port 5432.

## Dependencies
- Docker Desktop(docker-compose)
- (optional)pgAdmin

## To start this playground
### Bring up servers
Place SecureVisit install rpm `svisitc-2.0.0-9.el7.x86_64.rpm` in the `svisit2` subfolder, and run following docker command:
```bash
docker-compose up
```
### Finish SecureVisit initialization, run following steps:  
- Open another terminal and attach to the svisit2 container. 
```bash
docker exec -it centos7sv2_svisit2_1 /bin/sh
```
- Run svisit initialize scripts.
```bash
#/svisit/sbin/sv_init
#service svisitd start
```
## Have fun
- Access `https://localhost:8888/` for SecureVisit admin portal.
- Access `https://localhost:3000/` for backend web application server.
- Use pgAdmin to access PostgreSQL server. User/Password are both `postgres`, port 5432.
