const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
const JWT_SECRET = 'mySuperSecretKey123';

// ✅ MongoDB connection
const mongoURI = 'mongodb://localhost:27017/signupdb'; // or your Atlas URI
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
