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

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET || 'def6&ult-ses0#ion-sec9et'],
  maxAge: 24 * 60 * 60 * 1000,
}));
app.use(require('passport').initialize());
app.use(require('passport').session());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', homepage);
app.use('/', authRoutes);
app.use('/events', eventsRoutes);
app.use('/users', usersRoutes);
app.use('/registrations', registrationsRoutes);
app.use('/reviews', reviewsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});