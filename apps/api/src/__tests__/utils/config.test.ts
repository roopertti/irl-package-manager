import { getEnv, getPort } from "../../utils/config"

describe('Config tests', () => {
  it('reads PORT value with fallback', () => {
    expect(getPort()).toEqual(3000)
    expect(getEnv()).toEqual('test')
  })
})