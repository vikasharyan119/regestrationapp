const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());
// ... all other app.use and routes

app.get('/', (req, res) => {
  res.send('Backend is running 🎉');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ MongoDB connection
const mongoURI = process.env.MONGO_URI;
// or your Atlas URI
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Define schemas & models directly

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
  address: String,
  gender: String,
  country: String,
  dob: Date
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const travelBookingSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  passportNumber: String,
  departureCountry: String,
  destinationCountry: String,
  travelDate: Date,
  returnDate: Date,
  travelType: String,
  travelers: Number,
  travelClass: String,
  mealPreference: String,
  addOns: [String],
  paymentMethod: String,
  specialRequests: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);
const TravelBooking = mongoose.model('TravelBooking', travelBookingSchema);


app.post('/signup', async (req, res) => {
  const { firstname, lastname, email, password, address, gender, country, dob } = req.body;

  if (!firstname || !lastname || !email || !password || !address || !gender || !country || !dob) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = await User.create({ firstname, lastname, email, password, address, gender, country, dob });

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, firstname: newUser.firstname },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Signup successful',
      user: newUser,
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, firstname: user.firstname },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add this to your Express server
app.post('/travel-booking', async (req, res) => {
  try {
    const booking = await TravelBooking.create(req.body);
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    console.error('Travel booking error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
