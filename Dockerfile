FROM centos:7
WORKDIR /host
COPY svisitc-2.0.0-9.el7.x86_64.rpm .
RUN yum install -y epel-release
RUN yum install -y perl crontabs policycoreutils selinux-policy-targeted initscripts rsyslog
RUN rpm -ivh svisitc-2.0.0-9.el7.x86_64.rpm --nodeps --force
EXPOSE 8888
CMD ["/sbin/init"]
# start the container cli: docker exec -it <container> /bin/sh
# /svisit/sbin/sv_init
# service svisitd start 
