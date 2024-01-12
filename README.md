# sit725-2023-t1-prac8
-	Added a Dockerfile with commands to dockerize the application.
-	Built the docker image and pushed to a public repository.
-	Added a docker-compose.yml file with instructs to set up a multi-container environment. This needed to be done as the application requires mongodb.
-	The docker-compose.yml creates a multi container setup with the application in one container and mongodb in another and links them both.
-	Run docker-compose up to create the multi-container environment from the already published images.
