import {DefaultCrudRepository} from '@loopback/repository';
import {TvCommerical, TvCommericalRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TvCommericalRepository extends DefaultCrudRepository<
  TvCommerical,
  typeof TvCommerical.prototype._id,
  TvCommericalRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(TvCommerical, dataSource);
  }
}
