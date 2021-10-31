module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-prettier',
		'stylelint-config-recommended',
		'stylelint-config-styled-components',
	],
	customSyntax: 'postcss',
	processors: ['stylelint-processor-styled-components'],
	rules: {
		'declaration-empty-line-before': null,
		'rule-empty-line-before': null,
		'no-empty-source': null,
		'no-descending-specificity': null,
		'value-keyword-case': ['lower', { ignoreKeywords: ['dummyValue'] }],
		'selector-type-no-unknown': [
			true,
			{
				ignoreTypes: ['/-styled-mixin/', '$dummyValue'],
			},
		],
	},
}
