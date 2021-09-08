const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('./server/src/db/config');
const bcrypt = require('bcrypt');

const initializePassport = (passport) => {
    console.log('rannnn???????????????????')

    const authenticateUser = (username, password, done) => {
        pool.query(
            `SELECT * FROM users WHERE user_name = $1`,
            [username],
            (err, results) => {
                if (err) {
                    console.log('wwwwwwwwwwwwwwwwwwwwww')

                    throw err;
                }

                if (results.rows.length > 0) {
                    console.log('rannnn???????????????????')
                    const user = results.rows[0];

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzz')
                            throw err;
                        }

                        if (isMatch) {
                            // this runs
                            console.log('matchhhhhhhhhhhhhhhhhhhhhhhhh');
                            console.log(user);
                            return done(null, user);
                        } else {
                            console.log(
                                'wrong password !!!!!!!!!!!!!!!!!!!!!!!!!!!!'
                            );
                            return done(null, false, {
                                error: ['Password is not correct'],
                            });
                        }
                    });
                } else {
                    console.log('no userrrrrrrrrrrrrrrrrrrrrrrrrrrr');

                    return done(null, false, {
                        error: ['Username is not registered'],
                    });
                }
            }
        );
    };

    passport.use(
        new LocalStrategy(
            {
                usernameField: 'username',
                passwordField: 'password',
            },
            authenticateUser
        )
    );

    passport.serializeUser((user, done) => {
        console.log('bubbbbbbbbbbbbbbbbbbbbbbbbbbb');

        return done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        console.log('deserialize!!!!!!!!!!!!!!!!!!!!!!!!!!');
        pool.query(
            `SELECT * FROM users WHERE id= $1 `,
            [id],
            (err, results) => {
                if (err) {
                    console.log('errorrrrrrrrrrrrrrrrrrrrr');
                    throw err;
                }
                console.log('return...............................');
                console.log(results.rows[0]);
                console.log('xxxxxxxxxxxxxxxxx');

                return done(null, results.rows[0]);
            }
        );
    });
};

module.exports = initializePassport;
