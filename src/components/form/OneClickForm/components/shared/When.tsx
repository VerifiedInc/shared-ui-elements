import { ReactNode } from 'react';

export type WhenProps<T = unknown> = {
  value: T;
  children: ReactNode | ((condition: NonNullable<T>) => ReactNode);
};

/**
 * This component can be used when using value is truthy to render some other component,
 * instead of using ternary operators you can use this.
 *
 * This is particularly useful when you have nested conditional rendering. Also, it allows for safer falsy conditions
 * while in a ternary you can risk rendering falsy values in the react tree if you use `&&`.
 * @param value
 * @param children Children can be direct ReactNode or a function returning ReactNode, when a function,
 * the value is being passed as param and is guarantee to be non-nullable excluding undefined and null from the inferred type.
 * @constructor
 */
export function When<T>({ value, children }: WhenProps<T>) {
  if (!value) return null;

  if (typeof children === 'function')
    return <>{children(value as NonNullable<T>)}</>;

  return <>{children}</>;
}
