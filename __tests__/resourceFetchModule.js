import { generateResourceFetchModule } from '../src/resourceFetch'

test('resource fetch module', () => {
  expect(generateResourceFetchModule).toThrow()
  expect(() => generateResourceFetchModule(123)).toThrow()
})
