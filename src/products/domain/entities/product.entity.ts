import { ProductBasePrice } from 'src/products/domain/value-objects/product-base-price.vo';
import { ProductCoverImage } from 'src/products/domain/value-objects/product-cover-image.vo';
import { ProductDiscountedPrice } from 'src/products/domain/value-objects/product-discounted-price.vo';
import { ProductId } from 'src/products/domain/value-objects/product-id.vo';
import { ProductName } from 'src/products/domain/value-objects/product-name.vo';
import { ProductQuantity } from 'src/products/domain/value-objects/product-quantity';
import { ProductSlug } from 'src/products/domain/value-objects/product-slug.vo';
import { BaseEntity, PropsToGetters } from 'src/shared/domain/base.entity';
import { BaseValueObject } from 'src/shared/domain/base.vo';
import { z } from 'zod';

interface ProductProps extends Record<string, BaseValueObject<unknown>> {
  id: ProductId;
  name: ProductName;
  slug: ProductSlug;
  quantity: ProductQuantity;
  coverImage: ProductCoverImage;
  basePrice: ProductBasePrice;
  discountedPrice: ProductDiscountedPrice;
}

export interface Product extends PropsToGetters<ProductProps> {}

export class Product extends BaseEntity<ProductProps> {
  private constructor(props: ProductProps) {
    super(props);
  }

  applyDiscount(percentage: number) {
    const discountedPrice = new ProductDiscountedPrice(
      this.basePrice * (1 - percentage / 100),
    );
    return new Product({ ...this.props, discountedPrice });
  }

  static create(props: ProductProps) {
    return new this(props);
  }

  static fromJSON(json: Record<string, unknown>) {
    const schema = z.object({
      id: z.custom<ProductId>((v: string) => new ProductId(v)),
      name: z.custom<ProductName>((v: string) => new ProductName(v)),
      slug: z.custom<ProductSlug>((v: string) => new ProductSlug(v)),
      quantity: z.custom<ProductQuantity>(
        (v: number) => new ProductQuantity(v),
      ),
      coverImage: z.custom<ProductCoverImage>(
        (v: string) => new ProductCoverImage(v),
      ),
      basePrice: z.custom<ProductBasePrice>(
        (v: number) => new ProductBasePrice(v),
      ),
      discountedPrice: z.custom<ProductDiscountedPrice>(
        (v: number) => new ProductDiscountedPrice(v),
      ),
    });
    return this.create(schema.parse(json));
  }
}
