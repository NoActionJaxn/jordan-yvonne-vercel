/**
 * Creates a standardized error handler for request-like operations that logs a contextual message
 * and returns a safe fallback value.
 *
 * This higher-order function is useful for functional error handling (e.g., in Promise chains),
 * where you want to consistently log errors with context and recover by returning `null`.
 *
 * @typeParam T - The expected successful result type of the request operation.
 *
 * @param context - A short description of the operation or resource being fetched; used to provide
 * more informative logs when an error occurs.
 *
 * @returns A function that accepts an unknown error, logs it with the provided context, and returns `null`
 * to indicate a non-fatal failure in the calling code.
 *
 * @example
 * ```ts
 * fetch('/api/data')
 *   .then(res => res.json())
 *   .catch(handleRequestError<MyData>('data'))
 *   // -> resolves to MyData | null
 * ```
 *
 * @remarks
 * - The returned handler is intentionally permissive in its error parameter type (`unknown`),
 *   which aligns with modern error handling best practices.
 * - Consider upstream checks if `null` needs to be distinguished from other sentinel values.
 */
export function handleRequestError<T>(context: string) {
  return (err: unknown): T | null => {
    console.error(`Error fetching ${context}:`, err);
    return null;
  };
}