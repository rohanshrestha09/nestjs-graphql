import { Inject, Injectable } from '@nestjs/common';
import { Collection, Db, Filter, ObjectId } from 'mongodb';
import { OrderRepositoryPort } from 'src/orders/application/ports/order-repository.port';
import { Order } from 'src/orders/domain/entities/order.entity';
import { OrderId } from 'src/orders/domain/value-objects/order-id.vo';
import { IRepositoryBaseQuery } from 'src/shared/application/base-repository.port';
import { MONGODB_PROVIDER } from 'src/shared/infrastructure/database/mongodb.provider';
import { UserId } from 'src/users/domain/value-objects/user-id.vo';

@Injectable()
export class MongoDBOrderRepository implements OrderRepositoryPort {
  private collection: Collection;

  constructor(@Inject(MONGODB_PROVIDER) private readonly db: Db) {
    this.collection = this.db.collection('orders');
  }

  findById(id: OrderId): IRepositoryBaseQuery<Order | null> {
    const executeQuery = async (userId?: UserId) => {
      const query: Filter<Document> = {
        _id: new ObjectId(id.value),
        ...(userId ? { userId: new ObjectId(userId.value) } : {}),
      };
      const doc = await this.collection.findOne(query);
      return doc ? Order.fromJSON({ ...doc, id: doc._id.toString() }) : null;
    };

    return {
      forUser: (userId: UserId) => executeQuery(userId),
      any: () => executeQuery(),
    };
  }
}
