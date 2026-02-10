import parseFile from './parsers.js'
import buildTree from './buildTree.js'
import stylish from './formatters/stylish.js'

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  const tree = buildTree(data1, data2)
  return stylish(tree)
}

export default genDiff