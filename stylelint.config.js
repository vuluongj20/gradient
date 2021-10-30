module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-styled-components',
		'stylelint-config-prettier',
		'stylelint-config-recommended',
	],
	processors: ['stylelint-processor-styled-components'],
	rules: {
		'declaration-empty-line-before': null,
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
