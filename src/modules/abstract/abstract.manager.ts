import { Model, Types } from 'mongoose'

export class AbstractManager<Entity extends { _id: Types.ObjectId }> {
  constructor(private entityModel: Model<any>) {}

  async createOne(entityPartial: Partial<Entity>): Promise<Entity> {
    return this.entityModel.create(entityPartial)
  }

  async createMany(entitiesPartial: Partial<Entity[]>): Promise<Entity[]> {
    return this.entityModel.create(entitiesPartial)
  }

  async updateOne(entity: Entity, updates: Partial<Entity>): Promise<Entity> {
    return this.entityModel.findByIdAndUpdate(entity._id, updates, { new: true }).lean().exec()
  }

  async deleteOne(entity: Entity | string): Promise<Entity> {
    if (typeof entity === 'string') return this.entityModel.findByIdAndDelete(entity).lean().exec()
    return this.entityModel.findByIdAndDelete(entity._id).lean().exec()
  }

  async findOneByPartial(entityPartial: Partial<Entity>): Promise<Entity> {
    return this.entityModel.findOne(entityPartial).lean().exec()
  }

  async findOneById(id: string): Promise<Entity> {
    return this.entityModel.findById(id).lean().exec()
  }

  async findByIds(ids: Array<string>): Promise<Array<Entity>> {
    return this.entityModel
      .find({ _id: { $in: ids } })
      .lean()
      .exec()
  }

  async findManyByPartial(entityPartial: Partial<Entity>): Promise<Entity[]> {
    return this.entityModel.find(entityPartial).lean().exec()
  }

  async findAll(): Promise<Entity[]> {
    return this.entityModel.find().exec()
  }

  async addToRelation(entity: Entity, relation: keyof Entity, relationToAdd: any): Promise<Entity> {
    //@ts-ignore
    return this.entityModel
      //@ts-ignore
      .findByIdAndUpdate(entity._id, { $push: { [relation]: relationToAdd._id } }, { new: true })
      .lean()
      .exec()
  }
}
