import axios from 'axios';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const AI_MODEL = process.env.AI_MODEL || 'liquid/lfm-2.5-1.2b-instruct:free';

export interface AIResponse {
  summary: string;
  action_items: string[];
  suggested_title: string;
}

export async function generateAIInsights(content: string): Promise<AIResponse> {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not defined');
  }

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
    "${content}"
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
        response_format: { type: 'json_object' },
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
          'X-Title': 'NoteX AI',
        },
      }
    );

    let resultText = response.data.choices[0].message.content;
    
    // Clean up resultText if it contains markdown code blocks
    if (resultText.includes('```')) {
      resultText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
    }

    return JSON.parse(resultText) as AIResponse;
  } catch (error: any) {
    console.error('AI generation error:', error.response?.data || error.message);
    throw new Error('Failed to generate AI insights');
  }
}
