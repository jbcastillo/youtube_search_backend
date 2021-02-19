const router = require('express').Router();
require('dotenv').config();

router.post('/search', async (req, res) => {

    const search = req.body.search;    
    const {google} = require('googleapis');

    if(search == ""){
        res.json({
            error: "No hay un valor de busqueda",
            data: []
        })
    }else{
        google.youtube('v3').search.list({
            key: process.env.YOUTUBE_TOKEN,
            part: 'snippet',
            q: search,
            maxResults: 50
        }).then( response => {
            const {data} = response;
            const results = data.items.map(item => {
                return {
                    title: item.snippet.title,
                    description: item.snippet.description,
                    image: item.snippet.thumbnails.high.url,
                    videoId: item.id.videoId
                }
    
            });
    
            res.json({
                error: null,
                data: results
            })
    
    
        }).catch( error => console.log(error));

    }



})

module.exports = router;