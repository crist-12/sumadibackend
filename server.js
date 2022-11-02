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

const port = process.env.PORT || 3000;

app.post('/uploadImage', (req, res)=> {
    
    const formData = new FormData();
    formData.append('image_base64', req.body.base64);

    (async () => {
        try {
            const response = await got.post(ENDPOINT + 'uploads', {body: formData, username: apiKey, password: apiSecret});
            res.send(200,response.body)
        } catch (error) {
            res.send({name: error.name, type: error.code})
        }
    })();
})

app.post('/getTagging', (req, res)=> {
    const urlend = `${ENDPOINT}tags?image_upload_id=${req.body.imageid}`;
   (async () => {
    try {
        const response = await got(urlend, {username: apiKey, password: apiSecret});
        res.send(200,response.body)
    } catch (error) {
        res.send({name: error.name, type: error.code})
    }
})();
   
})

app.listen(port, ()=> {
    console.log('Listening on port'+port)
})