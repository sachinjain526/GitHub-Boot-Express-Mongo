
const passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy;
const jsonWebToken = require('jsonwebtoken');
module.exports = (app, db) => {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    passport.use(new GitHubStrategy({
        clientID: "961a57a59981d282cfb0",
        clientSecret: "1b8ad4642245ec7d228f0b5ccb4cc647791d5609",
        callbackURL: "/auth/github/callback"
    },
        function (accessToken, refreshToken, profile, done) {
            const tempObj = {
                _id: profile.id,
                displayName: profile.displayName,
                userName: profile.username,
                email: profile.emails[0].value,
                photoUrl: profile.photos[0].value,
                profileUrl: profile.profileUrl
            }
            let jsonActionToken = jsonWebToken.sign(tempObj, app.get('jwtSecret'), {
                expiresIn: 3600 * 24 * 365
            });
            tempObj['accessToken'] = jsonActionToken;
            db.collection("users").findOne({}, { _id: profile.id }).then((result) => {
                if (!result) {
                    db.collection("users").insertOne(tempObj).then((result) => {
                        done(null, result);
                    }).catch(err => {
                        console.log("failed during insert");
                        done(err);
                    })
                } else {
                    done(null, result);
                }

            }).catch(err => {
                done(err);
            })
        }
    ));
    /* GITHUB ROUTER */
    app.get('/auth/github',
        passport.authenticate('github', { scope: ['user:email'] }));

    app.get('/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/');
        });

    /* GET users listing. */
    app.get('/login', function (req, res, next) {
        console.log("redirect to login");
    });
    app.get('/logout', function (req, res) {
        // its going to kill current session with the help of passport js and clear cookie
        req.logout();
        res.redirect('/');
    });
}
