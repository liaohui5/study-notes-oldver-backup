FROM nginx:stable

WORKDIR /usr/share/nginx/html
ADD . /usr/share/nginx/html

# replace default nginx.conf
RUN mv /usr/share/nginx/html/cakeys /etc/nginx/cakeys
RUN rm -rf /etc/nginx/nginx.conf
RUN mv /usr/share/nginx/html/nginx.conf /etc/nginx/nginx.conf

EXPOSE 443

CMD ["service", "nginx", "restart"]
