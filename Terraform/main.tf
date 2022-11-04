terraform {
 required_providers {
   aws = {
     source  = "hashicorp/aws"
   }
 }
}
 
provider "aws" {
 region  = "us-east-1"
 access_key="AKIARDZOGL4IRC7DHVHC"
 secret_key="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"
}
 
resource "aws_instance" "app_server" {
 ami           = "ami-0ff8a91507f77f867"
 instance_type = "t2.micro"
 
 security_groups = [aws_security_group.allow_ssh.name]
 
 # https://github.com/hashicorp/terraform-provider-aws/issues/23315
 user_data_replace_on_change = true
 
 tags = {
   Name = "morrego740@soyudemedellin.edu.co"
 }
}
 
 
resource "aws_security_group" "allow_ssh" {
 name        = "allow_ssh-morrego740@soyudemedellin.edu.co"
 description = "Allow ssh inbound traffic"
 
 ingress {
   description      = "SSH from VPC"
 from_port        = 80
   to_port          = 80
   protocol         = "tcp"
   cidr_blocks      = ["0.0.0.0/0"]
   ipv6_cidr_blocks = ["::/0"]
 }
 
 egress {
   from_port        = 0
   to_port          = 0
   protocol         = "-1"
   cidr_blocks      = ["0.0.0.0/0"]
   ipv6_cidr_blocks = ["::/0"]
 }
 
 tags = {
   Name = "allow_ssh"
 }
}
