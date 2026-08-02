require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

function buildKundaliPrompt({ name, dob, timeOfBirth, placeOfBirth }) {
  return `You are an expert Vedic Astrologer. Generate a highly personalized Kundali reading and personality breakdown based on these exact details:
Name: ${name}
Date of Birth: ${dob}
Time of Birth: ${timeOfBirth}
Place of Birth: ${placeOfBirth}

Please organize your reading into 3 clear sections:
1. Planetary Alignment Overview (Talk about their general energy)
2. Career & Relationship Forecast (What does the future hold?)
3. Cosmic Tip of the Week (One actionable piece of advice)

Keep the tone mysterious, encouraging, and deeply insightful. Use clear line breaks between sections.`;
}

app.post('/api/kundali', async (req, res) => {
  try {
    const { name, dob, timeOfBirth, placeOfBirth } = req.body;

    if (!name || !dob || !timeOfBirth || !placeOfBirth) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const prompt = buildKundaliPrompt({ name, dob, timeOfBirth, placeOfBirth });

    const response = await fetch(
  "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model:"Qwen/Qwen2.5-7B-Instruct:featherless-ai",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 700,
          temperature: 0.7
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("HF API error:", data);
      return res.status(502).json({ error: data.error || 'AI service failed' });
    }

    const kundaliText = data.choices[0].message.content;
    res.json({ kundali: kundaliText });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});