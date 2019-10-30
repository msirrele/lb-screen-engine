import {
  /* inject, Application, CoreBindings, */
  lifeCycleObserver, // The decorator
  LifeCycleObserver,
  inject,
  CoreBindings,
  Application, // The interface
} from '@loopback/core';
import {
  repository,
} from '@loopback/repository';

const etl = require('etl');
const mongoose = require('mongoose');
import { MongoDataSource } from '../datasources/mongo.datasource';
import { TvCommericalRepository } from '../repositories/tv-commerical.repository';
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('datapumps')
export class EtlObserver implements LifeCycleObserver {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository(TvCommericalRepository)
    public tvCommericalRepository: TvCommericalRepository,
  ) {}

  /**
   * This method will be invoked when the application starts
   */
  async start(): Promise<void> {
    mongoose.connect(
      'mongodb+srv://admin-screen-engine:screen123@sceen-engine-f4ckr.gcp.mongodb.net/screen-engine?retryWrites=true&w=majority',
    );
    mongoose.Promise = global.Promise;

    const db = mongoose.connection;
    const collection = db.then(function(dataBase: any) {
      return dataBase.collection('tvCommerical');
    });
    etl
      .file('src/tv-commerical.csv')
      .pipe(etl.csv())
      .pipe(etl.map((data: any)=> {
        return { Rating: data.Ratings, Age: data.Age, Gender: data.Gender };
      }))
      .pipe(etl.collect())
      .pipe(etl.mongo.insert(collection));
  }
  /**
   * This method will be invoked when the application stops
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
