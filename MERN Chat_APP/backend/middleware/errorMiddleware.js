//This code defines two middleware functions that handle errors in a Node.js/Express application: handleNotFound and handleError.

//handleNotFound  function handles 404 errors in case an endpoint is not found.
const handleNotFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//handleError  function handles all other types of errors that may occur within the application.
const handleError = (err, req, res, next) => {
  //determine the status code of the error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  //set the status code of the response
  res.status(statusCode);
  //send the error message as JSON in the response
  res.json({
    message: err.message,
    //hide the stack trace of the error in production mode
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

//export the two functions for use in other parts of the application.
module.exports = { handleNotFound, handleError };
