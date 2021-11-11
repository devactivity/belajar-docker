FROM alpine:3.8
LABEL authors="Dev Activity"

ENV VERSION 5

RUN apk add --update apache2 php${VERSION}-apache2 php${VERSION} && \
	rm -rf /var/cache/apk/* && \
	mkdir /run/apache2/ && \
	rm -rf /var/www/localhost/htdocs/index.html && \
	echo "<?php phpinfo(); ?>" > /var/www/localhost/htdocs/index.php && \
	chmod 755 /var/www/localhost/htdocs/index.php
	
EXPOSE 80/tcp

ENTRYPOINT ["httpd"]
CMD ["-D", "FOREGROUND"]
