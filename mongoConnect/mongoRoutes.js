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
    app.post('/api/users', (req, res) => {
        dbs.collection('users').insertOne(req.body).then(response => {
            db.close();
            res.json(req.params);
        }).catch(err => {
            res.send(err);
        })

    })
}