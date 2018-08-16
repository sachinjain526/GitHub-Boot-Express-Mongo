module.exports = function (app, db, collectionName) {
    app.get('/create/collection', (req, res) => {
        db.createCollection(collectionName);
        db.close();
    })
    app.get('/userData', (req, res) => {
        dbs.production.collection('userData').find({}).toArray((err, docs) => {
            if (err) {
                console.log(err)
                res.error(err)
            } else {
                res.json(docs)
            }
        })
    });
    return app
}