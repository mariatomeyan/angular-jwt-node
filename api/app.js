const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const port = 3000;

// Use the cors middleware
app.use(cors());

const secretKey = 'my-secret-key-is-strong';

let users = [
    {
        id: 1,
        name: 'Maria Admin',
        email: 'admin@admin.com',
        password: 'admin',
        username: 'admin',
        role: "admin"
    },
    {
        id: 2,
        name: 'David Operator',
        email: 'operator@operator.com',
        username: 'operator',
        password: 'operator',
        role: 'operator'
    }
];

app.use(express.json());

// Endpoint to get all users
app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user || user.password !== password) {
        // User not found or password didn't match
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // User found and password matched. Generate and return ta JWT
    const tokenPayload = { userId: user.id, role: user.role, name: user.name};

    jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' }, (err, token) => {
        if (err) {
            return res.sendStatus(500);
        }
         res.json({ token });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});