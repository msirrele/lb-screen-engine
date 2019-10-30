import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {TvCommerical} from '../models';
import {TvCommericalRepository} from '../repositories';

export class TvCommericalController {
  constructor(
    @repository(TvCommericalRepository)
    public tvCommericalRepository : TvCommericalRepository,
  ) {}
@get('/tv-commericals/male-reports')
async getReports(){
  const report = {
    Male: {
      ratings: [
        ['Excellent', 34],
        ['Very Good', 332],
        ['Good', 67],
        ['Fair', 100],
        ['Poor', 80],
      ],
    },
    Female: {
      ratings: [
        ['Excellent', 34],
        ['Very Good', 332],
        ['Good', 67],
        ['Fair', 100],
        ['Poor', 80],
      ],
    },
  };
  return report.Male.ratings;
}

  @post('/tv-commericals', {
    responses: {
      '200': {
        description: 'TvCommerical model instance',
        content: {'application/json': {schema: getModelSchemaRef(TvCommerical)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TvCommerical, {
            title: 'NewTvCommerical',
            exclude: ['_id'],
          }),
        },
      },
    })
    tvCommerical: Omit<TvCommerical, '_id'>,
  ): Promise<TvCommerical> {
    return this.tvCommericalRepository.create(tvCommerical);
  }

  @get('/tv-commericals/count', {
    responses: {
      '200': {
        description: 'TvCommerical model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TvCommerical)) where?: Where<TvCommerical>,
  ): Promise<Count> {
    return this.tvCommericalRepository.count(where);
  }

  @get('/tv-commericals', {
    responses: {
      '200': {
        description: 'Array of TvCommerical model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TvCommerical)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TvCommerical)) filter?: Filter<TvCommerical>,
  ): Promise<TvCommerical[]> {
    return this.tvCommericalRepository.find(filter);
  }

  @patch('/tv-commericals', {
    responses: {
      '200': {
        description: 'TvCommerical PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TvCommerical, {partial: true}),
        },
      },
    })
    tvCommerical: TvCommerical,
    @param.query.object('where', getWhereSchemaFor(TvCommerical)) where?: Where<TvCommerical>,
  ): Promise<Count> {
    return this.tvCommericalRepository.updateAll(tvCommerical, where);
  }

  @get('/tv-commericals/{id}', {
    responses: {
      '200': {
        description: 'TvCommerical model instance',
        content: {'application/json': {schema: getModelSchemaRef(TvCommerical)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<TvCommerical> {
    return this.tvCommericalRepository.findById(id);
  }

  @patch('/tv-commericals/{id}', {
    responses: {
      '204': {
        description: 'TvCommerical PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TvCommerical, {partial: true}),
        },
      },
    })
    tvCommerical: TvCommerical,
  ): Promise<void> {
    await this.tvCommericalRepository.updateById(id, tvCommerical);
  }

  @put('/tv-commericals/{id}', {
    responses: {
      '204': {
        description: 'TvCommerical PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tvCommerical: TvCommerical,
  ): Promise<void> {
    await this.tvCommericalRepository.replaceById(id, tvCommerical);
  }

  @del('/tv-commericals/{id}', {
    responses: {
      '204': {
        description: 'TvCommerical DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tvCommericalRepository.deleteById(id);
  }
}
