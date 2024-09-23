#!/bin/bash

PROD_AWS_ACCESS_KEY_ID=XXXXX
PROD_AWS_SECRET_ACCESS_KEY=XXX

# aws configuration for development
aws configure set aws_access_key_id $PROD_AWS_ACCESS_KEY_ID --profile prod_lambda_deploy
aws configure set aws_secret_access_key $PROD_AWS_SECRET_ACCESS_KEY --profile prod_lambda_deploy
aws configure set region ap-southeast-1 --profile prod_lambda_deploy
aws configure set output json --profile prod_lambda_deploy

aws s3 ls --profile prod_lambda_deploy

rm -rf dist
rm -rf .serverless

echo 'Create the build'
yarn build

echo 'Get serverless file'
cp sls_config/prod-serverless.yaml serverless.yaml

sls deploy --aws-profile prod_lambda_deploy
