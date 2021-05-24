// const os = require('os');
// const foo = require('./func.js');
// const { a } = require('./func.js');
// const foos = require('./func.js');
// const foo = require('./func/');
// const moment = require('moment');
const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World!');
        res.end();
    }
    if (req.url === '/api/users') {
        fs.readFile('db.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                res.end();
            } else {
                res.write(data);
                res.end();
            }
        });
    }
});

server.listen(8888);
server.on('connection', (socket) => {
    console.log('Новое подключение');
});

// const users = [{name: 'Ann', age: 20}];

// fs.writeFile('db.json', JSON.stringify(users), (err) => {
//     if (err) console.log(err);
// });

// fs.readFile('db.json', 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     else {
//         const list = JSON.parse(data);
//
//         list.push({name: 'Vasya', age: 30});
//
//         fs.writeFile('db.json', JSON.stringify(list), (err) => {
//             if (err) console.log(err);
//         });
//     }
// });
// console.log(moment());
// console.log(os.platform());
// console.log(os.cpus());
// console.log(foo(10));
// console.log(a(10));
// console.log(foos.a(10));
// console.log(foo(10));
