import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Asesor} from './asesor.model';

@model()
export class Servicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicio: string;

  @property({
    type: 'number',
    required: true,
  })
  valorHora: number;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  tipoServicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaEntrega: string;
  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Asesor)
  asesorId: string;

  @hasMany(() => Asesor)
  asesors: Asesor[];

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;
