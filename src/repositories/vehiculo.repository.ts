import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Asesor} from '../models';
import {AsesorRepository} from './asesor.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly asesors: HasManyRepositoryFactory<Asesor, typeof Vehiculo.prototype.id>;

  administrador(id: string | undefined): import("../models").Administrador | PromiseLike<import("../models").Administrador> {
    throw new Error('Method not implemented.');
  }
  asesor(id: string | undefined): import("../models").Asesor | PromiseLike<import("../models").Asesor> {
    throw new Error('Method not implemented.');
  }
  cliente(id: string | undefined): import("../models").Cliente | PromiseLike<import("../models").Cliente> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.asesors = this.createHasManyRepositoryFactoryFor('asesors', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesors', this.asesors.inclusionResolver);
  }
}
