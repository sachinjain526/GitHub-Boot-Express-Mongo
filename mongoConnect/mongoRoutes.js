module.exports = function (app, db) {

    app.post('/api/create/collection/:collectionName', (req, res) => {
        db.createCollection(req.params.collectionName).then(response => {
            db.close();
            res.json(req.params);
        }).catch(err => {
            res.send(err);
        })

    })
    app.get('/api/userData', (req, res) => {
        dbs.collection('users').find({}).toArray((err, docs) => {
            if (err) {
                console.log(err)
                res.error(err)
            } else {
                res.json(docs)
            }
        })
    });
    app.get('/api/current_user', (req, res) => {// it will current user detail on screan
        res.json(req.user);
        console.log(req.user);
    });
}