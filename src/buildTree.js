const buildTree = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const allKeys = Array.from(new Set([...keys1, ...keys2])).sort()

  return allKeys.map((key) => {
    if (!(key in data1)) {
      return { key, type: 'added', value: data2[key] }
    }
    if (!(key in data2)) {
      return { key, type: 'removed', value: data1[key] }
    }

    const value1 = data1[key]
    const value2 = data2[key]

    if (typeof value1 === 'object' && value1 !== null && 
        typeof value2 === 'object' && value2 !== null) {
      return { key, type: 'nested', children: buildTree(value1, value2) }
    }

    if (value1 !== value2) {
      return { key, type: 'changed', value1, value2 }
    }

    return { key, type: 'unchanged', value: value1 }
  })
}

export default buildTree
