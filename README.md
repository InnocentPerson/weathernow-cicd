# WeatherNow CI/CD

This project demonstrates a CI/CD pipeline for a Node.js Weather App using:

- Jenkins
- Docker
- SonarQube
- AWS EC2

## How It Works

1. Code is pulled from GitHub by Jenkins.
2. Jenkins installs dependencies and runs tests.
3. Code is analyzed by SonarQube.
4. Docker image is built and pushed to DockerHub.
5. Image is deployed to AWS EC2 using SSH and Docker.

