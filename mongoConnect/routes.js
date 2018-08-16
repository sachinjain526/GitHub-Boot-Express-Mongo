module.exports = function (app, router, db) {
    app.post('/api/create/collection/:collectionName', (req, res) => {
        db.createCollection(req.params.collectionName).then(response => {
            db.close();
            res.json(req.params);
        }).catch(err => {
            res.send(err);
        })

    })
    app.get('/api/userData', (req, res) => {
        dbs.production.collection('userData').find({}).toArray((err, docs) => {
            if (err) {
                console.log(err)
                res.error(err)
            } else {
                res.json(docs)
            }
        })
    });
    require('../auth/authRouters')(router);
    return app
}