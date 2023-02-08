import config from './config/config'
import app from './app'
import mongoose from 'mongoose'


app.listen(config.port, err=>{
    if(err)  {
        console.log(err)
    }
    console.info('Server started on port %s.', config.port)
})

mongoose.Promise = global.Promise
mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>  console.log('MongoDB connected'))
.catch((e) =>  console.log(err))

