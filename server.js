const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.get('/rates', (req,res) => {
    if(req.query.currency === undefined){
        return res.status(400).json({
            error: 'currency must be required'
        })
    }
    axios.get(`https://api.coincap.io/v2/rates/${req.query.currency}`).then(response => {
        if(response.data.data !== undefined){
            res.json({
                usd: response.data.data.rateUsd
            })
        }
        else{
            res.status(404).json({
                error: 'invalid currency value'
            })
        }
    })
        .catch(e => {
            console.log(e)
            res.json({
                error: 'something went wrong'
            })
        })
});
