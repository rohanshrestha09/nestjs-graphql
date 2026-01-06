export class ProductNotFoundException extends Error {
  constructor(productId: string) {
    super(`Product ${productId} not found`);
  }
}
