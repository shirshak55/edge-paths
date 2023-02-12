module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier --write'],
  '**/*.ts?(x)': () => 'tsc --noEmit --pretty',
  '*.json': ['prettier --write'],
};
