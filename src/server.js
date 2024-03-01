const express = require('express');
const path = require("path");
const morgan = require("morgan");
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const router = require('./routers')
const db = require('./config/db');
const passport = require('passport');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
// const header = require('header')
const methodOverride = require('method-override');//thư viện chuyển từ phương thức POST sang PUT

db.connect(); //ket noi mongoose
const port = 3030;
const app = express();

app.use(methodOverride('_method')) // chuyen method

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));
// app.use(morgan('combined'))

app.use(cookieparser());
app.use(express.json())

app.use(passport.initialize());
// app.use(passport.session());

app.set('trust proxy', 1);
app.use(session({
  secret: "meomeoadjjjjjj",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


app.use(express.static(path.join(__dirname, 'public')))

//router
router(app);

//Template engine
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resourses/views'));

app.use(cors());

app.listen(port, () => {
  console.log(`--->App listening at http://localhost:${port}`)
})
