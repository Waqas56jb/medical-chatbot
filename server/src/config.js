import 'dotenv/config'

const required = ['OPENAI_API_KEY']

for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing required env variable: ${key}`)
    process.exit(1)
  }
}

export const config = {
  port: Number(process.env.PORT) || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    temperature: Number(process.env.OPENAI_TEMPERATURE) || 0.4,
    maxTokens: Number(process.env.OPENAI_MAX_TOKENS) || 500,
  },
}
