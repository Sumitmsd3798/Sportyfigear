FROM mysql:8.0
ENV MYSQL_ROOT_PASSWORD=rootpass
ENV MYSQL_DATABASE=sportify
ENV MYSQL_USER=sport
ENV MYSQL_PASSWORD=sportpass
COPY init.sql /docker-entrypoint-initdb.d/init.sql
EXPOSE 3306
