export interface Values {
  values: {
    [key: string]: any
  }
}

export type Next = Values & {
  [key: string]: string
}

/**
 * This function will create an amiable-forms transform function which will
 * convert the given arrayFieldName to a single element array if it is a string.
 *
 * This is needed for any fields that are arrays used in the Filter component.
 */
const buildToArrayTransform = (arrayFieldName: string) => ({ next }: { next: Next }): Next => {
  const value = next.values[arrayFieldName]
  if (typeof value !== 'string' || value === '') {
    return next
  }

  next.values = {
    ...next.values,
    [arrayFieldName]: [value]
  }

  return { ...next }
}

export default (...fieldNames: string[]) => ({ next }: { next: Next }): Next =>
  fieldNames.reduce((next, fieldName) => buildToArrayTransform(fieldName)({ next }), next)
