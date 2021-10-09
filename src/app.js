const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const httpolyglot = require('httpolyglot')
const https = require('https')

//////// CONFIGURATION ///////////

// insert your own ssl certificate and keys
const options = {
    key: fs.readFileSync(path.join(__dirname,'..','ssl','key.pem'), 'utf-8'),
    cert: fs.readFileSync(path.join(__dirname,'..','ssl','cert.pem'), 'utf-8')
}

const port = process.env.PORT || 3012

////////////////////////////

require('./routes')(app)

const httpsServer = httpolyglot.createServer(options, app)
const io = require('socket.io')(httpsServer)
require('./socketController')(io)


app.use('/gallery', require('node-gallery')({
    staticFiles : 'resources/photos',
    urlRoot : 'gallery', 
    title : 'Girls-Chat'
  }));

 /* app.use('/gallery', require('node-gallery')({
    staticFiles : 'resources/photos',
    urlRoot : 'gallery', 
    title : 'Girls-Cha',
    render : false
  }), function(req, res, next){
    
     //We MUST add another middleware function to the chain when render is false. 
     //just return the raw HTML data - we could partial into another template here,
     //pass the JSON data into a template
     
    return res.send(req.html);
  });
*/

httpsServer.listen(port, () => {
    console.log(`listening on port ${port}`)
})





