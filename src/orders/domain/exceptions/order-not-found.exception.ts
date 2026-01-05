export class OrderNotFoundException extends Error {
  constructor(orderId: string) {
    super(`Order ${orderId} not found`);
  }
}
