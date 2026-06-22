const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function sendChatMessage({ message, history = [], collected = {} }) {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, collected }),
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  return response.json()
}

export { API_BASE_URL }
