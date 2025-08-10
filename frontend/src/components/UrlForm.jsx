import React, { useState } from 'react';
import axios from 'axios';

export default function UrlForm() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      const res = await axios.post('http://localhost:5000/api/shorten', { longUrl });
      setShortUrl(res.data.shortUrl);
      setLongUrl('');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL (https://example.com)"
          required
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" disabled={loading} style={{ padding: '8px 12px' }}>
          {loading ? 'Creating...' : 'Shorten'}
        </button>
      </form>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {shortUrl && (
        <p style={{ marginTop: 12 }}>
          Short URL: <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
        </p>
      )}
    </div>
  );
}