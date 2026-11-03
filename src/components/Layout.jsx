import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiGrid, FiFolder, FiCheckSquare, FiUsers, FiLogOut, FiMoon, FiSun } from "react-icons/fi";

export default function Layout() {
  const nav = useNavigate();
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">📋 PMS</h2>
        <NavLink to="/dashboard"><FiGrid /> Dashboard</NavLink>
        <NavLink to="/projects"><FiFolder /> Projects</NavLink>
        <NavLink to="/tasks"><FiCheckSquare /> Tasks</NavLink>
        <NavLink to="/team"><FiUsers /> Team</NavLink>
        <button className="logout" onClick={() => nav("/")}><FiLogOut /> Logout</button>
      </aside>
      <main className="content">
        <header className="topbar">
          <div>
            <h3>Welcome back, Priyanka 👋</h3>
            <small>{today}</small>
          </div>
          <div className="top-right">
            <button className="icon-btn" onClick={() => setDark(!dark)}>{dark ? <FiSun /> : <FiMoon />}</button>
            <div className="avatar">P</div>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}