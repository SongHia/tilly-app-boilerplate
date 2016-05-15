## TODAY I LEARNED WEB APP
TIL.LY (Today I Learned) is an experiment in encouraging daily presence, reflection, and documentation of the everyday. Using text analysis (with <a href="http://alchemy.com">Alchemy's</a> Natural Language Processing) it resurfaces your past memories over time with animated GIFs from <a href="http://giphy.com">Giphy<a>.

This repo has the packaged code for a webapp that uses Node.js / Express.js / MongoDB (+Mongoose).
<ul>
<li>I. Web App (Node.js / Express.js / MongoDb (+Mongoose)</li>
<li>II. Twilio for SMS (this allows you do add entries through text messaging).</li>
</ul>

Current features:
<ul>
<li>make microdiary entries</li>
<li>edit entries via the admin</li>
<li>analyze, display, and surface relevant animated GIFs from past features</li>
<li>add entries through text messaging</li>
</ul>

Once you've set up the above, you can set up text prompts and resurface past entries with this code:
<ul>
<li>III. <a href="https://github.com/SongHia/tilly-app-bot-boilerplate">Tilly App Bot Repo</a></li>
</ul>

This uses modified boilerplate from <a href="https://github.com/sslover/designing-for-data-personalization">Sam Slover's Designing For Data Personalization course at NYU's ITP</a>.

## I. Web App (Node.js / Express.js / MongoDb (+Mongoose)

This is boilerplate code for setting up a simple node.js RESTful API app using: the express.js framework, a MongoDb database (with the help of Mongoose), and hosting it on Heroku. Please refer to the following documentation for each of these components:

* Node.js: <http://nodejs.org/>
* Express.js: <http://expressjs.com/>
* Moongoose.js (for MongoDB interaction): <http://mongoosejs.com/>
* Heroku: <https://devcenter.heroku.com/categories/support> 

### Getting started with your local development server

**Dependenices:**

1) Download node.js if you have not already <http://nodejs.org/>. You can confirm that node is successfully installed on your machine by opening up Terminal and typing 'node'. If you don't get an error, it's installed! You can exit the node process with Ctrl+c.

2) Download and install the Heroku Toolbelt <https://toolbelt.heroku.com>, this will give you the Heroku CLI (command line interface).

3) Set up an account at <https://heroku.com>. You will be asked to enter a credit card, but the app we are doing will not incur any charges (they just need a card on file). In fact, all Heroku apps have a starter/free level.

4) Download this repo and navigate into the code directory with Terminal. To download it, click "Download Zip" at [the repo](https://github.com/SongHia/tilly-app-boilerplate)... (do not clone it).

cd path/to/this/code/directory

5) Run **npm install** to get all required libraries.

	npm install

6) We now need to setup a Git repository and Heroku app.

	git init
	git add .
	git commit -am "init commit"

7) Create the Heroku app

	heroku create

NOTE: if it is your very **FIRST** time setting up a Heroku app, you will need to upload a public key to Heroku. See <http://stackoverflow.com/a/6059231>. As explained in that StackOverlow link, if you don't yet have a public key, you'll be prompted to add one.

8) Now that your heroku app is set-up, you can rename it whenever you like (now or in the future):

	heroku rename your-new-name

Your app will now be available at your-app-name.herokuapp.com

You can always open your app with the command:

	heroku open

### Setting Up Your MongoDB database

Heroku has many nice add-ons that make it easier to set-up an app. For example, the MongoLabs add-on gives you a MongoDB database with a single command.

9) Add MongoLabs Starter MongoDB to your heroku app:

	heroku addons:create mongolab

If you log-in to your heroku dashboard at <https://heroku.com>, you'll now see this as an add-on. Click on the 'MongoLab' link to see your database.

10) Get the Heroku MongoLab connection string into an .env file. 

	heroku config --shell | grep MONGODB_URI >> .env

Your connection string to MongoDB will now be in a **.env** file now (go have a look at the .env file). Your app connects to this database in the app.js file:

app.db = mongoose.connect(process.env.MONGODB_URI);

Your **.env file** is a secret config file that holds key app variables like this MongoDB URI string, and other things like 3rd Party API secrets and keys. It is specified in the .gitignore file, which means the .env file will **not** be tracked by .git and not available for others to see on github (this is good).

### Register for an ALCHEMY API Key

Alchemy lets us analyze text and surface insights (concepts, keywords, sentiment, among other data). For this iteration, Alchemy is used to surface keywords from entries and grab results from Giphy.

Register for an API Key from <a href="http://www.alchemyapi.com/api/register.html">Alchemy's site</a>.

Once you've received your key, update the remember.js file located in public/js.


### Starting the Server

11) We're ready to go! Run **npm start** to start your server.

	npm start

You can stop the server with Ctrl+c.

However, a slight annoyance here is that **every** time you change your code, you'll need to stop and restart your server.

A better option is to auto restart your server after you make some changes to your code. To do this, install **Nodemon**. [Nodemon](https://github.com/remy/nodemon) will watch your files and restart the server for you whenever your code changes.

Install Nodemon (you only need to do this **once**, and then it will be installed globally on your machine). In Terminal type,

	npm install -g nodemon

Then, you can start the app with:

	nodemon

12) Open web browser to <http://localhost:3000> to view the web app.

13) Stop the web server press Ctrl+c in the Terminal window.

### Push Your App to Github and Heroku

As you make changes, you'll want to periodically push your updated code base to both Github and to Heroku (where it is publicly hosted).

To get your updated code to **Heroku**, you'll need to:

	git add .
	git commit -m "your commit message"
	git push heroku master

To get your updated code to **Github**, you'll need to:

(first, create a new repo at Github; **you only need to create a repo once per project**; then, once a repo is created and you have changes to push):

	git add .
	git commit -am "your commit message"
	git push origin master

You don't need to double add and double commit though. So the following will work:

	git add .
	git commit -am "your commit message"
	git push origin master
	git push heroku master

### This App's Framework and NodeJS

This app uses the following libraries and concepts:

#### ExpressJS

ExpressJS (http://expressjs.com/) is a popular framework for building web applications in NodeJS.

#### RESTful API Routes

Web service APIs that adhere to the REST architectural constraints are called RESTful APIs (http://en.wikipedia.org/wiki/Representational_state_transfer#Applied_to_web_services). HTTP based RESTful APIs are defined with these aspects:

* base URI, such as http://example.com/resources/ or http://example.com/api/
* an Internet media type for the data. We are using JSON, but it can be any other valid Internet media type (e.g. XML, Atom, microformats, images, etc.)
* standard HTTP methods (e.g., GET, PUT, POST, or DELETE) and standardized and descriptive naming in API endpoints

Typical REST queries will look like:

* CREATE - http://example.com/api/create (POST)
* RETRIEVE 1 - http://example.com/api/get/:id (GET)
* RETRIEVE ALL - http://example.com/api/get (GET)
* UPDATE - http://example.com/api/update/:id (PUT)
* DELETE - http://example.com/api/delete/:id (DELETE)

The above are typically called API endpoints, and client applications interact with your API by sending requests to these endpoints. Remember, a client can be anything that can send an HTTP request, such as a browser, a mobile app, an Arduino Yun, etc.

Routing is how your app handles these incoming HTTP requests: performing the appropriate action and responding back to the client.

In node.js (using Express), this is done through executing a callback function. In human language: 

	when this request is received, perform this action, and respond back (usually with JSON).

For example:

  // when the user requests the 'api/get' route, call a function that retrieves the data, and responds back

	router.get('/api/get', function(req, res, next){
		// step 1 - code to retrieve data
		// step 2 - code to respond back with res.json();
	})

-----
#### App Dependencies and package.json

A nice part about the ExpressJS framework (and nodejs in general) is the NPM system. NPM stands for Node Package Manager, and it allows us to include helpful node packages (libraries) that we can use in our app.

For example, open up package.json. You can see we are setting our dependent packages. When you run npm install, all of these dependencies will be installed in your node_modules folder.

package.json
	
	"dependencies": {
	  "body-parser": "~1.13.2",
	  "cookie-parser": "~1.3.5",
	  "debug": "~2.2.0",
	  "express": "~4.13.1",
	  "mongoose": "^4.1.10",
	  "morgan": "~1.6.1",
	  "node-env-file": "^0.1.7",
	  "serve-favicon": "~2.3.0"
	}

Dependencies are then declared in the app.js like:

	var express = require('express');
	var path = require('path');
	var favicon = require('serve-favicon');
	var logger = require('morgan');
	var cookieParser = require('cookie-parser');
	var bodyParser = require('body-parser');
	var mongoose = require('mongoose');
	var env = require('node-env-file');

To add a new node package, do the following in terminal:

	npm install --save nameOfPackage

The --save flag will automatically include the package in package.json as a dependency.


**II. Setting up Twilio for SMS**


1) First and foremost, make sure you have a working node/express app. If you have not done that yet, go [here](https://github.com/sslover/node-express-api-boilerplate), download the boilerplate repo, and go through **the complete setup**.

2) Set up an account at Twilio (the SMS service we will be using) - https://www.twilio.com/

3) Go to [Get Started With Messaging](https://www.twilio.com/user/account/messaging/getting-started)

4) Click "Get Your First Twilio Phone Number". Write it down. The example app is (646) 846-8769.

5) Now, we need to add our Twilio credentials to the .env file (remember that this is a secret file that holds credentials and other private information - we have it in .gitignore so it will not be shared on Github).

You can get these credentials by clicking "Show API Credentials" in the top right of [this page](https://www.twilio.com/user/account/messaging/dashboard)

In the .env file, add the following (replacing with your Twilio specifics)

	TWILIO_ACCOUNT_SID=YourAccountSidGoesHere
	TWILIO_AUTH_TOKEN=YourAuthTokenGoesHere

We also need to add these credentials over at Heroku. Log in to your Heroku account. Click on your app. In the top area, click "Settings." Then click "Reveal Config Vars". 

We'll need to add the above 2 as Config Vars. For example, TWILIO_ACCOUNT_SID will be the 'value' field and YourAccountSidGoesHere will be the 'key' field. **Make sure you do this for both of the above.** 

(if you don't do the above setup, your app won't work on Heroku)

6) Now, let's get setup with the Twilio npm module. Full documentation is [here](http://twilio.github.io/twilio-node/)

First thing we'll want to do is install the Twilio npm module for our app. In terminal, navigate to your app and then run:

	npm install --save twilio

7) We also need to declare Twilio as a dependency at the top of our index.js file. Include this above your first route:

	//Twilio
	var twilio = require('twilio');

8) We can now interact with our twilio number!

There's a few steps here:

1. Twilio receives the incoming message.
2. We setup a callback with Twilio (i.e. how should Twilio communicate the incoming message **back** to your app)
3. Receive the message within the callback in index.js
4. Process the message and save to database
5. Respond back to the user via an SMS

**Step 1 -  Receive an incoming message**

Every time a message comes in, we need to tell Twilio what to do with it. We do that by dictating a callback route on our server (where Twilio should POST that message).

First, we'll set that up at Twilio. Go to your [Twilio Phone Numbers](https://www.twilio.com/user/account/messaging/phone-numbers). Click on the phone number you are using.

In the Request URL field, put the following:

https://your-app-name-here.herokuapp.com/twilio-callback

Now, every time a message comes in, Twilio will post it to the route /twilio-callback on your server.

**Step 2 -  Create the Callback Route**

In our index.js, we now need to create that callback route (/twilio-callback):

	// this route gets called whenever Twilio receives a message
	router.post('/twilio-callback', function(req,res){

	  // there's lots contained in the body
	  console.log(req.body);

	  // the actual message is contained in req.body.Body
	  var incomingMsg = req.body.Body;

		// full fields available in the req.body:
		// { ToCountry: 'US',
		// ToState: 'NY',
		// SmsMessageSid: 'SM9115146d8b3d53529e6b83a79448a6a9',
		// NumMedia: '0',
		// ToCity: '',
		// SmsSid: 'SM9115146d8b3d53529e6b83a79448a6a9',
		// FromState: 'GA',
		// FromZip: '30294',
		// SmsStatus: 'received',
		// To: '+16468468769',
		// FromCity: 'ATLANTA',
		// ApiVersion: '2010-04-01' 
		// NumSegments: '1',
		// MessageSid: 'SM9115146d8b3d53529e6b83a79448a6a9',
		// From: '+14043230470',
		// AccountSid: 'AC7cc044438cf51cbf44b75a095b40bf05',
		// ToZip: '',
		// Body: 'Just testing this demo!',
		// FromCountry: 'US'}			  

	})

**Step 3, 4, 5 -  Receive the message in the callback, save to database, respond back to user with an SMS**

	router.post('/twilio-callback', function(req,res){

	  // there's lots contained in the body
	  console.log(req.body);

	  // the actual message is contained in req.body.Body
	  var incomingMsg = req.body.Body;
	  console.log(incomingMsg);

	  var incomingNum = req.body.From;

	  // now, let's save it to our Database
	  var msgToSave = {
	    status: incomingMsg,
	    from: incomingNum
	  }

	  var status = new Status(msgToSave)

	  status.save(function(err,data){
	    // set up the twilio response
	    var twilioResp = new twilio.TwimlResponse();
	    if(err){
	      // respond to user
	      twilioResp.sms('Oops! We couldn\'t save status --> ' + incomingMsg);
	      // respond to twilio
	      res.set('Content-Type', 'text/xml');
	      res.send(twilioResp.toString());      
	    }
	    else {
	      // respond to user
	      twilioResp.sms('Successfully saved status! --> ' + incomingMsg);
	      // respond to twilio
	      res.set('Content-Type', 'text/xml');
	      res.send(twilioResp.toString());     
	    }
	  })


	})

Full code is [here](https://github.com/sslover/node-express-twilio-sms/blob/master/routes/index.js).

9) And we're good to go! Unfortunately, we cannot test this locally as there isn't really a way for Twilio to send a POST to localhost (remember, that is running on your computer, not a publicly accessible server). So, we'll need to push the app to Heroku and test there:

	git push heroku master

10) Now, we can see the incoming message by turning on server logs at Heroku. In terminal:
	
	heroku logs --tail

11) Send a text message to your Twilio number and you should see it come in the Terminal (which is showing the logs of your Heroku server)