dev-compose:
	docker-compose -f docker-compose.yml up -d

prod-compose:
	docker-compose -f docker-compose.prod.yml up -d

dev-compose-debug:
	docker-compose -f docker-compose.yml up