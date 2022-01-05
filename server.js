// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date_string", (req, res) => {
  let dateString = req.params.date_string;

  if (/\d{5,}/.test(dateString)) {
    let dateInt = parseInt(dateString);
    
    res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
  } else {
    let dateObject = new Date(dateString);

    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
  }
});

app.get("/api/timestamp", function(req, res) {
  // We'll save the current timestamp as a Date object...
  let newDate = new Date();
  // ... then we'll redirect to the correct endpoint, adding the date to the end of the URL:
  // A 302 HTTP status code, also known as "Found", is used when the Web page is temporarily not available for reasons that have not been unforeseen. That way, search engines don't update their links.
  // NB: If we don't specify a redirect type, express.js defaults to "302 Found". For clarity, we add the 302 here:
  res.redirect(302, "/api/timestamp/" + newDate.getFullYear() + "-" + (newDate.getUTCMonth() + 1) + "-" + newDate.getUTCDate() );    // NB: Date object months are zero-indexed, so we add 1 to the month value of our date query.
});




app.get("/api/timestamp/:dateReq", function(req, res) {

  let date;

  if ( /\D/.test(req.params.dateReq) ) {
    date = new Date( req.params.dateReq );
  }
  else {
    date = new Date( parseInt(req.params.dateReq) );
  };
  let utcDate = date.toUTCString();
  let unixDate = date.getTime();
  
  res.json({
    "unix": unixDate,
    "utc": utcDate
  });
  
});
  


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});