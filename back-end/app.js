const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose');
const bcryct = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const Item = require('./models/item');
const Chat = require('./models/Chat');
const dotenv = require("dotenv");
const User = require('./models/User');
const multer = require('multer');
const bodyParser = require('body-parser');
const Category = require('./models/Category');
const ws = require('ws');
const Message = require('./models/Message');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    
}));

const bcryctSalt = bcryct.genSaltSync(10);
dotenv.config();
mongoose.connect(process.env.MONGO_URL);


app.use('/uploads', express.static('uploads'))
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());


app.get('/test', (req, res) => {
    res.json('Hello World!');
}); 

app.post('/register', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
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
  mongoose.connect(process.env.MONGO_URL);
    const { email, password} = req.body;
    const userDoc = await User.findOne({email});
    if(userDoc){
      const passok = bcryct.compareSync(password, userDoc.password);

        if(passok){
         jwt.sign(
            {
            email:userDoc.email ,
            id: userDoc._id,
            name:userDoc.name 
        }, 
        process.env.JWT_SECRET, {},(err, token) => {
            if(err) throw err;
            res.cookie('token',token,{ sameSite: 'none', secure: true}).json(userDoc);

        });

              
        }else{
            res.status(422).json('wrong password');
        } 
    }else{
        res.json('user not found');
    }
     
});

app.get('/profile', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err;
        const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
      });
    } else {
      res.json(null);
    }
  });

  app.get('/logout', (req, res) => {
    res.clearCookie('token',{ sameSite: 'none', secure: true});  // This clears the cookie from the client's browser.
    res.json({ success: true, message: "You are now logged out." });
});
const photosMiddleware = multer({ dest: 'uploads/' });

mongoose.connect(process.env.MONGO_URL);  // Connect to MongoDB once when server starts

app.post('/upload',photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = req.files.map(file => {
    const ext = file.originalname.split('.').pop();
    const newPath = `${file.path}.${ext}`;
    fs.renameSync(file.path, newPath);
    return newPath.replace('uploads\\','');
  });

  res.json(uploadedFiles);
});

app.post('/additem', (req, res) => {
  const {token} = req.cookies;
  const {title, address, photos, description, price, category,login} = req.body;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) {
      return res.status(401).json({error: "Invalid token"});
    }

    
      const itemDoc = await Item.create({
        owner: userData.id,
        title,
        address,
        photos,
        description,
        price,
        category,
        login,
      });
      res.json(itemDoc);
    
      
    
  });
});
app.get('/user-items', async (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    const {id} = userData;
    res.json(await Item.find({owner:id}));
  });
});

app.get('/items/:id', async (req, res) => {
  const {id} = req.params;
  res.json(await Item.findById(id));


});




app.put('/items/:id', async (req, res) => {
  const itemId = req.params.id;
  const itemData = req.body;
  const {token} = req.cookies;
  
  // Get the existing item before updating it
  const existingItem = await Item.findById(itemId);

  if (!existingItem) {
    // If item doesn't exist, return 404 error
    return res.status(404).send({ message: 'Item not found' });
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (userData.id !== existingItem.owner.toString()) {
      // If not owner, return 403 error (Forbidden)
      return res.status(403).send({ message: 'You are not allowed to update this item' });
    }
    
    // Find photos to delete
    const photosToDelete = existingItem.photos.filter(photo => !itemData.photos.includes(photo));

    // Delete photos
    photosToDelete.forEach(photo => {
      const photoPath = path.join(__dirname, '/uploads/', photo);
      fs.unlink(photoPath, err => {
        if (err) console.error(err);
      });
    });

    // Update item
    const updatedItem = await Item.findByIdAndUpdate(itemId, itemData, { new: true });
    res.send(updatedItem);
  });
});
app.delete('/items/:id', async (req, res) => {
  const itemId = req.params.id;
  const {token} = req.cookies;

  // Get the existing item before deleting it
  const existingItem = await Item.findById(itemId);

  if (!existingItem) {
    // If item doesn't exist, return 404 error
    return res.status(404).send({ message: 'Item not found' });
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (userData.id !== existingItem.owner.toString()) {
      // If not owner, return 403 error (Forbidden)
      return res.status(403).send({ message: 'You are not allowed to delete this item' });
    }
    
    // Delete photos
    existingItem.photos.forEach(photo => {
      const photoPath = path.join(__dirname, '/uploads/', photo);
      fs.unlink(photoPath, err => {
        if (err) console.error(err);
      });
    });

    // Delete item
    await Item.findByIdAndRemove(itemId);
    res.send({ message: `Item ${itemId} deleted.` });
  });
});



// Helper function to construct the search criteria
const constructSearchCriteria = (category, search) => {
  let criteria = { category };

  if (search) {
      criteria.title = new RegExp(search, 'i');
  }

  return criteria;
}


app.get('/items', async (req, res) => {
  const { category, search, city, minPrice, maxPrice, sortPrice } = req.query;

  let searchCriteria = {};
  let sortQuery = {};

  // Convert price strings to numbers
  const min = minPrice ? Number(minPrice) : 0;
  const max = maxPrice ? Number(maxPrice) : Number.POSITIVE_INFINITY;

  if (isNaN(min) || isNaN(max)) {
    return res.status(400).json({ message: 'Invalid price range' });
  }

  // Price range filtering
  searchCriteria.price = {
    $gte: min,
    $lte: max
  };

  // Category filtering
  if (category && category !== 'all') {
    searchCriteria.category = category;
  }

  // Search by title
  if (search && search !== 'all') {
    searchCriteria.title = new RegExp(search, 'i'); // 'i' makes it case-insensitive
  }

  // Search by city
  if (city) {
    searchCriteria.address = city; // Assuming the city is stored under the 'address' field in your model
  }

  // Sorting
  if (sortPrice === 'asc') {
    sortQuery = { price: 1 };
  } else if (sortPrice === 'desc') {
    sortQuery = { price: -1 };
  }

  try {
    const items = await Item.find(searchCriteria).sort(sortQuery); // Added sortQuery here
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



app.post('/categories', async (req, res) => {
  const category = new Category(req.body);
  try {
    // Save the new category
    const newCategory = await category.save();

    // If this category has a parent, add this category to the parent's children
    if (newCategory.parent) {
      const parentCategory = await Category.findOne({ name: newCategory.parent });
      parentCategory.children.push(newCategory.name);
      await parentCategory.save();
    }

    res.send('Category created!');
  } catch (err) {
    res.status(500).send('Failed to create category: ' + err.message);
  }
});

app.get('/categories', (req, res) => {
  Category.find()
    .then(categories => {
      res.json(categories);
    })
    .catch(err => {
      res.send('Failed to fetch categories:', err);
    });
});



app.get('/people', async (req, res) => {
const users = await User.find({}, { name: 1, _id: 1});
res.json(users);
});


function authenticateJWT(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
      return res.status(401).json({ error: "Token is missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedData) => {
      if (err) {
          return res.status(401).json({ error: "Invalid token" });
      }

      req.userData = decodedData;  // Save the decoded data to the request for further use
      next();  // Continue to the next middleware or route handler
  });
}
app.post('/chat', authenticateJWT, async (req, res) => {
  const { itemId } = req.body;
  const userId = req.userData.id;

  const chatuser = await Chat.find({
      $or: [
          { sender: userId },
          { recipient: userId }
      ]
  });

  if (!itemId) {
      return res.json(chatuser);
  }

  let item = await Item.findOne({ _id: itemId });
  if (!item) {
      return res.json(chatuser);
  }

  let ownerId = item.owner;
  let title = item.title;

  try {
      let chat = await Chat.findOne({ sender: userId, itemId, recipient: ownerId });

      if (!chat) {
          chat = await Chat.create({
              sender: userId,
              recipient: ownerId,
              itemId,
              title,
          });
          console.log(chat);
      }
  } catch (error) {
      console.error(error);
  }

  return res.json(chatuser);
});
app.get('/message/:id', authenticateJWT, async (req, res) => {
  const chatId = req.params.id;


const chatuser = await Message.find({ chatId: chatId });
  
  console.log( chatId);
  console.log(chatuser);
  res.json(chatuser);
});
const server = app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

const wss = new ws.WebSocketServer({ server });
async function getChatRecipients(chatId) {
  console.log(chatId, 'chatId');
  const chat = await Chat.findById(chatId).catch(err => {
    console.error('Error fetching chat:', err);
    return null;
  });
  if (!chat) return [];
  return [chat.sender, chat.recipient];
}

wss.on('connection', (connection, req) => {

  connection.isALive = true;
  connection.timer = setInterval(() => {
    connection.ping();
    connection.deathTimer = setTimeout(() => {
      connection.isALive = false;
      clearInterval(connection.timer);
      connection.terminate();
    }, 1000);
  }, 5000);

  connection.on('pong', () => {
    clearTimeout(connection.deathTimer);
  });

  if (typeof req.headers.cookie !== 'string') {
    connection.terminate();
    return;
  }

  const tokenCookieString = req.headers.cookie.split(';').find(str => str.startsWith('token='));
  if (!tokenCookieString) {
    connection.terminate();
    return;
  }

  const token = tokenCookieString.split('=')[1];
  if (!token) {
    connection.terminate();
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
    if (err) {
      console.error('Error verifying JWT:', err);
      connection.terminate();
      return;
    }
    const { id, name } = userData;
    connection.id = id;
    connection.name = name;
  });

  connection.on('close', () => {
    clearInterval(connection.timer);
    console.log(`Connection closed by ${connection.id}`);
  });

  connection.on('message', async (message) => {
    message = JSON.parse(message.toString());
    const {chatId, text, sender, recipient} = message;
    connection.chatId = chatId;
    if(chatId && text){
      const messageDoc = await Message.create({
        sender,
        recipient,
        chatId,
        text,
      }).catch(err => {
        console.error('Error saving message:', err);
        return null;
      });

      if (!messageDoc) {
        connection.terminate();
        return;
      }

      [...wss.clients]
      .filter(c => c.chatId === chatId)
      .forEach(c => c.send(JSON.stringify({
        sender,
        recipient,
        text,
        chatId,
        _id: messageDoc._id,
      })));
    }
  });

});
