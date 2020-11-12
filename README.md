# Booking App

> A booking application built on MEAN stack - MongoDb, Express, Angular, NodeJs.

## Development server
Modify the configuration in server/config/dev

```bash
  DB_URI:"mongo service",
  JWT_SECRET: "secret for jwt access",
  CLOUDINARY_NAME: "instance for cloundinary image upload",
  CLOUDINARY_API_KEY: "cloundinary api key",
  CLOUDINARY_API_SECRET: "cloundinary api secret",
 ```

Run `ng serve` for front-end. Navigate to `http://localhost:4200/`. 
Run `node server/index.js` for back-end side. Use`http://localhost:3001/` for testing REST API in Postman . 
