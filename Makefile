.PHONY: build

setup:
	npm install

lint:
	npm run lint

test:
	npm run test

run-dev:
	npm run serve

docker-dev:
	docker run -it --name RPGTools-UI-DEV -p 4545:4545 --rm chilldread/rpgtools-ui-dev

docker-prd:
	docker run --name RPGTools-UI -p 80:80 --rm chilldread/rpgtools-ui-prd

image-dev:
	cp Dockerfile-DEV Dockerfile
	docker build -t chilldread/rpgtools-ui-dev .

image-prd:
	cp Dockerfile-PRD Dockerfile
	docker build -t chilldread/rpgtools-ui-prd .
