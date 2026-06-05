require('dotenv').config();

const express = require("express");
const cookieSession = require('cookie-session');

const app = express();
const homepage = require('./routes/home');
const authRoutes = require('./routes/auth');
const eventsRoutes = require('./routes/events');
const usersRoutes = require('./routes/users');
const registrationsRoutes = require('./routes/registrations');
const reviewsRoutes = require('./routes/reviews');

const { swaggerUi, swaggerSpec } = require("./swagger");

app.use(express.json());
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET || 'default-session-secret'],
  maxAge: 24 * 60 * 60 * 1000,
}));
app.use(require('passport').initialize());
app.use(require('passport').session());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', homepage);
app.use('/auth', authRoutes);
app.use('/events', eventsRoutes);
app.use('/users', usersRoutes);
app.use('/registrations', registrationsRoutes);
app.use('/reviews', reviewsRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});