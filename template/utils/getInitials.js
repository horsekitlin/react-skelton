/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (name = '') => name
  .replace(/\s+/, ' ')
  .split(' ')
  .slice(0, 2)
  .map((v) => v && v[0].toUpperCase())
  .join('');