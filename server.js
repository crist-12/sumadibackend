require('dotenv').config({silent: true})
const express = require('express')
const app = express();
const got = require('got');
app.use(express.json())
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({extended:true}));


const apiKey = process.env.API_KEY
const apiSecret = process.env.API_SECRET
const ENDPOINT = process.env.ENDPOINT

const FormData = require('form-data');
const { response } = require('express');
let port = process.env.PORT || 3000;
let uploadId;

app.post('/uploadImage', (req, res)=> {
    
    const formData = new FormData();
    formData.append('image_base64', req.body.base64);
    //console.log(got)
    (async () => {
        try {
            const response = await got.post(ENDPOINT + 'uploads', {body: formData, username: apiKey, password: apiSecret});
          //  response.send({response: response.result});
            res.send(200,response.body)
        } catch (error) {
           res.status(404).send('Not Found')
           
           res.status(429).send('Too many requests, you dont have more requests available')
           
           res.status(500).send('Internal Error')
           
           res.status(503).send('Service Unavailable')
        
           res.status(410).send('This function does not exist anymore')

        }
    })();
})

app.post('/getTagging', (req, res)=> {
    const url = ENDPOINT + 'tags?image_upload_id='+ req.body.imageid;
    (async () => {
        try {
            const response = await got(url, {username: apiKey, password: apiSecret});
            res.send(200,response.body)
        } catch (error) {
            res.status(404).send('Not Found')
           
           res.status(429).send('Too many requests, you dont have more requests available')
           
           res.status(500).send('Internal Error')
           
           res.status(503).send('Service Unavailable')
        
           res.status(410).send('This function does not exist anymore')
        }
    })();
})


app.listen(port, ()=> {
    console.log('Hi'+port)
})