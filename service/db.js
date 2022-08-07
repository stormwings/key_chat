import db from 'mongoose';

db.Promise = global.Promise;

const connect = async (url) => {
    await db.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('[db] connection successful');
}

module.exports = connect;
