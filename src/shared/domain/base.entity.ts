import { BaseValueObject } from 'src/shared/domain/base.vo';

type ValueOf<T> = T extends { value: infer V } ? V : T;

export type PropsToGetters<T> = {
  readonly [K in keyof T]: ValueOf<T[K]>;
};

export abstract class BaseEntity<
  TProps extends Record<string, BaseValueObject<unknown>>,
> {
  protected constructor(protected readonly props: TProps) {
    for (const key of Object.keys(props)) {
      Object.defineProperty(this, key, {
        get: () => {
          const vo = this.props[key];
          return vo.value;
        },
        enumerable: true,
        configurable: true,
      });
    }
  }

  toJSON(): PropsToGetters<TProps> {
    const json = Object.fromEntries(
      Object.entries(this.props).map(([key, value]) => [key, value.value]),
    );
    return json as PropsToGetters<TProps>;
  }
}
