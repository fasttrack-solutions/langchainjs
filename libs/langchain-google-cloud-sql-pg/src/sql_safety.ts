const SQL_IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/;
const SQL_DATA_TYPE = /^[A-Za-z_][A-Za-z0-9_ ]*(\([0-9,]+\))?$/;

/** Allow only plain SQL identifiers before they are interpolated. */
export function sqlIdent(value: unknown, label = "identifier"): string {
  if (typeof value !== "string" || !SQL_IDENTIFIER.test(value)) {
    throw new Error(`Invalid SQL ${label}`);
  }
  return value;
}

/** Allow only a non-negative integer before it is interpolated into SQL. */
export function sqlInt(value: unknown, label = "limit"): number {
  const parsed = Number.parseInt(String(value), 10);
  if (!Number.isInteger(parsed) || parsed < 0 || parsed > 1_000_000) {
    throw new Error(`Invalid SQL ${label}`);
  }
  return parsed;
}

/** Allow a finite number, including embedding components, before interpolation. */
export function sqlNumber(value: unknown, label = "number"): number {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid SQL ${label}`);
  }
  return parsed;
}

/** Allow a column type such as TEXT, UUID, or vector(3). */
export function sqlDataType(value: unknown): string {
  if (typeof value !== "string" || !SQL_DATA_TYPE.test(value.trim())) {
    throw new Error("Invalid SQL data type");
  }
  return value.trim();
}

/**
 * Reject statement separators and comments in a caller-supplied predicate.
 */
export function sqlPredicate(value: string): string {
  if (typeof value !== "string" || /[\0;]|--|\/\*|\*\//.test(value)) {
    throw new Error("Invalid SQL predicate");
  }
  return value;
}

/** Escape a string placed inside a single-quoted SQL literal. */
export function sqlQuote(value: string): string {
  if (typeof value !== "string" || value.includes("\0")) {
    throw new Error("Invalid SQL string");
  }
  return `'${value.replaceAll("'", "''")}'`;
}
