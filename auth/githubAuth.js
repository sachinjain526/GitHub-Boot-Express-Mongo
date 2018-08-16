var passport = require('passport')
    , GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: "961a57a59981d282cfb0",
    clientSecret: "1b8ad4642245ec7d228f0b5ccb4cc647791d5609",
    callbackURL: "http://localhost:3000/auth/github/callback"
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
    }
));

module.exports = passport;