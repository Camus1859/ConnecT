const express = require('express');
const app = express();
const cors = require('cors');
const { pool } = require('./src/db/config');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const bcrypt = require('bcrypt');
const passport = require('passport');

const initializePassport = require('../passportConfig');

initializePassport(passport);

const PORT = process.env.PORT || 5000;

const twoHours = 1000 * 60 * 60 * 2;

app.use(
    session({
        secret: 'secret',
        name: 'sid',
        resave: false,
        saveUninitialized: false,
        store: new pgSession({ pool }),
        cookie: {
            //  secure: true,
            maxAge: twoHours,
            sameSite: true,
        },
    })
);

// app.use(cors())

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(express.json({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// const TWO_HOURS = 1000 * 60 * 60 * 2;

// const {
//     PORT = 5000,
//     NODE_ENV = 'development',

//     SESS_SECRET = 'FLJALJDLAKJFDLJALDFJLJMLJ',
//     SESS_NAME = 'sid',
//     SESS_LIFETIME = TWO_HOURS,
// } = process.env;

// const IN_PROD = NODE_ENV === 'production';

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(
//     session({
//         name: SESS_NAME,
//         resave: false,
//         saveUninitialized: false,
//         secret: SESS_SECRET,
//         store: new pgSession({
//             pool: pool,
//         }),

//         cookie: {
//             maxAge: SESS_LIFETIME,
//             sameSite: true,
//             secure: IN_PROD,
//         },
//     })
// );

app.post('/signup', async (req, res) => {
    let { username, password, password2 } = req.body;

    let userMessages = { success: [], error: [] };

    if (!username || !password || !password2) {
        userMessages.error.push('Please enter all fields');
    }

    if (password.length < 6) {
        userMessages.error.push('Password should be at least 6 characters');
    }

    if (password != password2) {
        userMessages.error.push('Passwords do not match');
    }

    if (userMessages.error.length > 0) {
        res.send(userMessages);
    } else {
        //Form valididation has passed
        let hashpassword = await bcrypt.hash(password, 10);

        pool.query(
            `SELECT * FROM users
            WHERE user_name =$1`,
            [username],
            (err, results) => {
                if (err) {
                    throw err;
                }

                if (results.rows.length > 0) {
                    userMessages.error.push('Email Already Registered');
                    res.send(userMessages);
                } else {
                    pool.query(
                        `INSERT INTO users (user_name, password)
                        VALUES ($1, $2)
                        RETURNING user_id, password`,
                        [username, hashpassword],
                        (err, results) => {
                            if (err) {
                                throw err;
                            }
                            userMessages.success.push(
                                'You are now registered, please log in'
                            );

                            res.send(userMessages);
                        }
                    );
                }
            }
        );
    }
});

const reDirectLogin = (req, res, next) => {
    console.log('redirect ran');
    console.log(req.session);

    if (req.session.userId === undefined) {
        return res.status(201).send({ error: ['Please login'] });
    }
    console.log('next ran');
    next();
};

app.get('/user/logouts', (req, res) => {
    req.logOut();
    res.status(200).send({ message: ['You are logged out'] });
});

app.post('/logout', (req, res) => {});

app.get('/search', reDirectLogin, (req, res) => {
    console.log(
        'search ran, looking to get user somehow to send back to front end to show search '
    );

    console.log(req.user.user_name);

    res.status(200).send({ user: [req.user.user_name], error: [] });
});

app.get('/user/profile', reDirectLogin, (req, res) => {
    const id = req.session.userId;
    console.log(req.session.userId);
    let user;

    pool.query(
        `
    SELECT user_name FROM users WHERE  user_id = $1`,
        [id],
        (err, results) => {
            if (err) {
                throw err;
            }

            if (results.rows.length === 0) {
                //  user not found send to front end
            }

            console.log('UserFOunddddddddddddddddddddddddddd');

            console.log(results.rows[0].user_name);
            return res
                .status(201)
                .send({ user: results.rows[0].user_name, error: [] });
        }
    );
});

app.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.log('mmmmmmmmmmZZZZZZZZZz');
            return next(err); // will generate a 500 error
        }
        // Generate a JSON response reflecting authentication status
        if (!user) {
            const updatedInfo =
                info.message === 'Missing credentials'
                    ? { error: ['Missing credentials'] }
                    : info;

            return res.status(401).send(updatedInfo);
        }
        req.login(user, function (err) {
            if (err) {
                console.log('ppppppppYYYYYYYYYYYYYy');

                return next(err);
            }

            req.session.userId = user.user_id;

            // res.writeHead(200, {'Set-Cookie': })
            return res.send(user);
        });
    })(req, res, next);
});

const checkAuth = (req, res, next) => {};

app.listen(PORT, () => {
    console.log('server started on port 5000');
});
