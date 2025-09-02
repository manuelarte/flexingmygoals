import type { LocationQueryValue } from 'vue-router'

/**
 * Check if a query parameter can be converted to a boolean. Returns false if the value is not a string.
*/
export function toBoolean (value: LocationQueryValue | LocationQueryValue[] | undefined) {
  if (typeof value === 'string') {
    return value === 'true'
  }
  return false
}
