const express = require('express')
const app = express()
const router = express.Router()
const bodyParsor = require('body-parser')
const bcrypt = require('bcryptjs');
const db = require('../database/db')
app.use(bodyParsor.json());
app.use(bodyParsor.urlencoded({ extended: true }));

const jwt = require('jsonwebtoken');
router.post('/', function (req, res) {
    try {
        const { username, password } = req.body;

        const query = 'SELECT * FROM login WHERE username = ?';
        db.query(query, [username], async (err, results) => {
            if (err) {
                return res.status(500).send('Error logging in');
            }
            if (results.length === 0) {
                console.log("none")
                return res.status(400).send('Invalid credentials');
            }

            const user = results[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                console.log("Invalid")
                return res.status(400).send('Invalid credentials');
            }
            else {
                const token = jwt.sign({ userId: user.id,username:user.username },'pharmacy',{expiresIn:86400 });
                if (user.role == 'Admin') {
                    db.query('select * from admin where id=?', [user.register], function (err, roledata) {
                        if (err) {
                            return res.status(400).send('Invalid credentials');
                        }
                        else {
                            res.status(200).json({ token, user: roledata[0],logindata:user });
                        }
                    })
                }
                 else if (user.role == 'Pharmacy') {
                    db.query('select * from pharmacy where id=?',[user.register],function(err,roledata){
                        if (err) {
                            return res.status(400).send('Invalid credentials');
                        }
                        else{
                            res.status(200).json({ token,user:roledata[0] });
                        }
                    })
                 }
                 else if (user.role == 'Doctor') {
                    db.query('select * from doctor where id=?',[user.register],function(err,roledata){
                        if (err) {
                            return res.status(400).send('Invalid credentials');
                        }
                        else{
                            res.status(200).json({ token,user:roledata[0] });
                        }
                    })
                 }

            }

        });
    } catch (error) {
        res.status(500).send('Error logging in');
    }

})

module.exports = router;