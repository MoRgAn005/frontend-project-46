const stylish = (tree, depth = 1) => {
  const indentSize = 4
  const currentIndent = ' '.repeat(indentSize * depth)
  const bracketIndent = ' '.repeat(indentSize * (depth - 1))

  const lines = tree.map(node => {
    switch (node.type) {
    case 'added':
      return `${currentIndent}+ ${node.key}: ${stringify(node.value, depth + 1)}`
    case 'removed':
      return `${currentIndent}- ${node.key}: ${stringify(node.value, depth + 1)}`
    case 'unchanged':
      return `${currentIndent}  ${node.key}: ${stringify(node.value, depth + 1)}`
    case 'changed':
      return [
        `${currentIndent}- ${node.key}: ${stringify(node.value1, depth + 1)}`,
        `${currentIndent}+ ${node.key}: ${stringify(node.value2, depth + 1)}`,
      ]
    case 'nested':
      return [
        `${currentIndent}  ${node.key}: {`,
        `${stylish(node.children, depth + 1)}`,
        `${currentIndent}  }`,
      ]
    default:
      throw new Error(`Unknown node type: ${node.type}`)
    }
  })

  return lines.flat().join('\n')
}

const stringify = (value, depth) => {
  if (typeof value === 'object' && value !== null) {
    if (Object.keys(value).length === 0) {
      return '{}'
    }

    const indentSize = 4
    const currentIndent = ' '.repeat(indentSize * depth)
    const bracketIndent = ' '.repeat(indentSize * (depth - 1))

    const lines = Object.entries(value).map(([key, val]) => {
      return `${currentIndent}${key}: ${stringify(val, depth + 1)}`
    })

    return `{\n${lines.join('\n')}\n${bracketIndent}}`
  }

  if (value === null) {
    return 'null'
  }

  return String(value)
}

export default tree => `{\n${stylish(tree)}\n}`
