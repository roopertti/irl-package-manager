import { getPort } from "../../utils/config"

describe('Config tests', () => {
  it('reads PORT value with fallback', () => {
    expect(getPort()).toEqual(3000)
  })
})