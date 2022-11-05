import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Servicio, ServicioRelations, Asesor} from '../models';
import {AsesorRepository} from './asesor.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {

  public readonly asesors: HasManyRepositoryFactory<Asesor, typeof Servicio.prototype.id>;

  cliente(id: string | undefined): import("../models").Cliente | PromiseLike<import("../models").Cliente> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Servicio, dataSource);
    this.asesors = this.createHasManyRepositoryFactoryFor('asesors', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesors', this.asesors.inclusionResolver);
  }
}
