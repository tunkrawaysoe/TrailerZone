const express = require('express');

const app = express();
const PORT = 3000;
app.use(express.json());

const users = [
    {
        id: 1,
        name: "Tun Tun",
        email: "tuntun@example.com",
        phoneNumber: "09123456789",
        password: "password123"
    },
    {
        id: 2,
        name: "Su Su",
        email: "susu@example.com",
        phoneNumber: "09987654321",
        password: "password456"
    },
    {
        id: 3,
        name: "Aung Aung",
        email: "aung@example.com",
        phoneNumber: "09456789123",
        password: "password789"
    }
];

app.post('/auth/register', (req, res) => {
    const { name, email, phoneNumber, password } = req.body;
    if (!name || !email || !phoneNumber || !password) {
        return res.status(400).json({
            messsage: 'all field are required'
        });

    }
    const foundUser = users.find(user => user.email === email);
    if (foundUser) {
        return res.status(409).json({
            messsage: "Email already exists"
        })
    }
    const newUser = {
        id: users.length + 1,
        name,
        email,
        phoneNumber,
        password
    }
    users.push(newUser);
    console.log(users);
    res.status(201).json({
        messsage: "User created successfully",
        user: newUser
    })
})

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are requird" });
    }
    const foundUser = users.find(user => user.email === email);
    if (!foundUser) return res.status(404).json({ message: "You have to register first" });
    const isMatch = foundUser.password === password;
    if (!isMatch) return res.status(401).json({ message: "Password don't match" });
    return res.status(200).json({
        message: "Login Sucessful",
        user: foundUser,
    })
})



app.get('/', (req, res) => {
    res.status(200).json({
        message: "This is auth server"
    })
})

app.listen(PORT, () => {
    console.log("Server is running at", PORT);
})
