const TEMPLATE_CHECK_REGEX = /{([^{}]*)}/;
/**
 * Replaces placeholders in a string with values from an object.
 *
 * This function searches for placeholders in the format `{key}` within a template
 * string and replaces them with corresponding values from the provided object.
 * It only performs a replacement if the key exists as an own property on the
 * object and its value is a `string` or a `number`. If a key is not found,
 * or if the corresponding value is not a string or number (e.g., it's an
 * object, array, or `null`), the original placeholder is left unchanged in the
 * resulting string.
 *
 * @template {Record<string, unknown>} T - The type of the data object, constrained
 * to be an object with string keys and values of any type.
 *
 * @param {string} stringTemplate - The template string containing placeholders
 * in the format `{key}`. For example, `"Hello, {user}!"`.
 *
 * @param {T} o - The object containing the data to supplant. The keys of this
 * object should match the names of the placeholders in the template.
 *
 * @returns {string} A new string with the placeholders replaced by their
 * corresponding values from the object.
 *
 * @example
 * // Basic usage with string and number replacement
 * const data = { user: 'Alice', points: 150 };
 * const template = 'User {user} has scored {points} points.';
 * const result = supplant(template, data);
 * // -> "User Alice has scored 150 points."
 *
 * @example
 * // Handling missing keys and invalid value types
 * const data = { user: 'Bob', lastLogin: new Date() };
 * const template = 'Welcome back, {user}! Your role is {role}.';
 * const result = supplant(template, data);
 * // -> "Welcome back, Bob! Your role is {role}."
 * // Note: {role} is not replaced because it's a missing key.
 * // If we tried to use {lastLogin}, it would also not be replaced
 * // because its value is a Date object, not a string or number.
 */
export function supplant<T extends Record<string, unknown>>(
  stringTemplate: string,
  o: T
): string {

  function isTemplateString(str: unknown): str is string {
    if (typeof str !== 'string' || !str) {
      return false;
    }
    return TEMPLATE_CHECK_REGEX.test(str);
  }

  if (!isTemplateString(stringTemplate)) {
    return stringTemplate;
  }

  return stringTemplate.replace(/{([^{}]*)}/g, (originalMatch, key: string) => {
    if (Object.hasOwn(o, key)) {
      const value = o[key];

      if (typeof value === 'string' || typeof value === 'number') {
        return String(value);
      }
    }

    return originalMatch;
  });
}