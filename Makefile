DESTPATH = /var/www/aloodo-blog
HOST = citrus.zgp.org
RSYNC = time rsync --verbose -a --delete --delete-excluded --exclude ".git"
TEMPLATES = $(shell find templates -name '*.tmpl' | sort)
SRCFILES = $(shell find src | sort)

public/index.html : ${TEMPLATES} ${SRCFILES}
	ikiwiki --setup AloodoBlog.setup --verbose --rebuild
	cp -a src/.well-known public

deploy : public/index.html
	ssh ${HOST} mkdir -p ${DESTPATH}
	${RSYNC} public/ ${HOST}:${DESTPATH}

.PHONY : deploy preview

