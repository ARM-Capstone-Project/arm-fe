# arm frontend

This is a frontend application written in React Typescript.

## Running the server

To run the server, execute the following command:

```
git clone <repo-url>

npm install

npm run dev
```

The server will start on port 5173. You can access it by navigating to `http://localhost:5173/` in your web browser.

![localhost](screenshots/localhost.png)

# Devops

## Overview

```
Infrastructure Setup: Terraform

Containerization: Podman

Container Orchestration: Kubernetes - Deployment, Service, Ingress

CI: Github Actions

CD: GitOps (ArgoCD)

Deployment Platform: Kubernetes Cluster - EKS

Configuration Managment: Helm

Ingress Controller: Load Balancer - Exposed, DNS
```

## Installation for MacOS

```
brew install terraform

brew install awscli

brew install kubernetes-cli

brew install argocd

brew install helm
```

## Containerization

```
podman build -t arm-fe .

podman run -p 5173:80 <image-id>
```

## Terraform

Create ECR and EKS cluster using Terraform

![terraform](screenshots/terraform.png)

```
terraform fmt -recursive

terraform init

terraform validate

terraform plan 

terraform apply -auto-approve 

terraform destroy
```

Manual test and push image to ECR

```
aws ecr get-login-password --region ap-southeast-1 --profile default | podman login --username AWS --password-stdin <ecr-repo-url>

podman build -t arm-fe . --platform=linux/amd64

podman tag arm-fe:latest <ecr-repo-url>:latest

podman push <ecr-repo-url>:latest
```

Configure kubectl 
```
aws eks --region <aws-region> update-kubeconfig --name <cluster-name>
```

## Automated Infrastructure

Jenkins

![jenkins-server](screenshots/jenkins-server.png)

![ec2-contents](screenshots/ec2-contents.png)

Get Jenkins admin password through SSM
```
sudo su ubuntu
cd
systemctl status jenkins.service
```

Allow Jenkins to run terraform actions

![terraform-in-jenkins](screenshots/terraform-in-jenkins.png)

