# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Database
DynamoDB is used for this project, a single-table design is attempted.



## Seed data
Seed data is located in unversioned files, as it contains secrets like passwords for initial users.

After your stack is deployed, ensure you have these seeds in `./src/seeds` and run a similar following command to populate the DB:
```
aws dynamodb batch-write-item --request-items file://src/seeds/defaultUsers_dev.json --profile <AWS profile for honda-tracker project>
```

See [this DynamoDB seed data manual](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SampleData.LoadData.html) for details.