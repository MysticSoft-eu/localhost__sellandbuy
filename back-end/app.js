const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose');
const bcryct = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const dotenv = require("dotenv");
const User = require('./models/User');
const { HostAddress } = require('mongodb');


const bcryctSalt = bcryct.genSaltSync(10);
dotenv.config();
mongoose.connect(process.env.MONGO_URL);



app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));


app.get('/test', (req, res) => {
    res.json('Hello World!');
}); 

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try{
   
        const userDoc = await User.create({ 
        name,
        email,
         password : bcryct.hashSync(password,bcryctSalt),
        });

    res.json(userDoc);
    }catch(e){
        res.status(422).json(e);
    }
});
app.post('/login', async (req, res) => {
    const { email, password} = req.body;
    const userDoc = await User.findOne({email});
    if(userDoc){
      const passok = bcryct.compareSync(password, userDoc.password);

        if(passok){
         jwt.sign({email:userDoc ,id: userDoc._id,name:userDoc }, process.env.JWT_SECRET, {},(err, token) => {
            if(err) throw err;
            res.cookie('token',token,{ sameSite: 'none', secure: true }).json(userDoc);

        });

              
        }else{
            res.status(422).json('wrong password');
        } 
    }else{
        res.json('user not found');
    }
     
});

app.get('/profile', (req, res) => {
   
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err) throw err;
            res.json(user);
        });
    }

  
   
});




app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
