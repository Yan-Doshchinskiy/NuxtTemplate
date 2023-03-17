export const VALIDATION_PATTERNS = {
  LATIN_NUMBER: /^[a-zA-Z0-9]$/,
  LATIN_NUMBER_SYMBOL: /^[a-zA-Z0-9!@#$%^\s&*()_+-=}{\[\]"|':;`?><,./\\]*$/,
  NAME: /^[A-Za-z]+([-`'\s][A-Za-z]+)*$/g,
  DISCORD: /^@?[^#@:]{2,32}#[0-9]{4}$/,
  PRICE: /^[0-9]{1,13}(([.][0-9]{1,2})?)$/
};
