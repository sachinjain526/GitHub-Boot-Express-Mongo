const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://sachinjain:sachinjain1312@ds121982.mlab.com:21982/githubboot";

module.exports = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }).then(client => {
            resolve(client.db());
        }).
            catch((err) => {
                reject(err);
            })
    });
}