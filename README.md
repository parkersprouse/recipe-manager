# Browser RPG

This app is split between `server` and `client` applications. Both run as a single application.

To run the app in development mode, run `npm start` in both the root of the project and from within the `client` directory simultaneously (typically with two separate terminal instances).  
Running it in the root directory starts the server back-end and running it in the `client` directory starts the client front-end.  
Both must be running in order for the project to work.

Install any desired `npm` packages in the root of the project. Nothing should be installed in the `client` project. Any dependencies installed in the root will be accessible to both the `server` and `client` applications.

The project uses environment variables to connect to a postgres database.

The server will run on the port assigned by the `PORT` environment variable, or will default to `9000` if one doesn't exist.   
When running locally in development mode, in order for the server and client to work on the same machine, the client will proxy all of its requests to the server. If you change the port that the server is running on, you must also change the port that the client proxies to. This port is set in the client's `package.json` file with the line `"proxy": "http://localhost:9000"`. Change that port to match the port that the server is running on.  
The `proxy` setting is only used when running the app locally in development mode and is ignored in production.
