/**
 * Nodejs Masterclass restapi 1st assignment
 * Created By Raphael Osaze eyerin
 * On 10th Dec 2018
 */

 const http = require('http');
 const url = require('url');

 const server = http.createServer((req, res) => {

    const parseurl = url.parse(req.url, true);
    const path = parseurl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    const headers = req.headers;
    const method = req.method.toLowerCase();
    const queryStringObject = parseurl.query;

    let chooseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    var data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers
    };

    chooseHandler(data, (statusCode, payload) => {
      statusCode = typeof(statusCode) !== 'number' ? 404 : statusCode;

      payload = typeof(payload) === 'object'? payload : {};

      // Convert the payload to a string
      let payloadString = JSON.stringify(payload);
    
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
    });

 });

 server.listen(4001, () => {
   console.log('Serve listening of port 4001');
 });

 let handlers = {};

 handlers.hello = (data, callback) => {
   callback(200, {welcome: 'Welcome to nodejs master class rest api'});
 };

 handlers.notFound = (data, callback) => {
   callback(200, {error: 'Error not found'});
 };

 const router = {
    hello: handlers.hello
 };