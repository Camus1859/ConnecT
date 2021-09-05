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

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        store: new pgSession({ pool }),
        cookie: {
            // secure: true,
            maxAge: 1000 * 30,
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
                console.log(results.rows);

                if (results.rows.length > 0) {
                    userMessages.error.push('Email Already Registered');
                    res.send(userMessages);
                } else {
                    pool.query(
                        `INSERT INTO users (user_name, password)
                        VALUES ($1, $2)
                        RETURNING id, password`,
                        [username, hashpassword],
                        (err, results) => {
                            if (err) {
                                throw err;
                            }
                            console.log('ran');
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

app.get('/user/profile', (req, res) => {
    console.log('ppppppppppppppppppppppppppppppp');

    console.log(req.originalUrl);

    console.log(req.user);

    // res.send({ user: req.user, path: req.originalUrl });
});

app.post('/logout', (req, res) => {});

// app.post(
//     '/login',
//     passport.authenticate('local', {
//         successRedirect: '/user/profile',
//         failureRedirect: '/login',
//         failureFlash: false,
//     })
// );

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status
      if (! user) {
          console.log(info)
        return res.status(401).send({ success : false, message : 'authentication failed' });
      }
      req.login(user, function(err){
        if(err){
          return next(err);
        }
        return res.send({ success : true, message : 'authentication succeeded' });
      });
    })(req, res, next);
  });





app.listen(PORT, () => {
    console.log('server started on port 5000');
});