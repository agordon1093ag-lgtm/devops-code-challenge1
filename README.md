# DevOps Code Challenge

## Project Overview
This project implements a complete CI/CD pipeline for a containerized web application using Jenkins, Docker, ECR, and ECS.

## Architecture
- **Frontend**: React application
- **Backend**: Node.js/Express API
- **CI/CD**: Jenkins pipeline
- **Container Registry**: Amazon ECR
- **Orchestration**: Amazon ECS with Fargate
- **Load Balancing**: Application Load Balancer

## Setup Instructions

### Prerequisites
- AWS Account with appropriate permissions
- GitHub account
- Jenkins server (EC2 instance)
- Docker installed locally
- AWS CLI configured

### Terraform Infrastructure
1. Clone the repository
2. Navigate to the terraform directory
3. Initialize Terraform: `terraform init`
4. Review the configuration: `terraform plan`
5. Apply the infrastructure: `terraform apply -auto-approve`

The Terraform configuration creates:
- VPC with public/private subnets
- ECR repositories for frontend and backend
- ECS cluster with Fargate services
- Application Load Balancer with target groups
- Auto-scaling policies

### Jenkins Setup

#### Jenkins Server Configuration
- **Instance Type**: t2.micro
- **OS**: Amazon Linux 2
- **Security Group**: Ports 22 (SSH) and 8080 (Jenkins) open
- **Jenkins URL**: http://3.136.83.125:8080

#### Required Jenkins Plugins
- Git
- Pipeline
- Docker Pipeline
- Amazon ECR Plugin
- GitHub Integration

#### Jenkins Credentials
- **GitHub Credentials**: GitHub Personal Access Token (ID: github-credentials)
- **AWS Credentials**: AWS Access Key/Secret (ID: aws-credentials)

### CI/CD Pipeline Stages
1. **Checkout Code**: Pulls latest code from GitHub
2. **Build Docker Images**: Builds frontend and backend containers
3. **Login to ECR**: Authenticates with Amazon ECR
4. **Push Images to ECR**: Tags and pushes images to repositories
5. **Update ECS Services**: Forces new deployments in ECS

### Load Testing Results

#### Test Configuration
- **Tool**: Siege
- **Concurrent Users**: 250
- **Duration**: 60 seconds
- **Target**: devops-challenge-alb-1281915073.us-east-2.elb.amazonaws.com

#### Performance Metrics
Transactions: 11,831 hits
Availability: 99.99%
Elapsed time: 60.49 secs
Data transferred: 125.52 MB
Response time: 200.09 ms
Transaction rate: 195.59 trans/sec
Throughput: 2.08 MB/sec


#### Auto-Scaling Configuration
- **Min Tasks**: 1
- **Max Tasks**: 4
- **Scaling Policy**: Target tracking based on CPU
- **CPU Target**: 50%

#### Scaling Observations
During load testing with 250 concurrent users, CPU utilization remained below the 50% threshold, so no auto-scaling was triggered. The application handled the load efficiently on a single task, maintaining 99.99% availability with an average response time of 200ms.

### Application URLs
- **Frontend Application**: http://devops-challenge-alb-1281915073.us-east-2.elb.amazonaws.com
- **Backend API**: http://devops-challenge-alb-1281915073.us-east-2.elb.amazonaws.com/api/
- **Jenkins**: http://3.136.83.125:8080

### Troubleshooting
Common issues encountered and solutions:

1. **Missing frontend files**: Added public/index.html, src/index.js, and src/App.css to fix React build errors
2. **Backend API endpoint**: Added /api route to backend index.js for frontend compatibility
3. **ALB routing**: Fixed rule priorities to ensure /api/* routes to backend target group
4. **Webhook configuration**: Enabled GitHub hook trigger in Jenkins job and added triggers block to Jenkinsfile
5. **Security group**: Updated inbound rules to allow GitHub webhook IPs
6. **Credentials issue**: Fixed credentials ID mismatch between Jenkinsfile and Jenkins configuration

## Conclusion
This project successfully demonstrates a complete DevOps pipeline with infrastructure as code, continuous integration, continuous deployment, and auto-scaling capabilities. The application handles 250 concurrent users with 99.99% availability and sub-second response times.
