require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
console.log()
const users = [
    {
        id: 1,
        name: "Tun Tun",
        email: "tuntun@example.com",
        phoneNumber: "09123456789",
        password: "password123",
        refreshToken: "",
    },
    {
        id: 2,
        name: "Su Su",
        email: "susu@example.com",
        phoneNumber: "09987654321",
        password: "password456",
        refreshToken: ""
    },
    {
        id: 3,
        name: "Aung Aung",
        email: "aung@example.com",
        phoneNumber: "09456789123",
        password: "password789",
        refreshToken: ""
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
        password,
        refreshToken: ""
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
    const { refreshToken: hidden, password: _, ...rest } = foundUser;

    const accesstoken = jwt.sign({
        id: foundUser.id,
        email: foundUser.email
    }, JWT_SECRET, {
        expiresIn: '30s'
    });

    const refreshToken = jwt.sign({
        id: foundUser.id,
        email: foundUser.email
    },
        REFRESH_SECRET,
        {
            expiresIn: '7d'
        })

    foundUser.refreshToken = refreshToken;
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
        message: "Login Sucessful",
        user: rest,
        accesstoken
    })
})

app.get('/auth/logout', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const foundUser = users.find(user => user.refreshToken === refreshToken);
    if (foundUser) {
        foundUser.refreshToken = ""
    }
    res.clearCookie('refreshToken');

    return res.status(200).json({
        message: "Logout successfull"
    })
})

app.get('/get/users', (req, res) => {
    console.log(users)
    res.status(200).json({
        message: 'This is all users',
        users
    })
})
app.post('/auth/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) return res.status(401).json({ message: "No refresh token" });
    const foundUser = users.find(user => user.refreshToken === refreshToken);
    if (!foundUser) return res.status(401).json({ message: "Refresh token not recognized" });

    jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                message: 'Invalid refresh token'
            });
        }
        const accesstoken = jwt.sign({
            id: decoded.id,
            email: decoded.email
        }, JWT_SECRET, {
            expiresIn: '30s',
        })

        return res.status(200).json({ accesstoken });
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
