const db = require('../db')
const fs = require('fs')
jest.mock('fs')

describe('db', () => {
  it('read function', async () => {
    // 假数据测试代码
    fs.setReadMock('/xxx', null, JSON.stringify([{'title': 'eat noddle', done: true}]))
    const list = await db.read('/xxx')
    expect(list).toStrictEqual([{'title': 'eat noddle', done: true}])
  })
  it('write function', async () => {
    let fakeFile
    fs.setWriteMock('/yyy',(path,data,callback)=>{
      fakeFile = data
      callback(null)
    })
    const list = [{title: 'meng',done: true},{title: 'meng',done: true}]
    await db.write(list,'/yyy')
    expect(fakeFile).toBe(JSON.stringify(list))
  })
})