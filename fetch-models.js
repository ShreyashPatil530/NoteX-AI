const axios = require('axios');

async function getFreeModels() {
  try {
    const response = await axios.get('https://openrouter.ai/api/v1/models');
    const freeModels = response.data.data
      .filter(m => m.pricing.prompt === '0' && m.pricing.completion === '0')
      .map(m => m.id);
    
    console.log('Free Models Found:');
    console.log(JSON.stringify(freeModels, null, 2));
  } catch (error) {
    console.error('Failed to fetch models:', error.message);
  }
}

getFreeModels();
