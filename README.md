# centos7sv2
A docker playground for SecureVisit 2.0.0.9 RHEL.
It contains
- a SecureVisit 2.0.0.9 RHEL running on a CentOS7.9
- a dumy backend server
- a MySQL server for the backend server
## To start this playground 
Place SecureVisit install rpms in local folder, like c:\local\svisit2009, and run following docker command:
```bash
docker run -d --name centos7sv2 -v c:\local\svisit2009:/host -p 8888:8888 --privileged centos:7 /sbin/init
```
## To start a container with svisit already installed, run "docker-compose up", and run following steps:  
start the container cli: 
```bash
docker exec -it centos7sv2_svisit2_1 /bin/sh
/svisit/sbin/sv_init
service svisitd start
```
