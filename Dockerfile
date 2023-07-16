FROM nginx:stable

WORKDIR /usr/local/wwwroot
ADD .   /usr/local/wwwroot

# replace default nginx.conf
RUN rm -rf /etc/nginx/nginx.conf
RUN mv /usr/local/wwwroot/__build__      /etc/nginx/__build__
RUN mv /etc/nginx/__build__/nginx.conf   /etc/nginx/nginx.conf

# restart nginx
RUN service nginx start

EXPOSE 443
