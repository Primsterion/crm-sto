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
    const sql = `SELECT * FROM clients`;

    Connection.query(sql, (err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

//Показать работы
app.get('/clt/works', (req, res) => {
    const sql = `SELECT clients.fio, clients.tel, clients.auto, clients.date, clients.address, clients.vin, works.work_id, works.status, works.work_type_id, employers.fio_employer, employers.position, employers.INN FROM clients
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

//Получить все подработы
app.get('/work-types', (req, res) => {
    const sql = `SELECT * FROM work_type`;

    Connection.query(sql, (err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

//Изменить клиента
app.post('/clt/edit', (req, res) => {
    const { id, fio, tel, address, auto, vin } = req.body.data;
    const sql = `UPDATE clients SET fio = '${fio}', tel='${tel}', address='${address}', auto='${auto}', vin='${vin}' WHERE client_id = ${id}`;

    Connection.query(sql, (err) => {
        if(err) throw err;
        res.send('ok');
    });
});

//Добавить клиента
app.post('/clt/add', (req, res) => {
    const { fio, tel, address, auto, vin, date } = req.body.data;
    const sql = `INSERT INTO clients(fio, tel, address, auto, vin, date) VALUES ('${fio}', '${tel}', '${address}', '${auto}', '${vin}', '${date}')`;

    Connection.query(sql, (err) => {
        if(err) throw err;
        res.send('ok');
    });
});

//==============РАБОТЫ===============

//Получить все работы
app.get('/works', (req, res) => {
    const sql = `SELECT clients.fio, clients.tel, clients.auto, clients.date, clients.address, clients.vin, works.work_id, works.status, works.work_type_id, employers.fio_employer, employers.position, employers.INN FROM clients INNER JOIN works ON works.client_id = clients.client_id INNER JOIN employers ON works.employer_id = employers.employer_id WHERE clients.client_id = works.client_id`;

    Connection.query(sql, (err, data) => {
        if (err) throw err;
        res.send(data);
    })
});


//Получить все типы работ
app.get('/work-types', (req, res) => {
    const sql = `SELECT * FROM work_types`;

    Connection.query(sql, (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});

//Изменить статус работы
app.post('/works/save-status', (req, res) => {
    const { status, id } = req.body.data;

    const sql = `UPDATE works SET status = '${status}' WHERE work_id = ${id}`;

    Connection.query(sql, (err) => {
        if (err) throw err;
        res.send('ok');
    });
})

//Добавить работу
app.post('/works/add', (req, res) => {
    const {client_id, employer_id, work_types_id, status, date } = req.body.data;
    const sql = `INSERT INTO works(client_id, employer_id, work_type_id, status, date) VALUES ('${client_id}', '${employer_id}', '${work_types_id}', '${status}', '${date}')`;
    
    Connection.query(sql, (err) => {
        if (err) throw err;
        res.send('ok');
    });
    
});

const port = 48656;

app.listen(port, () => console.log('Server start! Port: ' + port));