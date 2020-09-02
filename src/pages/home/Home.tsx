import React from 'react';

// Components
import LoginForm from "../../components/form/login/LoginForm";

/**
 * Simple homepage component
 */
function Home() {
  return (
    <div>
      <h1>Homepage</h1>
      <LoginForm />
    </div>
  );
}

export default Home;