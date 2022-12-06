import {
  getDbHost,
  getDbName,
  getDbPassword,
  getDbPort,
  getDbUser,
  getEnv,
  getPort,
} from '../../utils/config'

describe('Config tests', () => {
  it('reads config values with fallback', () => {
    expect(getPort()).toEqual(3000)
    expect(getEnv()).toEqual('test')
    expect(getDbHost()).toEqual('localhost')
    expect(getDbUser()).toEqual('irl-package-manager')
    expect(getDbPassword()).toEqual('dev')
    expect(getDbName()).toEqual('irl-package-manager')
    expect(getDbPort()).toEqual(5432)
  })
})
