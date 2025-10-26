import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth, RequireAuth, RequirePermissions } from 'sirbenj-jwt-auth-client';
import { useAuthQuery, useAuthMutation } from 'sirbenj-jwt-auth-client/query';

function LoginPage() {
  const { login, loading, isRefreshing } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    const result = await login({ username, password });
    if (!result) alert('Login failed');
  };
  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} disabled={loading || isRefreshing}>Login</button>
    </div>
  );
}

function Dashboard() {
  const { logout, userPayload } = useAuth();
  const { data, isLoading, error } = useAuthQuery(['me'], { url: 'https://your-api.com/me', method: 'GET' });
  const createUser = useAuthMutation((vars) => ({ url: 'https://your-api.com/users', method: 'POST', body: vars }));
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome {userPayload?.name || 'User'}</p>
      <nav>
        <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
      </nav>
      <div>
        <h4>Profile</h4>
        {isLoading ? 'Loading…' : error ? 'Failed to load' : <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
      <div>
        <h4>Create user (permission: user:write)</h4>
        <RequirePermissions anyOf={["user:write"]} fallback={<div>No permission.</div>}>
          <button onClick={() => createUser.mutate({ name: 'Alice' })} disabled={createUser.isLoading}>
            {createUser.isLoading ? 'Creating…' : 'Create User'}
          </button>
        </RequirePermissions>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <h2>Home</h2>
      <nav>
        <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/login">Login</Link>
      </nav>
      <p>Authenticated: {String(isAuthenticated)}</p>
    </div>
  );
}

function Forbidden() {
  return <div>Forbidden</div>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth fallback={<Navigate to="/login" replace />}> 
            <RequirePermissions anyOf={["user:read"]} fallback={<Navigate to="/forbidden" replace />}> 
              <Dashboard />
            </RequirePermissions>
          </RequireAuth>
        }
      />
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export { LoginPage, Dashboard, Home, Forbidden };
