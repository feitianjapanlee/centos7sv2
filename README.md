# centos7sv2 The SecureVisit Playground

A docker playground for SecureVisit 2.0.0.9 RHEL.
It contains
- a SecureVisit 2.0.0.9 RHEL running on a CentOS7.9, port 8888 for admin portal.
- a dumy backend web application server, port 5000 for HTTP access.
- a PostgreSQL server for the backend server, service on port 5432.

## Dependencies
- Docker Desktop for Windows (>4.4.2)
- (optional) pgAdmin

## To start this playground
### Bring up servers
Place SecureVisit install rpm `svisitc-2.0.0-9.el7.x86_64.rpm` in the `svisit2` sub-folder, and run following command in terminal:
```bash
cd centos7sv2
docker-compose up
```
### Finish SecureVisit initialization by following steps:  
- Open another terminal and attach to the svisit2 container. 
```bash
docker exec -it centos7sv2-svisit2-1 bash
```
- Run initialize scripts in the svisit2 container.
```bash
/svisit/sbin/sv_init
service svisitd start
exit
```
- Install SecureVisit admin client certificate `svisit2/admin.p12` to your browser. Usually uses cert import function in your browser.

## Have fun
- SecureVisit admin portal: `https://localhost:8888/`
- Backend web application server: `http://localhost:5000/` 
- SecureVisit mapping setting to backend server: Port `8080`, `default` map to `http://backend-web:3000/`
- SecureVisit fresh logs: `docker exec -it centos7sv2-svisit2-1 bash -c "tail -f /svisit/logs/*.log"`
- Use pgAdmin to access PostgreSQL server. User/Password are both `postgres`, port `5432`.