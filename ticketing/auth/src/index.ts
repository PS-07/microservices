import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

// Middlewares
// since traffic is being proxied to the app through Ingress-Nginx, so express will raise an issue
// this command tells express to trust the connection even though it is proxied
app.set('trust proxy', true);
app.use(json());

// signed: false -> cookie will not be encrypted, since JWT is by defualt encrypted
// secure: true  -> cookies will only be used if user visits the app on https connection
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// NotFoundError will be thrown incase of any invalid URL
// since all 4 valid routes have been checked prior to this, any other
// wrong URL would invoke it. 'all' is used to every type of req i.e. GET, POST etc.

// the 'express-async-errors' package allows changes how express handlers route handlers
// not this async func will await to listen to any error (else we would have used next function)
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    // check if the secret key is defined
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    // mongoose is used to connect to a MongoDb instance
    // using the ClusterIP service of the database (auth-mongo-srv)
    // '/auth' at the end creates a database named auth
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDb');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });
};

start();