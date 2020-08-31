const db = require('../db')
const fs = require('fs')
jest.mock('fs')

describe('db', () => {
  it('read function', async () => {
    // 假数据测试代码
    fs.setMock('/xxx', null, JSON.stringify([{'title': 'eat noddle', done: true}]))
    const list = await db.read('/xxx')
    expect(list).toStrictEqual([{'title': 'eat noddle', done: true}])
  })
})