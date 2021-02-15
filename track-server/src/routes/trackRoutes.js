const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async(req,res) => {
    const tracks = await Track.find({ userId: req.user._id });
    res.send(tracks);
});

router.post('/tracks', async(req,res) => {
    const { trackName, locations } = req.body;
    if(!trackName || !locations){
        return res.status(422).send({error: "You must provide a name and locations"});
    }
    try {
        const track = new Track({
            userId: req.user._id,
            name: trackName,
            locations: locations
        });
        await track.save();
        res.send(track);    
    } catch (error) {
        res.status(422).send({error: error.message});
    }
})

module.exports = router;