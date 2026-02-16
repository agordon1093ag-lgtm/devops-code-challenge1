provider "aws" {
  region = "us-east-2"
}

module "ec2" {
  source = "./modules/ec2"

  ami_id        = "ami-0ddda618e961f2270" # Amazon Linux 2 (x86_64, us-east-2)
  instance_type = "t3.micro"
  key_name      = "week5day2"
}

resource "aws_s3_bucket" "example_bucket" {
  bucket = "terraform-ec2-aundrea-123456"

  tags = {
    Name        = "Terraform-S3-Bucket"
    Environment = "Dev"
  }
}
