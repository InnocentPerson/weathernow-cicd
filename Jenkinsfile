pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'yourdockerhubusername/weathernow-app'
    }

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/shehryarkn/Node.js-Weather-App'
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test || echo "No tests implemented"'
            }
        }
        stage('Code Analysis') {
            steps {
                sh 'sonar-scanner -Dsonar.projectKey=weathernow-app -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=SONAR_TOKEN'
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }
        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds-id', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }
        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key-id']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ec2-user@<EC2-IP> '
                        docker pull $DOCKER_IMAGE &&
                        docker stop weathernow-app || true &&
                        docker rm weathernow-app || true &&
                        docker run -d -p 3000:3000 --name weathernow-app $DOCKER_IMAGE
                    '
                    '''
                }
            }
        }
    }
}
