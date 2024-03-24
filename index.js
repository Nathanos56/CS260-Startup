const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const multer = require('multer');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

// JSON body parsing using built-in middleware
app.use(express.json());
// app.use(bodyParser.json());


// LOGIN
// REPLACE BEFORE PRODUCTION!
const secretKey = 'secretKey'; // Not secure!

const users = [
  { id: 1, email: 'admin@example.com', password: 'admin' }, // Insecure storage, replace with database
];

function validateCredentials(email, password) {
  // Replace user credential validation logic (database lookup, password hashing)
  const user = users.find(u => u.email === email && u.password === password);
  return user;
}

function generateAccessToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
}

app.post('/login-api', async (req, res) => {
  const { email, password } = req.body;

  const user = validateCredentials(email, password);
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

app.post('/reject-api', checkToken, async (req, res, next) => {
  
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





// FILE UPLOAD
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      const filetype = file.originalname.split('.').pop();
      const id = Math.round(Math.random() * 1e9);
      const filename = `${id}.${filetype}`;
      cb(null, filename);
    },
  }),
  limits: { fileSize: 64000 },
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.send({
      message: 'Uploaded succeeded',
      file: req.file.filename,
    });
  } else {
    res.status(400).send({ message: 'Upload failed' });
  }
});

app.get('/file/:filename', (req, res) => {
  res.sendFile(__dirname + `/uploads/${req.params.filename}`);
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(413).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message });
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














// ADD THIS ONCE WE START USING THE DATABASE

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   // Logic to find user by username in your database
//   const user = await findUserByUsername(username);

//   if (!user) {
//     return res.status(401).send('Invalid username or password'); // Unauthorized
//   }

//   // Compare hashed password with submitted password
//   const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

//   if (isPasswordValid) {
//     // Successful login logic (generate session token, etc.)
//     res.send({ message: 'Login successful!' }); // Or redirect to success page
//   } else {
//     res.status(401).send('Invalid username or password'); // Unauthorized
//   }
// });




// I think these are simon exclusive

// // GetScores
// apiRouter.get('/scores', (_req, res) => {
//   res.send(scores);
// });

// // SubmitScore
// apiRouter.post('/score', (req, res) => {
//   scores = updateScores(req.body, scores);
//   res.send(scores);
// });

