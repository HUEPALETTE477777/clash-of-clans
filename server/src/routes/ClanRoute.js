const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/search/:clanName', async (req, res) => {
    const { clanName } = req.params;

    if (!clanName) {
        return res.status(400).json({ error: "Clan name is required!" });
    }

    try {
        const apiRes = await axios.get(`https://api.clashofclans.com/v1/clans?name=${clanName}`, {
            headers: {
                'Authorization': `Bearer ${process.env.COC_API_TOKEN}`
            }
        });
        res.json(apiRes.data);
    } catch (error) {
        console.error('Error fetching clan by name:', error.message); 
        res.status(500).json({ error: 'Error fetching clan details.' });
    }
});

router.get('/search/tag/:clanTag', async (req, res) => {
    const { clanTag } = req.params;
    console.log(clanTag)

    if (!clanTag) {
        return res.status(400).json({ error: "Clan tag is required!" });
    }

    try {
        const apiRes = await axios.get(`https://api.clashofclans.com/v1/clans/%23${clanTag}`, {
            headers: {
                'Authorization': `Bearer ${process.env.COC_API_TOKEN}`
            }
        });
        console.log('API Response:', apiRes.data);
        if (Array.isArray(apiRes.data)) {
            return res.status(400).json({ error: 'Expected single clan, but received a list.' });
        }
        res.json(apiRes.data);
    } catch (error) {
        console.error('Error fetching clan by name:', error.message); 
        res.status(500).json({ error: 'Error fetching clan details.' });
    }
});


module.exports = router;
