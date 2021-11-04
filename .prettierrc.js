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
    '^@pageComponents/(.*)$',
    '^@types(/(.*))*$',
    '^@utils(/(.*))*$',
  ],
  importOrderSeparation: true,
}
