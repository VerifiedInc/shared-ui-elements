/**
 * This TypeScript function, "when," is a versatile utility for conditional branching and value mapping.
 * It's particularly useful when you want to streamline your code by avoiding complex if-else chains or switch statements.
 * FYI: languages like Kotlin, Swift contains this powerful conditional statement.
 * @param value
 * @param cases
 */
export function when<T extends string | number | symbol, R>(
  // "value" represents the input value that needs to be matched against different cases.
  value: T | undefined,
  // "cases" is an object that maps specific values of type T to functions returning a result of type R.
  cases: Partial<Record<T, () => R>> & { else?: () => R },
): R | undefined {
  // Check if the provided "value" exists as a key in the "cases" object.
  if (!!value && value in cases) {
    // If a matching case is found, execute the associated function and return its result.
    return cases[value]?.();
  }

  // If no matching case is found and a "defaultCase" is provided, execute it.
  // This allows for a graceful fallback when no explicit case matches the "value."
  return cases.else?.();
}
