import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Servicio} from './servicio.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Asesor extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'number',
    required: true,
  })
  documento: number;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @property({
    type: 'string',
    required: true,
  })
  servicio: string;

  @hasMany(() => Servicio)
  servicios: Servicio[];
  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  @belongsTo(() => Administrador)
  administradorId: string;

  @property({
    type: 'string',
  })
  servicioId?: string;

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
