import { FormatRegistry, type Static, type TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

if (!FormatRegistry.Has('uri')) {
  FormatRegistry.Set('uri', (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  });
}

type SafeParseResult<T> =
  | { success: true; data: T }
  | { success: false; error: { flatten: () => { fieldErrors: Record<string, string[]> } } };

export function safeParse<T extends TSchema>(schema: T, input: unknown): SafeParseResult<Static<T>> {
  const cleaned = Value.Clean(schema, input);
  const withDefaults = Value.Default(schema, cleaned);

  if (Value.Check(schema, withDefaults)) {
    return { success: true, data: withDefaults as Static<T> };
  }

  const fieldErrors: Record<string, string[]> = {};
  for (const err of Value.Errors(schema, withDefaults)) {
    const key = err.path.replace(/^\//, '') || '_root';
    (fieldErrors[key] ??= []).push(err.message);
  }

  return { success: false, error: { flatten: () => ({ fieldErrors }) } };
}
