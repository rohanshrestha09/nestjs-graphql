export abstract class BaseValueObject<T> {
  readonly value: T;

  constructor(value: T) {
    this.value = this.validate(value);
  }

  abstract validate(value: T): T;
}
