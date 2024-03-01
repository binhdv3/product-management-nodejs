const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/sell_clothes', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connect successfully!')
    } catch (error) {
        console.log('Connect | error: ' + error)
    }
}

module.exports = {'secret':'nodeauthsecret', connect };

