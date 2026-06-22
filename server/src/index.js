import express from 'express'
import cors from 'cors'
import { config } from './config.js'
import chatRouter from './routes/chat.js'

const app = express()

app.use(
  cors({
    origin: config.clientUrl,
    methods: ['GET', 'POST'],
  })
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'MDC Medical Care API' })
})

app.use('/api/chat', chatRouter)

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`)
  console.log(`Model: ${config.openai.model}`)
})
