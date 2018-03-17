DESTPATH = /var/www/aloodo-blog
HOST = citrus.zgp.org
RSYNC = time rsync -a --delete --delete-excluded --exclude ".git"
TEMPLATES = $(shell find templates -name '*.tmpl' | sort)
SRCFILES = $(shell find src -name '*.mdwn' | sort)

public/index.html : ${TEMPLATES} ${SRCFILES}
	ikiwiki --setup AloodoBlog.setup --verbose --rebuild

deploy : 
	ssh ${HOST} mkdir -p ${DESTPATH}
	${RSYNC} * ${HOST}:${DESTPATH}
	ssh ${HOST} ikiwiki --setup ${DESTPATH}/AloodoBlog.setup \
	--rebuild --wrappers --verbose

.PHONY : deploy preview

