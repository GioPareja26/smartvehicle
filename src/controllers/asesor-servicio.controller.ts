import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Asesor,
  Servicio
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorServicioController {
  constructor(
    @repository(AsesorRepository) protected asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of Asesor has many Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Servicio>,
  ): Promise<Servicio[]> {
    return this.asesorRepository.servicios({id}).find(filter);
  }

  @post('/asesors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Asesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Asesor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInAsesor',
            exclude: ['id'],
            optional: ['asesorId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'id'>,
  ): Promise<Servicio> {
    return this.asesorRepository.servicios({id}).create(servicio);
  }

  @patch('/asesors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Asesor.Servicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Partial<Servicio>,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.asesorRepository.servicios({id}).patch(servicio, where);
  }

  @del('/asesors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Asesor.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.asesorRepository.servicios({id}).delete(where);
  }
}
