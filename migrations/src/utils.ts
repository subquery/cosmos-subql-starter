export type FieldValues = Record<string, Record<string, any>>;

export interface Row {
    row: FieldValues
}

export function getSelectResults(rows: Row[]) {
  if (rows.length < 1) {
    return null;
  }
  return rows.map(row => Object.entries(row).map(e => e[1]));
}