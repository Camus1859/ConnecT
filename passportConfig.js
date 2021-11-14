const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('./src/db/config');
const bcrypt = require('bcrypt');

const initializePassport = (passport) => {
    const authenticateUser = (username, password, done) => {
        pool.query(
            `SELECT * FROM users WHERE user_name = $1`,
            [username],
            (err, results) => {
                if (err) {
                    console.log('AAAAAAAAAAAAAAAAAAA')
                    throw err;
                }

                if (results.rows.length > 0) {
                    const user = results.rows[0];

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            console.log('BBBBBBBBBBBBBBBBBBBb')


                            throw err;
                        }

                        if (isMatch) {
                            // this runs

                            return done(null, user);
                        } else {
                            return done(null, false, {
                                error: ['Password is not correct'],
                            });
                        }
                    });
                } else {
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
        console.log('XXXXXXXXXXXXXXXXXxxxx')

        console.log(user)
        return done(null, user.user_id);
    });


    passport.deserializeUser((id, done) => {
        console.log('YYYYYYYYYYYYYYYyy')
        console.log(id)


        pool.query(
            `SELECT * FROM users WHERE user_id= $1 `,
            [id],
            (err, results) => {
                console.log('ZZZZZZZZZZZZZZZZZz')

                if (err) {
                    throw err;
                }

                console.log('AAAAAAAAAAAAAAa')


                return done(null, results.rows[0]);
            }
        );
    });
};

module.exports = initializePassport;
