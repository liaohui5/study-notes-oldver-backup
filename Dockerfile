FROM nginx:stable

WORKDIR /usr/share/nginx/html
ADD . /usr/share/nginx/html

# replace default nginx.conf
RUN mv /usr/share/nginx/html/build /etc/nginx
#RUN rm -rf /etc/nginx/nginx.conf
RUN mv /etc/nginx/build/nginx.conf /etc/nginx/nginx.conf

# restart nginx
RUN service nginx restart

EXPOSE 443
