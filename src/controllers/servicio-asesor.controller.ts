import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Servicio,
  Asesor,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioAsesorController {
  constructor(
    @repository(ServicioRepository) protected servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/asesors', {
    responses: {
      '200': {
        description: 'Array of Servicio has many Asesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Asesor>,
  ): Promise<Asesor[]> {
    return this.servicioRepository.asesors(id).find(filter);
  }

  @post('/servicios/{id}/asesors', {
    responses: {
      '200': {
        description: 'Servicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Asesor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Servicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {
            title: 'NewAsesorInServicio',
            exclude: ['id'],
            optional: ['servicioId']
          }),
        },
      },
    }) asesor: Omit<Asesor, 'id'>,
  ): Promise<Asesor> {
    return this.servicioRepository.asesors(id).create(asesor);
  }

  @patch('/servicios/{id}/asesors', {
    responses: {
      '200': {
        description: 'Servicio.Asesor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {partial: true}),
        },
      },
    })
    asesor: Partial<Asesor>,
    @param.query.object('where', getWhereSchemaFor(Asesor)) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.servicioRepository.asesors(id).patch(asesor, where);
  }

  @del('/servicios/{id}/asesors', {
    responses: {
      '200': {
        description: 'Servicio.Asesor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Asesor)) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.servicioRepository.asesors(id).delete(where);
  }
}
