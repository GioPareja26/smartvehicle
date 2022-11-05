import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administrador, Asesor, AsesorRelations} from '../models';
import {AdministradorRepository} from './administrador.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly administrador: BelongsToAccessor<Administrador, typeof Asesor.prototype.id>;

  servicios({id}: {id: string | undefined;}): import("../models").Servicio | PromiseLike<import("../models").Servicio> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(Asesor, dataSource);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
  }
}
