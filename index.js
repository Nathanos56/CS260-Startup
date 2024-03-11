const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const app = express();
app.use(bodyParser.json());

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


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

// GetScores
apiRouter.get('/scores', (_req, res) => {
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', (req, res) => {
  scores = updateScores(req.body, scores);
  res.send(scores);
});

