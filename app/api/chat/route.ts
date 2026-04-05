import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const res = await client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  return Response.json({
    output: res.output_text,
  });
}
