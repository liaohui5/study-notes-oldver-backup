FROM nginx:stable

WORKDIR /usr/share/nginx/html
ADD . /usr/share/nginx/html

# replace default nginx.conf
RUN mv /usr/share/nginx/html/nginx/cakeys /etc/nginx/cakeys
RUN rm -rf /etc/nginx/nginx.conf
RUN mv /usr/share/nginx/html/nginx/nginx.conf /etc/nginx/nginx.conf

# restart nginx
RUN service nginx restart

EXPOSE 443
