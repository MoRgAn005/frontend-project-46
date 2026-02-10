import path from 'path'
import genDiff from '../src/index.js'

const getFixturePath = filename => path.join(process.cwd(), '__fixtures__', filename)

describe('genDiff', () => {
  test('compares two nested JSON files', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')

    const result = genDiff(filepath1, filepath2)

    expect(result).toContain('common: {')
    expect(result).toContain('+ follow: false')
    expect(result).toContain('- setting2: 200')
    expect(result).toContain('- setting3: true')
    expect(result).toContain('+ setting3: null')
    expect(result).toContain('+ setting4: blah blah')
    expect(result).toContain('setting6: {')
    expect(result).toContain('- wow:')
    expect(result).toContain('+ wow: so much')
    expect(result).toContain('+ ops: vops')
    expect(result).toContain('- group2:')
    expect(result).toContain('+ group3:')
  })

  test('compares two nested YAML files', () => {
    const filepath1 = getFixturePath('file1.yml')
    const filepath2 = getFixturePath('file2.yml')

    const result = genDiff(filepath1, filepath2)

    expect(result).toContain('common: {')
    expect(result).toContain('+ follow: false')
    expect(result).toContain('- setting2: 200')
  })

  test('compares JSON with YAML nested files', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.yml')

    const result = genDiff(filepath1, filepath2)

    expect(result).toContain('common: {')
    expect(result).toContain('+ follow: false')
  })

  test('handles empty objects', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')

    const result = genDiff(filepath1, filepath2)

    expect(result).toContain('doge: {')
  })

  test('handles null values', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')

    const result = genDiff(filepath1, filepath2)

    expect(result).toContain('+ setting3: null')
  })

  test('handles string values', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')

    const result = genDiff(filepath1, filepath2)

    expect(result).toContain('setting1: Value 1')
  })
})