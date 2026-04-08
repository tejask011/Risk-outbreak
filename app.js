require("./src/config/env");
const connectDB = require("./src/config/db");
connectDB();


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use("/api/data", require("./src/routes/dataRoutes"));

// Test route (optional but useful)
app.get("/", (req, res) => {
  res.send("API Running");
});

// 404 handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: err.message
  });
});

module.exports = app;