const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const multer = require('multer');
const cookieParser = require('cookie-parser');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

app.use(cookieParser());
app.use(express.json());;



// MONGODB
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
let client = new MongoClient(url);

async function connectToDatabase() {
  client = await MongoClient.connect(url);
}

connectToDatabase().then(() => {
  console.log('Connected to MongoDB');
});

// Close the connection on server shutdown
process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0); // Exit gracefully
});

async function hashPassword(password) {
  const saltRounds = 10; // Adjust as needed
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}





// LOGIN
const secretKey = config.secretKey;

async function validateCredentials(email, password) {
  try {
    // await client.connect();
    const db = client.db('cred');
    const usersCollection = db.collection('admin');

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return null; // User not found
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return user; // Credentials valid
    } else {
      return null; // Invalid password
    }
  } catch (err) {
    // Handle errors
    return null;
  } finally {
    // await client.close();
  }
}

function generateAccessToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
}

app.post('/login-api', async (req, res) => {
  const { email, password } = req.body;

  const user = await validateCredentials(email, password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateAccessToken(user.id);
  res.cookie('token', token, { httpOnly: true });
  res.json({ message: 'Login successful' });
});

app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'public' });
});



// ADMIN PAGE
app.get('/admin', checkToken, (req, res) => {
  res.sendFile('admin.html', { root: 'public' });
});

app.post('/accept-api', checkToken, async (req, res, next) => {
  
});

// still working on this
app.delete('/reject-api', checkToken, async (req, res, next) => {
  try {
    // await client.connect();
    const db = client.db('img');
    const imagesCollection = db.collection('user');

    // const imgID = req.body.id;
    // const imgID = new ObjectId(req.body.id);
    const imgID = ObjectId.createFromHexString(req.body.id);

    const deleteResult = await imagesCollection.deleteOne({ _id: imgID });

    if (deleteResult.deletedCount === 1) {
      res.json({ message: 'Image deleted successfully' });
    } else {
      res.json({ message: 'The image was not deleted' });
    }
    // await client.close();
  } catch (err) {
    res.json({ message: 'ERROR Deleting img: ' + err.message });
  }
});

function checkToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login'); // Redirect if no token found

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.redirect('/login'); // Redirect on verification error

    req.user = user;
    next();
  });
};

app.post('/admin-img', checkToken, async (req, res, next) => {
  try {
    // await client.connect();
    const db = client.db('img');
    const imagesCollection = db.collection('user');

    const { num } = req.body;
    const image = await imagesCollection.find().sort({ _id: 1 }).toArray();

    if (image[num - 1]) {
      res.json({ ...image[num-1], imageExists: true });
    } else {
      res.json({ imageExists: false });
    }
  } catch (error) {
    console.log(error);
  } finally {
    // await client.close();
  }

});




// FILE UPLOAD
const limits = { fileSize: 2048576 }; // ~2 MB limit
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept image files
  } else {
    cb(new multer.MulterError('LIMIT_FILE_TYPE', 'Only image files are allowed!'), false); // Reject non-image files
  }
};
const storage = multer.memoryStorage(); // Store images in memory temporarily
const upload = multer({ storage, limits, fileFilter });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // await client.connect();
    const db = client.db('img');
    const imagesCollection = db.collection('user');

    // Get the image data from the request
    const imageBuffer = req.file.buffer;
    const userName = req.body.userName;

    // Store the image in MongoDB
    const image = await imagesCollection.insertOne({
      image: imageBuffer, // Store the image as a Buffer
      userName: userName,
    });

    res.json({ message: 'Image uploaded successfully' });
  } catch (err) {
    if (err instanceof multer.MulterError) {
      console.error(err.message);
      res.status(400).json({ message: 'Only image files are allowed!' });
    } else {
      console.error(err.message);
      res.status(500).json({ message: 'Failed to upload image' });
    }
  } finally {
    // await client.close();
  }
});












// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(3000, () => console.log('Server listening on port 3000'));