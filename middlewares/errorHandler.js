import { constantCode } from "../Errorcode.js";

const middlewareErrorHandler = (err, req, res, next) => {
  
  const statuscode = res.statusCode ? res.statusCode : 500;

  switch (statuscode) {
    case constantCode.VALIDATION_ERROR:
      res.json({
        title: "Validation Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constantCode.UNAUTHORIZED:
      res.json({
        title: "Unauthorized Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constantCode.FORBIDDEN:
      res.json({
        title: "Forbidde Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constantCode.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constantCode.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No Error !! All Good :)");
      break;
  }
};

export default middlewareErrorHandler;
