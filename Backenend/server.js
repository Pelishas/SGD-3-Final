require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const { validateProduct } = require('./middleware/validation');
const { errorHandler, NotFoundError } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5760;

connectDB();

app.use(express.json());
app.use(logger);
