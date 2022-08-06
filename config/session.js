const session = require('express-session')
const MongoSessionStorage = require('connect-mongodb-session')(session);

var SessionStore = new MongoSessionStorage({ uri: process.env.MONGO_URI, collection: 'sessions' });
SessionStore.on('error', (error) => console.log(error));

module.exports = (app, passport) => {
    app.use(session({
        secret: process.env.SESSION_KEY,
        store: SessionStore,
        saveUninitialized: false,
        resave: false
    }));

    app.use(passport.initialize());
    app.use(passport.session())
};
