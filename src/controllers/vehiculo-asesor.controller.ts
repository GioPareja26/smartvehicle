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
  Vehiculo,
  Asesor,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoAsesorController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/asesors', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Asesor',
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
    return this.vehiculoRepository.asesors(id).find(filter);
  }

  @post('/vehiculos/{id}/asesors', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Asesor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {
            title: 'NewAsesorInVehiculo',
            exclude: ['id'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) asesor: Omit<Asesor, 'id'>,
  ): Promise<Asesor> {
    return this.vehiculoRepository.asesors(id).create(asesor);
  }

  @patch('/vehiculos/{id}/asesors', {
    responses: {
      '200': {
        description: 'Vehiculo.Asesor PATCH success count',
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
    return this.vehiculoRepository.asesors(id).patch(asesor, where);
  }

  @del('/vehiculos/{id}/asesors', {
    responses: {
      '200': {
        description: 'Vehiculo.Asesor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Asesor)) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.vehiculoRepository.asesors(id).delete(where);
  }
}
