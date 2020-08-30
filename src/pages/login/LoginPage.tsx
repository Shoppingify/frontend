import React  from 'react';
import LoginForm from "../../components/form/login/LoginForm";

function LoginPage() {
  return (
    <div className="container mx-auto">
      <h1 className="my-10 text-4xl">Login page</h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;