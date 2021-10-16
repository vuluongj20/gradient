module.exports = {
  semi: false,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 90,
  tabWidth: 2,
  bracketSpacing: true,
  importOrder: [
    '^[./]',
    '^@data(/(.*))*$',
    '^@components/(.*)$',
    '^@types(/(.*))*$',
    '^@utils(/(.*))*$',
  ],
  importOrderSeparation: true,
}
