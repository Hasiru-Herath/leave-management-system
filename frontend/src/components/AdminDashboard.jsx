import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AdminDashboard() {
  const [leaves, setLeaves] = useState([]);
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

  const handleStatusUpdate = async (leaveId, status) => {
    console.log(`Updating leave ${leaveId} to ${status}`);
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:8000/api/leaves-update`,
        { status,leaveId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchLeaves();
    } catch (err) {
      setError('Failed to update leave status');
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ['Pending', 'Approved', 'Rejected'],
    datasets: [
      {
        label: 'Leave Status',
        data: [
          leaves.filter((leave) => leave.status === 'pending').length,
          leaves.filter((leave) => leave.status === 'approved').length,
          leaves.filter((leave) => leave.status === 'rejected').length,
        ],
        backgroundColor: ['#FBBF24', '#34D399', '#EF4444'],
      },
    ],
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      {error && <p className="error">{error}</p>}
      <div style={{ marginBottom: '2rem' }}>
        <h3>Leave Statistics</h3>
        <div style={{ maxWidth: '400px' }}>
          <Bar data={chartData} />
        </div>
      </div>
      <h3>Leave Requests</h3>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.user?.name}</td>
              <td>{leave.start_date}</td>
              <td>{leave.end_date}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>
                <button
                  onClick={() => handleStatusUpdate(leave.id, 'approved')}
                  style={{ backgroundColor: '#34D399', marginRight: '0.5rem' }}
                  disabled={loading || leave.status !== 'pending'}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate(leave.id, 'rejected')}
                  style={{ backgroundColor: '#EF4444' }}
                  disabled={loading || leave.status !== 'pending'}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;