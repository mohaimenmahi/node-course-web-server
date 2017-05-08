const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to create server.log');
    }
  });
  next();
});

// app.use((req,res,next) => {
//   res.render('maintaince.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Welcome to our New web server',
    welcomeNote: 'This is our new Web Server. You Know nothing snow.'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req,res) => {
  res.render('projects.hbs', {
    pageTitle: 'Project Page',
    welcomeNote: 'We have no projects yet'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up to the port ${port}`);
});
