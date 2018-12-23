# Lambda + S3 + RDS with Serverless Framework

```
$ git clone repo-url
$ cd repo-name
$ yarn add
$ sls deploy && sls s3deploy
```

# Required

Before `deploy`, you need to setup below.

## VPC Endpoint

- If Lambda in VPC accesses to S3, it requires to create `VPC Endpoint` in the VPC.

## YOUR_XXX value

You need to replace YOUR_XXXX value from your own service values.

### serverless.yml

- DEPLOYMENT_BUCKET
- YOUR_DEPLOYMENT_REGION
- YOUR_SECURITY_GROUP_ID
- YOUR_SUBNET_IDS
- YOUR_S3_BUCKET_NAME
- YOUR_S3_BUCKET_NAME
- YOUR_S3_BUCKET_NAME
- YOUR_S3_OBJECT_PREFIX

### handler.js

- YOUR_REGION
- YOUR_RDS_DB_HOST
- YOUR_RDS_DB_USER
- YOUR_RDS_DB_PASSWORD
- YOUR_RDS_DB_NAME
- YOUR_RDS_DB_NAME.TABLE_NAME
