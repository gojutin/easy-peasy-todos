import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import { useAction, useStore } from 'easy-peasy';
import AuthLayout from '../layouts/AuthLayout';
import { Input, Button } from '../components/common';

function Login() {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const { email, password } = useStore(state => state.auth.form);
  const { isValid } = useStore(state => state.auth);
  const authActions = useAction(dispatch => dispatch.auth);

  useEffect(() => {
    authActions.setFormType('login');
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setPending(true);
    try {
      await authActions.loginWithEmail();
      navigate('/');
    } catch (error) {
      setError(error);
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthLayout>
      <h3>Login</h3>
      <form onSubmit={handleLogin} className="auth-form">
        <Input
          type="text"
          value={email}
          onChange={e => authActions.setEmail(e.target.value)}
          placeholder="email"
        />
        <Input
          type="password"
          value={password}
          onChange={e => authActions.setPassword(e.target.value)}
          placeholder="password"
        />

        <Button
          type="submit"
          onClick={handleLogin}
          disabled={!isValid || pending}
          loading={pending}
        >
          Login
        </Button>
      </form>
      <Link to="/signup">Signup</Link>
      <Link to="/reset-password">Reset Password</Link>
      {error && (
        <div style={{ color: 'tomato', margin: '10px' }}>{error.message}</div>
      )}
    </AuthLayout>
  );
}

export default Login;
