import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Administrador} from './administrador.model';
import {Asesor} from './asesor.model';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Administrador)
  administradorId: string;

  @belongsTo(() => Asesor)
  asesorId: string;

  @hasMany(() => Asesor)
  asesors: Asesor[];

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
