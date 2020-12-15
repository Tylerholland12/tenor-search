// Require Libraries
const express = require('express');

// Require tenorjs near the top of the file
const Tenor = require("tenorjs").client({
    // Replace with your own key
    "Key": "O7JUYLAD3RN9", // https://tenor.com/developer/keyregistration
    "Filter": "high", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
});

// App Setup
const app = express();

app.use(express.static('public'));

// Middleware

const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes

app.get('/:username', (req, res) => {
    // Here you would look up the user from the database
    // Then render the template to display the users's info
  })

app.get('/', (req, res) => {
    // Handle the home page when we haven't queried yet
    term = ""
    if (req.query.term) {
        term = req.query.term
    }
    // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
    Tenor.Search.Query(term, "10")
        .then(response => {
            // store the gifs we get back from the search
            const gifs = response;
            // pass the gifs as an object into the home page
            res.render('home', { gifs })
        }).catch(console.error);
  })

app.get('/greetings/:name', (req, res) => {
    // grab the name from the path provided
    const name = req.params.name;
    // render the greetings view, passing along the name
    res.render('greetings', { name });
  })

// Start Server

app.listen(3000, () => {
    console.log('Gif Search listening on port localhost:3000!');
  });