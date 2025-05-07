import React, { useEffect, useState } from 'react'
import { useAuth } from '../Store/useAuth'

function Admin_userManagement() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Delete user handler
  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setDeletingId(userId);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/admin/deleteuser/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete user');
      setUsers(users.filter(u => u._id !== userId));
    } catch (err) {
      alert(err.message || 'Error deleting user');
    }
    setDeletingId(null);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('http://localhost:8000/api/v1/admin/getusers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        setError(err.message || 'Error fetching users');
      }
      setLoading(false);
    };
    fetchUsers();
  }, [token]);

  return (
    <div style={{ padding: 24, background: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: 24, color: '#333', fontWeight: 700 }}>Admin User Management</h1>
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <div style={{ overflowX: 'auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 16 }}>
          <table style={{
            borderCollapse: 'collapse',
            width: '100%',
            fontFamily: 'Segoe UI, Arial, sans-serif',
            fontSize: 15,
            background: '#fff'
          }}>
            <thead>
              <tr style={{ background: '#f0f2f5' }}>
                <th style={{ padding: 12, borderBottom: '2px solid #e0e0e0' }}>Avatar</th>
                <th style={{ padding: 12, borderBottom: '2px solid #e0e0e0' }}>Username</th>
                <th style={{ padding: 12, borderBottom: '2px solid #e0e0e0' }}>Email</th>
                <th style={{ padding: 12, borderBottom: '2px solid #e0e0e0' }}>Full Name</th>
                <th style={{ padding: 12, borderBottom: '2px solid #e0e0e0' }}>Phone</th>
                <th style={{ padding: 12, borderBottom: '2px solid #e0e0e0' }}>Admin</th>
                <th style={{ padding: 12, borderBottom: '2px solid #e0e0e0' }}>Professional</th>
                <th style={{ padding: 12, borderBottom: '2px solid #e0e0e0' }}>Created At</th>
                <th style={{ padding: 12, borderBottom: '2px solid #e0e0e0' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} style={{ borderBottom: '1px solid #f0f0f0', transition: 'background 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.background = '#f5f7fa'}
                  onMouseOut={e => e.currentTarget.style.background = '#fff'}
                >
                  <td style={{ padding: 10, textAlign: 'center' }}>
                    <img src={user.avatar} alt="avatar" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '1px solid #eee' }} />
                  </td>
                  <td style={{ padding: 10 }}>{user.username}</td>
                  <td style={{ padding: 10 }}>{user.email}</td>
                  <td style={{ padding: 10 }}>{user.fullName}</td>
                  <td style={{ padding: 10 }}>{user.ph_no}</td>
                  <td style={{ padding: 10 }}>
                    <span style={{
                      color: user.isAdmin ? '#1890ff' : '#888',
                      fontWeight: user.isAdmin ? 600 : 400
                    }}>
                      {user.isAdmin ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td style={{ padding: 10 }}>
                    <span style={{
                      color: user.isprofessional ? '#52c41a' : '#888',
                      fontWeight: user.isprofessional ? 600 : 400
                    }}>
                      {user.isprofessional ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td style={{ padding: 10 }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: 10 }}>
                    <button
                      onClick={() => handleDelete(user._id)}
                      disabled={deletingId === user._id}
                      style={{
                        background: '#ff4d4f',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        padding: '6px 14px',
                        cursor: deletingId === user._id ? 'not-allowed' : 'pointer',
                        fontWeight: 600,
                        transition: 'background 0.2s'
                      }}
                    >
                      {deletingId === user._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: 20, color: '#888' }}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Admin_userManagement
