const express = require('express');
const app = express();
const User = require('./db/db.js');

app.use(express.json());

app.get('/details', async (req, res) => {
    try {
        const {name} = req.query;

        if (!name) {
            return res.status(400).json({ msg: 'Name query parameter is required' });
        }

        const users = await User.find({
            name: { $regex: `.*${name}.*`, $options: 'i' } 
        });

        res.json({
            msg: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});

app.post('/User', async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            password: req.body.password
        });
        res.status(200).json({
            msg: 'User created successfully'
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            msg: 'Error creating user'
        });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
