import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/aura', { message });
      setResponse(res.data.reply);
    } catch (err) {
      setResponse('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Chat with AURA</h1>
      <textarea
        rows={4}
        cols={50}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask AURA something..."
      />
      <br />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? 'Thinking...' : 'Send'}
      </button>
      <div style={{ marginTop: 24 }}>
        <strong>AURA:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}