import { useEffect, useState } from 'react';

function AdminPage() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:5000/api/admin/urls');
      const data = await res.json();
      setUrls(data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Short Code</th>
            <th>Original URL</th>
            <th>Click Count</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url.shortCode}>
              <td>{url.shortCode}</td>
              <td><a href={url.originalUrl} target="_blank" rel="noreferrer">{url.longUrl}</a></td>
              <td>{url.visitCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
