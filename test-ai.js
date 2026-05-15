const axios = require('axios');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const AI_MODEL = 'liquid/lfm-2.5-1.2b-instruct:free'; // Trying a tiny free model

async function testAI() {
  console.log('Testing with model:', AI_MODEL);
  console.log('Key:', OPENROUTER_API_KEY ? 'Present' : 'Missing');

  const prompt = `
    Analyze the following note content and provide:
    1. A concise summary.
    2. A list of actionable items (if any).
    3. A suggested improved title for the note.

    Return the response in STRICT JSON format:
    {
      "summary": "",
      "action_items": [],
      "suggested_title": ""
    }

    Note content:
    "New ai automation work is very important and also the new features are coming soon."
  `;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: AI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant that specializes in organizing and summarizing notes.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        // Some free models don't support json_object format, let's try without first or handle errors
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Response Status:', response.status);
    console.log('Response Content:', response.data.choices[0].message.content);
  } catch (error) {
    console.error('Test failed:', error.response?.data || error.message);
  }
}

testAI();
