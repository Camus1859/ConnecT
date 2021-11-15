const express = require('express');
const app = express();
const cors = require('cors');
const { pool } = require('./src/db/config');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const bcrypt = require('bcrypt');
const passport = require('passport');
const path = require('path');






const initializePassport = require('./passportConfig');

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

app.get('/signup', (req, res) => {
    if (req.session.userId !== undefined) {
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
                return res.status(201).send({
                    user_name: results.rows[0].user_name,
                    error: [],
                    isLoggedIn: true,
                });
            }
        );
    } else {
        //user not logged in
        return res.status(201).send({ isLoggedIn: false });
    }
});

app.get('/login', (req, res) => {
    if (req.session.userId !== undefined) {
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
                return res.status(201).send({
                    user_name: results.rows[0].user_name,
                    error: [],
                    isLoggedIn: true,
                });
            }
        );
    } else {
        //user not logged in
        return res.status(201).send({ isLoggedIn: false });
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

app.post('/user/logouts', reDirectLogin, (req, res) => {
    req.logOut();
    req.session.destroy((err) => {
        if (err) {
            res.status(200).send({ err: [err] });
        }
    });
    res.clearCookie('sid');
    res.status(200).send({ message: ['You are logged out'] });
});

app.get('/search', reDirectLogin, (req, res) => {
    console.log(
        'search ran, looking to get user somehow to send back to front end to show search '
    );
    res.status(200).send({ user: [req.user.user_name], error: [] });
});

app.get('/messages', reDirectLogin, (req, res) => {
    console.log(
        'search ran, looking to get user somehow to send back to front end to show search '
    );
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

app.get('/user/login', (req, res) => {
    res.status(200).send(Boolean(req.session.userId));
});

app.post('/users/', (req, res) => {
    console.log('ran!!!!!!!!!!!!!!!!!')
    let { firstname, lastname, race, feet, inches, sex, bio } = req.body;

    const heightInInches = +feet * 12 + +inches;
    const userid = req.session.userId;


    console.log({firstname, lastname, race, feet, inches, sex, bio, heightInInches, userid })


    let userMessages = { success: [], error: [] };

    if (
        firstname === '' ||
        lastname === '' ||
        race === '' ||
        feet === '' ||
        inches === '' ||
        sex === '' ||
        bio === ''
    ) {
        userMessages.error.push('Please Fill In All Fields');
        res.send(userMessages);
        return;
    }

    console.log((typeof feet))

    pool.query(
        `UPDATE users
        SET firstname = $1,
        lastname = $2,
        race = $3,
        inches = $4,
        sex = $5,
        bio = $6,
        my_height_ft = $7,
        my_height_in = $8
        WHERE user_id = $9`,
        [
            firstname,
            lastname,
            race,
            heightInInches,
            sex,
            bio,
            feet,
            inches,
            userid,
        ],
        (err, results) => {
            if (err) {
                throw err;
            }
            userMessages.success.push('Your information has been saved');
            console.log('XXXXXXXXXXXXXxx');
            res.send(userMessages);
        }
    );
});

app.post('/search/user', (req, res) => {
    console.log('search ran!!!!!!!!!!!!!!!!!!!!!!')
    let {
        encounteredTime,
        encounteredDate,
        encounteredLatitude,
        encounteredLongitude,
        encounteredPersonsRace,
        encounteredPersonsSex,
        encounteredPersonsHeightFt,
        encounteredPersonsHeightIn,
        searchTitle,
    } = req.body;
    const encounteredPersonsHeightInInches =
        +encounteredPersonsHeightFt * 12 + +encounteredPersonsHeightIn;

    console.log({ encounteredLatitude, encounteredLongitude });
    let userMessages = { success: [], error: [] };
    const userid = req.session.userId;

    if (
        (encounteredTime === '' ||
            encounteredDate === '' ||
            encounteredLatitude === '',
        encounteredLongitude === '',
        encounteredPersonsRace === '' ||
            encounteredPersonsSex === '' ||
            encounteredPersonsHeightFt === '' ||
            encounteredPersonsHeightIn === '' ||
            searchTitle === '' ||
            encounteredPersonsHeightFt === '' ||
            encounteredPersonsHeightIn === '')
    ) {
        userMessages.error.push('Please Fill In All Fields');
        res.send(userMessages);
        return;
    }

    pool.query(
        `INSERT INTO searches (
            encountered_time,
            encountered_date,
            encountered_latitude,
            encountered_longitude,
            encountered_persons_race,
            encountered_persons_sex,
            encountered_persons_height,
            user_id,
            search_title,
            encountered_persons_height_Ft,
        encountered_persons_height_In
            )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
            encounteredTime,
            encounteredDate,
            encounteredLatitude,
            encounteredLongitude,
            encounteredPersonsRace,
            encounteredPersonsSex,
            encounteredPersonsHeightInInches,
            userid,
            searchTitle,
            encounteredPersonsHeightFt,
            encounteredPersonsHeightIn,
        ],
        (err, results) => {
            if (err) {
                throw err;
            }
            userMessages.success.push(
                'Your search has been succesfully submitted'
            );

            res.send(userMessages);
        }
    );
});

app.get('/mySearches', (req, res) => {
    const userid = req.session.userId;
    // get all searches for current user and send search name to front end
    pool.query(
        `SELECT search_title FROM searches
        WHERE user_id = $1
        `,
        [userid],
        (err, results) => {
            if (err) {
                throw err;
            }
            console.log(results.rows);
            const arrayOfSearchObj = results.rows;

            const searchTitles = arrayOfSearchObj.map(
                (searches) => searches.search_title
            );

            console.log(searchTitles);

            res.status(200).send({ user: searchTitles, error: [] });
        }
    );
});

app.get('/usersInfo', (req, res) => {
    console.log('aaaaaaaaaaaaaaa');
    const userid = req.session.userId;

    pool.query(
        `SELECT firstname, lastname, bio, sex, race, inches, my_height_ft, my_height_ft FROM users
        WHERE user_id = $1
        `,
        [userid],
        (err, results) => {
            if (err) {
                //send error to the front end??????
                throw err;
            }
            const arrWithUserInfoAsObj = results.rows[0];
            console.log(arrWithUserInfoAsObj);
            // const usersInfo = Object.values(arrWithUserInfoAsObj);

            res.status(200).send({ user: arrWithUserInfoAsObj, error: [] });
        }
    );
});

app.put('/search/user', (req, res) => {
    const {
        firstname,
        lastname,
        bio,
        sex,
        race,
        inches,
        encountered_persons_height_ft,
        encountered_persons_height_in,
    } = req.body;
    let userMessages = { success: [], error: [] };
    const userid = req.session.userId;

    if (
        firstname === '' ||
        lastname === '' ||
        bio === '' ||
        sex === '' ||
        race === '' ||
        inches === '' ||
        encountered_persons_height_ft === '' ||
        encountered_persons_height_in === ''
    ) {
        console.log('something is blank')
        userMessages.error.push('Please Fill In All Fields');
        res.send(userMessages);
        return;
    }
    console.log('should not run')
    pool.query(
        `UPDATE users set firstname = $1, lastname = $2,
     bio = $3, sex = $4, race = $5, inches = $6,
     encountered_persons_height_ft = $7,
     encountered_persons_height_in = $8
     WHERE user_id = $9
    `,
        [
            firstname,
            lastname,
            bio,
            sex,
            race,
            inches,
            encountered_persons_height_ft,
            encountered_persons_height_in,
            userid,
        ],
        (err, results) => {
            if (err) {
                //send error to the front end??????
                throw err;
            }
            userMessages.success.push(
                'Your profile has been successfully updated'
            );

            res.send(userMessages);
        }
    );
});


app.use(express.static(path.join(__dirname, '/client/build/')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
  

app.listen(PORT, () => {
    console.log('server started on port 5000');
});
