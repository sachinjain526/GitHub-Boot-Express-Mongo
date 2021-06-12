const {MongoClient} = require('mongodb');

const url = "mongodb+srv://sachinjain:sachinjain1312@github-boot.6nxtn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

module.exports = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
            resolve(client.db());
        }).
            catch((err) => {
                reject(err);
            })
    });
}