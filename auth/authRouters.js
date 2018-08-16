
const passportGitHub = require('./githubAuth');

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
}
/* LOGIN ROUTER */
module.exports = (router) => {
    /* GET users listing. */
    router.get('/', ensureAuthenticated, function (req, res, next) {
        res.render('user', { user: req.user });
    });

    /* LOGOUT ROUTER */
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });


    /* GITHUB ROUTER */
    router.get('/github',
        passportGitHub.authenticate('github', { scope: ['user:email'] }));

    router.get('/github/callback',
        passportGitHub.authenticate('github', { failureRedirect: '/' }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });
}