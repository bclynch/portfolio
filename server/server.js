const express = require('express'),
bodyParser = require('body-parser'),
compression = require('compression'),
cors = require('cors'),
fs = require('fs'),
morgan = require('morgan'),
chalk = require('chalk'),
app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.set('port', process.env.PORT || 5000);
app.use(compression()); // compress all responses
app.use(cors()); // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests

//set up the logger
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
app.use(morgan('combined',  { "stream": accessLogStream }));

// Initialize the app.
app.listen(app.get('port'), 'localhost', () => console.log(chalk.cyan.bold(`You're a job seeker, Harry. 📀🎵 I'm a what? Yes, a job seeker. Spinning up ${process.env.NODE_ENV === 'production' ? 'production' : 'dev'} on port`, app.get('port'))) );