const { MongoClient } = require('mongodb');
module.exports = {
    table: "tasks",
    listCatApproved: ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation",
        "music", "busywork"],
    connection: async (maxConectionTime = 10000) => {
        let mongoClient;
        try {
            mongoClient = new MongoClient(process.env.DB_URI);
            console.log('Connecting to MongoDB...');
            await mongoClient.connect();
            console.log(`The Connection will automatic close on ${maxConectionTime} miliseconds.`);
            setTimeout(() => {
                mongoClient.close();
            }, maxConectionTime);
            return mongoClient;
        } catch (error) {
            console.error('Connection to MongoDB failed!', error);
            process.exit();
        }
    },
    makeTaskID: () => {
        return Number(new Date().getFullYear().toString()
            + (new Date().getMonth() + 1).toString()
            + new Date().getDate().toString()
            + new Date().getHours().toString()
            + new Date().getMinutes().toString()
            + new Date().getSeconds().toString()
            + Math.floor(Math.random() * 10))
    }
}