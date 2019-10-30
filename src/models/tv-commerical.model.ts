import {Entity, model, property} from '@loopback/repository';

@model({name: 'tvCommerical', settings: {strict: false}})
export class TvCommerical extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
  })
  rating?: string;

  @property({
    type: 'string',
  })
  age?: string;

  @property({
    type: 'string',
  })
  gender?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TvCommerical>) {
    super(data);
  }
}

export interface TvCommericalRelations {
  // describe navigational properties here
}

export type TvCommericalWithRelations = TvCommerical & TvCommericalRelations;
