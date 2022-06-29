import config from './config/config'
import app from './app'
import mongoose from 'mongoose'


app.listen(config.port, err=>{
    if(err) console.log(err)
    console.log(`Server started at port ${config.port}`)
})

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB successfully connected...'))
.catch((e) => console.log(e))

