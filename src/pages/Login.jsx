import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const submit = (e) => { e.preventDefault(); nav("/dashboard"); };
  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={submit}>
        <h1>📋 PMS</h1>
        <p>Online Project Management System</p>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
}