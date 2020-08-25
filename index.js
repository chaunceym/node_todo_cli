const db = require('./db.js')
const inquirer = require('inquirer')
module.exports.add = async (task) => {
    const list = await db.read()
    list.push({
        title: task,
        done: false
    })
    console.log(list)
    await db.write(list)
}
module.exports.clear = async () => {
    await db.write([])
}
function createTask(list, index) {
    inquirer.prompt(
        {
            type: 'input',
            name: 'title',
            message: "请输入任务名",
        },
    ).then((answer) => {
        list.push({
            title: answer.title,
            done: false
        })
        db.write(list)
    });
}
function updateTask(list, index) {
    inquirer.prompt(
        {
            type: 'input',
            name: 'title',
            message: "请输入新名字",
        },
    ).then((answer3) => {
        list[index].title = answer3.title
        db.write(list)
    });
}
function finishedTask(list, index) {
    list[index].done = true
    db.write(list)
}
function unfinishedTask(list, index) {
    list[index].done = false
    db.write(list)
}
function deleteTask(list, index) {
    list.splice(index, 1)
    db.write(list)
}
function alterTask(list, index) {
    const actions = { finishedTask, unfinishedTask, updateTask, deleteTask }
    inquirer.prompt(
        {
            type: 'list',
            name: 'action',
            message: '请选择操作',
            choices: [
                { name: '退出', value: 'quit' },
                { name: '标记为已完成', value: 'finishedTask' },
                { name: '标记为未完成', value: 'unfinishedTask' },
                { name: '修改任务名', value: 'updateTask' },
                { name: '删除任务', value: 'deleteTask' },
            ]
        },
    ).then(answer2 => {
        const act = actions[answer2.action]
        act && act(list, index)
    })
}
function printAllTasks(list) {
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'index',
                message: '请选择任务',
                choices: [{
                    name: '退出',
                    value: '-1'
                }, {
                    name: '创建任务',
                    value: '-2'
                },

                ...list.map((item, index) => {
                    return { name: `${item.done ? '[x]' : '[_]'} ${index + 1} ${item.title}`, value: index }
                })
                ],
            },
        )
        .then((answers) => {
            const index = parseInt(answers.index)
            if (index >= 0) {
                alterTask(list, index)
            } else if (index === -2) {
                createTask(list, index)
            }
        });
}
module.exports.showAll = async () => {
    const list = await db.read()
    printAllTasks(list)
}