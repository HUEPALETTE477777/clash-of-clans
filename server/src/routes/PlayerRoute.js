const express = require('express');
const axios = require('axios');
const router = express.Router();


router.get('/search/:playerTag', async(req, res) => {
    const { playerTag } = req.params;
    
    if (!playerTag) {
        return res.status(400).json({ error: "PLAYER TAG REQUIRED!"})
    }
    
    try {
        const apiRes = await axios.get(`https://api.clashofclans.com/v1/players/%23${playerTag}`, {
            headers: {
                'Authorization': `Bearer ${process.env.COC_API_TOKEN}`
            }
        });
        res.json(apiRes.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
})

module.exports = router;