/**
 * This function will create an amiable-forms transform function which will
 * convert the given arrayFieldName to a single element array if it is a string.
 *
 * This is needed for for any fields that are arrays used in the Filter component.
 */
const buildToArrayTransform = arrayFieldName => ({ next }) => {
  const value = next.values[arrayFieldName]
  if (value && typeof value === 'string') {
    next = {
      ...next,
      values: {
        ...next.values,
        [arrayFieldName]: [value]
      }
    }
  }
  return next
}

export default (...fieldNames) => ({ next }) =>
  fieldNames.reduce((next, fieldName) => buildToArrayTransform(fieldName)({ next }), next)
