const express = require('express');
const db = require('./utils/database')
const app = require('./app')
const mongoose = require('mongoose')

mongoose.connect(db).then(()=>console.log('DB connection successful!'))
const port = process.env.PORT || 3000;
app.listen(4000, console.log(`App running on port ${port}...`))

