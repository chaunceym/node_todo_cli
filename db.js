const fs = require('fs')
const path = require('path');
const { resolve } = require('path');
const homedir = require('os').homedir();
const home = process.env.home || homedir
const dbPath = path.join(home, '.todo')

module.exports = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, { flag: 'a+' }, (err, data) => {
                if (err) return reject(err)
                let list
                try {
                    list = JSON.parse(data.toString())
                } catch (err2) {
                    list = []
                }
                resolve(list)
            })
        })
    },
    write(list, path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, JSON.stringify(list), (err) => {
                if (err) return reject(err)
                resolve()
            })
        })
    }
}