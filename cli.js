const { Command } = require('commander')
const program = new Command()
const api = require('./index.js');
const inquirer = require('inquirer')

if (process.argv.length === 2) {
    api.showAll()
} else {
    program
        .option('-x, --xxx', 'I am chauncey')
    program
        .command('add')
        .description('add a task')
        .action((a, b) => {
            let task = b.join(' ')
            api.add(task)
        });
    program
        .command('clear')
        .description('clear tasks stack')
        .action((a, b) => {
            api.clear()
        });
    program.parse(process.argv);

}