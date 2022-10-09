const visit = require('unist-util-visit')
const { Parser } = require('acorn')

function attributes(props) {
  return Object.entries(props).map(([key, value]) => ({
    type: 'mdxJsxAttribute',
    name: key,
    value:
      typeof value === 'string'
        ? value
        : {
            type: 'mdxJsxAttributeValueExpression',
            data: {
              estree: Parser.parse(`(${JSON.stringify(value)})`, {
                ecmaVersion: 'latest',
                sourceType: 'script',
              }),
            },
          },
  }))
}

module.exports = ({ markdownAST }) => {
  /**
   * Ordered list of reference IDs
   */
  const referenceOrder = []
  /**
   * Record of citations, organized by the correpsonding reference ID.
   */
  const citations = {}

  visit(markdownAST, 'cite', (node) => {
    const { data } = node
    const referenceId = data && data.citeItems && data.citeItems[0].key

    if (!referenceId) {
      return
    }

    if (!referenceOrder.includes(referenceId)) {
      referenceOrder.push(referenceId)
    }

    if (!citations[referenceId]) {
      citations[referenceId] = []
    }

    const citationNumber = citations[referenceId].length
    const citationId =
      citationNumber <= 25
        ? String.fromCharCode(97 + citationNumber)
        : String(citationNumber - 25)
    citations[referenceId].push(citationId)

    const referenceIndex = referenceOrder.findIndex((id) => id === referenceId)

    node.type = 'mdxJsxFlowElement'
    node.name = 'Citation'
    node.attributes = attributes({
      id: citationId,
      referenceId,
      referenceNumber: referenceIndex + 1,
    })
  })

  visit(markdownAST, 'mdxJsxFlowElement', (node) => {
    if (node.name === 'References') {
      node.attributes = attributes({
        order: referenceOrder,
        citations,
      })
    }
  })

  return markdownAST
}
