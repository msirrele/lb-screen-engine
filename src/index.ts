import {ScreenEngineChallengeApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import { EtlObserver } from './observers/etl.observer';

export {ScreenEngineChallengeApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new ScreenEngineChallengeApplication(options);
  await app.boot();
  await app.start();
  app.lifeCycleObserver(EtlObserver);
  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
