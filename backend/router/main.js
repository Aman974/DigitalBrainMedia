const router = require("express").Router();
const axios = require('axios');

const API_KEY = 'AIzaSyALqVz55We-MyO7N7OXbCrmlaeQW4mKtQI';
const CUSTOM_SEARCH_ENGINE_ID = '2532cfbaee31d436c';


router.get('/search', async (req, res) => {
    const query = req.query.query;
    
    try {
      const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CUSTOM_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`;
  
      const response = await axios.get(apiUrl);
      const searchResults = response.data.items;
  
      const formattedResults = searchResults.map(result => ({
        title: result.title,
        link: result.link,
        snippet: result.snippet
      }));
  
      res.json(formattedResults);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });


module.exports = router;
