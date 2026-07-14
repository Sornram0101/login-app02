const mysql = require('mysql2'); 

// เปลี่ยนจาก createConnection เป็น createPool เพื่อให้ระบบช่วยเชื่อมต่อซ้ำอัตโนมัติ
const pool = mysql.createPool({ 
    host: 'mariadb2', 
    user: 'admin', 
    password: 'bnccitconfig', 
    database: 'login_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}); 

// ตรวจสอบสถานะการเชื่อมต่อเบื้องต้น
pool.getConnection((err, connection) => {
    if (err) {
        console.log('Database Error: Waiting for MariaDB to be ready...');
        return;
    }
    console.log('Database Connected Successfully!');
    connection.release(); // คืนท่อเชื่อมต่อกลับเข้า Pool
});

module.exports = pool;