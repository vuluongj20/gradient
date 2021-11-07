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
    '^@icons/(.*)$',
    '^@types(/(.*))*$',
    '^@utils(/(.*))*$',
  ],
  importOrderSeparation: true,
}
