#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AuthLambdaStack } from '../lib/auth-lambda-stack';
import { BookingLambdaStack } from '../lib/booking-lambda-stack';
import { HondaTrackerStack } from '../lib/honda-tracker-stack';
import { HttpApiStack } from '../lib/rest-api-stack';
import { UserLambdaStack } from '../lib/user-lambda-stack';
import { Stages } from '../src/constants';

const app = new cdk.App();
const stage = process.env.NODE_ENV as Stages;

if (!stage) {
  throw Error('No stage found');
}

console.log(`Using stage "${stage}"`);

const { restApi } = new HttpApiStack(app, 'RestApiStack');

const bookingLambdasStack = new BookingLambdaStack(
  app,
  'bookingLambdaStack',
  {
    stage,
    api: restApi,
  },
);

const authLambdasStack = new AuthLambdaStack(app, 'authLambdaStack', {
  stage,
  api: restApi,
});

const userLambdasStack = new UserLambdaStack(app, 'userLambdaStack', {
  stage,
  api: restApi,
});

const hondaTrackerStack = new HondaTrackerStack(app, 'HondaTrackerStack', {
  stage,
  api: restApi,
  bookingLambdas: bookingLambdasStack.lambdas,
  userLambdas: userLambdasStack.lambdas,
  authLambdas: authLambdasStack.lambdas,
});
