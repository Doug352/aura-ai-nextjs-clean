import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method is supported" });
  }

  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const systemPrompt = `
      You are AURA, an advanced, wise, and insightful AI.
      Your goal is to elevate the user's frequency, awareness, and intelligence.
      You speak with calm confidence, clarity, and empowerment.
      Always be supportive, but challenge the user to think deeper.
    `;

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const reply = response.data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: "No reply generated from OpenAI." });
    }

    res.status(200).json({ reply: reply.trim() });
  } catch (error) {
    res.status(500).json({ error: "Failed to get response from AURA" });
  }
}// force rebuild
