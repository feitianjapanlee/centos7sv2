FROM centos:7
WORKDIR /host
COPY svisitc-2.0.0-9.el7.x86_64.rpm .
COPY ./etc/svcert.bin .
# maybe there's patch rpm
COPY *patch-2.0.0-9.el7.x86_64.rpm .
RUN yum install -y epel-release
RUN yum install -y perl crontabs policycoreutils selinux-policy-targeted initscripts rsyslog tzdata
RUN rpm -ivh svisitc-2.0.0-9.el7.x86_64.rpm --nodeps --force
RUN if [ -f ./patch-2.0.0-9.el7.x86_64.rpm ]; then rpm -ivh patch-2.0.0-9.el7.x86_64.rpm --nodeps --force; fi
EXPOSE 8888
VOLUME ["/sys/fs/cgroup"]
CMD ["/sbin/init"]
# start the container cli: docker exec -it <container> /bin/sh
# /svisit/sbin/sv_init
# service svisitd start 
