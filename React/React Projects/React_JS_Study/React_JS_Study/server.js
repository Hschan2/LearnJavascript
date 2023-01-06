const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect(); // 데이터베이스 연결

const multer = require('multer');
const upload = multer({dest: './upload'})

// 데이터베이스의 정보 가져오기
app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM customer WHERE isDeleted = 0", // 삭제되지 않은 데이터만 가져오기 위해
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.use('/image', express.static('./upload')); // 이미지 폴더에서 업로드 파일을 이용할 수 있도록
app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO customer VALUES (null, ?, ?, ?, ?, ?, NOW() ,0)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params, // 쿼리 전송 (INSERT)
    (err, rows, fields) => {
        res.send(rows);
    }
);
}); // 고객 처리 이벤트를 발생했을 때 동작

app.delete('/api/customers/:id', (req, res) => {
  let sql = 'UPDATE customer SET isDeleted = 1 WHERE id = ?'; // 삭제하기 위한 데이터, isDeleted = 1
  let params = [req.params.id];
  connection.query(sql, params,
      (err, rows, fields) => {
          res.send(rows);
      }
    )
});

app.listen(port, () => console.log(`Listening on port ${port}`));