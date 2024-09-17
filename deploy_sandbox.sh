#!/bin/bash

AWS_ACCESS_KEY_ID=XXXXX
AWS_SECRET_ACCESS_KEY=XXX

# aws configuration for development
aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID --profile sb_lambda_deploy
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY --profile sb_lambda_deploy
aws configure set region ap-southeast-1 --profile sb_lambda_deploy
aws configure set output json --profile sb_lambda_deploy

aws s3 ls --profile sb_lambda_deploy

rm -rf dist
rm -rf .serverless

echo 'Create the build'
yarn build

echo 'Get serverless file'
cp sls_config/sandbox-serverless.yaml serverless.yaml

sls deploy --aws-profile sb_lambda_deploy
