import { Inject, Injectable } from '@nestjs/common';
import { Collection, Db, ObjectId } from 'mongodb';
import { OrderRepositoryPort } from 'src/orders/application/ports/order-repository.port';
import { Order } from 'src/orders/domain/entities/order.entity';
import { OrderId } from 'src/orders/domain/value-objects/order-id.vo';
import { MONGODB_PROVIDER } from 'src/shared/infrastructure/database/mongodb.provider';

type OrderDocument = {
  _id: ObjectId;
  amount: number;
  currency: string;
  status: 'DRAFT' | 'CONFIRMED';
};

@Injectable()
export class MongoDBOrderRepository implements OrderRepositoryPort {
  private collection: Collection<OrderDocument>;

  constructor(@Inject(MONGODB_PROVIDER) private readonly db: Db) {
    this.collection = this.db.collection('orders');
  }

  async findById(id: OrderId): Promise<Order | null> {
    const doc = await this.collection.findOne({ _id: new ObjectId(id.value) });

    if (!doc) return null;

    return Order.fromJSON(doc);
  }

  async save(order: Order): Promise<void> {
    await this.collection.updateOne(
      { _id: new ObjectId(order.id) },
      {
        $set: {
          status: order.status,
        },
      },
      { upsert: true },
    );
  }
}
