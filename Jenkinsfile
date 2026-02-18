pipeline {
  agent any

   triggers {
        githubPush()
    }

  environment {
    AWS_REGION    = 'us-east-2'
    AWS_ACCOUNT   = '740838937919'

    FRONTEND_REPO = '740838937919.dkr.ecr.us-east-2.amazonaws.com/devops-challenge-frontend'
    BACKEND_REPO  = '740838937919.dkr.ecr.us-east-2.amazonaws.com/devops-challenge-backend'

    CLUSTER_NAME  = 'devops-challenge-cluster'

    // TODO: Replace these with your real ECS service names from AWS Console
    FRONTEND_SERVICE = 'devops-challenge-frontend-service'
    BACKEND_SERVICE  = 'devops-challenge-backend-service'
  }

  stages {

    stage('Checkout code') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker images') {
      steps {
        sh 'docker build -t frontend:latest ./frontend'
        sh 'docker build -t backend:latest ./backend'
      }
    }

    stage('Login to ECR') {
      steps {
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-credentials']]) {
          sh '''
            aws --version
            aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT.dkr.ecr.$AWS_REGION.amazonaws.com
          '''
        }
      }
    }

    stage('Tag & Push images to ECR') {
      steps {
        sh '''
          docker tag frontend:latest $FRONTEND_REPO:latest
          docker tag backend:latest $BACKEND_REPO:latest

          docker push $FRONTEND_REPO:latest
          docker push $BACKEND_REPO:latest
        '''
      }
    }

    stage('Update ECS services') {
      steps {
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-credentials']]) {
          sh '''
            aws ecs update-service --region $AWS_REGION --cluster $CLUSTER_NAME --service $FRONTEND_SERVICE --force-new-deployment
            aws ecs update-service --region $AWS_REGION --cluster $CLUSTER_NAME --service $BACKEND_SERVICE --force-new-deployment
          '''
        }
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}
