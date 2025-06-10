import { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/leaves', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setLeaves(response.data);
    } catch (err) {
      setError('Failed to fetch leaves');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(
        'http://localhost:8000/api/leaves',
        { start_date: startDate, end_date: endDate, reason },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchLeaves();
      setStartDate('');
      setEndDate('');
      setReason('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit leave');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Employee Dashboard</h2>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Apply for Leave</h3>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Apply'}
          </button>
        </form>
      </div>
      <h3>Leave Status</h3>
      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.start_date}</td>
              <td>{leave.end_date}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeDashboard;