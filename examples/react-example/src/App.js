import React, { useState } from 'react';
import { useAuth } from 'sirbenj-jwt-auth-client';

function App() {
  const { isAuthenticated, login, logout, userPayload, isRefreshing, loading, verifyToken } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const result = await login({ username, password });
    if (result) {
      console.log('Login successful!', result.tokenResponse.accessToken, result.apiResponse);
      // You can access the tokens directly from result.tokenResponse
      // And the full API response from result.apiResponse
    } else {
      console.error('Login failed!');
    }
  };

  const handleVerify = async () => {
    const verified = await verifyToken();
    if (verified) {
      console.log('Token verified by backend!');
    } else {
      console.error('Token verification failed by backend!');
    }
  };

  if (loading || isRefreshing) {
    return <div>Loading session...</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        <p>Welcome, {userPayload.name}!</p>
        <button onClick={logout}>Logout</button>
        <button onClick={handleVerify}>Verify Token</button>
      </div>
    );
  }

  return (
    <div>
      <p>You are not logged in.</p>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default App;
