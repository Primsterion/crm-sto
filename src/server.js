const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');
const cors = require('cors');

var Connection;

function dbConnect(){
    Connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'crm_sto',
        port: 3306
    });

    Connection.on('error', dbConnect);
}

dbConnect();


const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

/* ЗАПРОСЫ */

//=============Сотрудники==============

//Добавления сотрудника
app.post('/emp/add', (req, res) => {
    const sql = `INSERT INTO employers(fio_employer, tel_employer, address_employer, position, INN) 
    VALUES ('${req.body.fio}', '${req.body.tel}', '${req.body.address}', '${req.body.position}','${req.body.INN}')`;

    Connection.query(sql);

    res.send('OK');
});

//Получение сотрудников
app.get('/emp/get', (req, res) => {
    const sql = `SELECT * FROM employers`;
    Connection.query(sql, (err, data) => {
        if(err) throw err;
        res.send(JSON.stringify(data));
    });

});

//Редактирование сотрудника
app.post('/emp/edit', (req, res) => {
    const sql = `UPDATE employers SET fio_employer = '${req.body.fio}', tel_employer = '${req.body.tel}', 
    address_employer = '${req.body.address}', position = '${req.body.position}', INN = '${req.body.INN}' WHERE employer_id = ${req.body.id}`;

    Connection.query(sql, (err) => {
        if(err) throw err;
        res.send('ok');
    });
});

//Удаление сотрудника
app.post('/emp/del', (req, res) => {
    const sql = `DELETE FROM employers WHERE employer_id = ${req.body.data.emp_id}`;

    Connection.query(sql, (err) => {
        if(err) throw err;
        res.send('ok');
    });
});


//=============Клиенты==============
//Получить клиентов
app.get('/clt', (req, res) => {
    const sql = `SELECT client_id, fio, tel, auto, address, date FROM clients`;

    Connection.query(sql, (err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

//Показать работы
app.get('/clt/works', (req, res) => {
    const sql = `SELECT clients.fio, clients.tel, clients.auto, clients.address, works.status, works.work_type_id, employers.fio_employer, employers.position, employers.INN FROM clients
    INNER JOIN works ON works.client_id = clients.client_id
    INNER JOIN employers ON works.employer_id = employers.employer_id
    WHERE clients.client_id = ${req.query.id}`;

    Connection.query(sql, (err, data) => {
        if(err) throw err;
        const json = JSON.stringify(data);
        res.send(json);
    })
});

//Показать подработы
app.get('/clt/sub-works', (req, res) => {

    const work_types = req.query.sub_works.split(';');
    let sql = `SELECT work_type_name, work_type_sum FROM work_type WHERE work_type_id IN (`;

    for(let i = 0; i < work_types.length; i++){
        if(i === work_types.length - 1){
            sql += work_types[i];
        }else{
            sql += work_types[i] + ',';
        }
    }

    sql += ')';

    Connection.query(sql, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});

//Изменить клиента
app.post('/clt/edit', (req, res) => {
    const sql = `UPDATE clients SET fio = '${req.body.data.fio}', tel='${req.body.data.tel}', address='${req.body.data.address}', auto='${req.body.data.auto}' WHERE client_id = ${req.body.data.id}`;

    Connection.query(sql, (err) => {
        if(err) throw err;
        res.send('ok');
    });
});

const port = 48656;

app.listen(port, () => console.log('Server start! Port: ' + port));