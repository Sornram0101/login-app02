const express = require("express"); 
const app = express(); 
const db = require("./config/db"); 
app.use(express.json()); 
const PORT = 3000; 
app.get("/", (req, res) => { 
res.send("Node.js Server Ready"); 
}); 
app.listen(PORT, () => { 
console.clear(); 
console.log(` 
================================================== 
BACKEND SERVER STARTED 
================================================== 
Server URL 
http://localhost:${PORT} 
API Endpoint 
POST http://localhost:${PORT}/login 
Test Commandline 
curl -X POST http://localhost:3000/login ^ -H "Content-Type: application/json" ^ -d "{\\"username\\": \\"admin\\", \\"password\\": \\"1234\\"}" 
Test Browser 
URL http://localhost:${PORT} 
Test Postman 
Method : POST 
URK    : http://localhost:${PORT}/login 
Body (JSON) 
{ 
"username":"admin", 
"password":"1234" 
} 
================================================== 
`); 
});

app.post("/login", (req, res) => { 
    console.log(req.body); 
    const username = req.body.username; 
    const password = req.body.password; 
    const sql = "SELECT * FROM users WHERE username = ? AND password = ? "; 
    db.query(sql, [username, password], (err, result) => { 
        if (err) { 
            return res.status(500).json({ 
                message: "Database Error", 
            }); 
        } 
        if (result.length > 0) { 
            res.json({ 
                status: true, 
                message: "Login Success", 
            }); 
        } else { 
            res.json({ 
                status: false, 
                message: "Username หรือ Password ไม่ถูกต้อง", 
            }); 
        } 
    }); 
});