https://www.digitalocean.com/community/tutorials/node-api-schema-validation-with-joi

It is worth noting that we have added body-parser middlewares to the request pipeline of our app. 
These middlewares fetch and parse the body of the current HTTP request for application/json and 
application/x-www-form-urlencoded requests, and make them available in the req.body of the 
request’s route handling middleware.