import { useState } from "react";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { projects as initial } from "../data";

const statuses = ["Planning", "In Progress", "Completed"];

export default function Projects() {
  const [list, setList] = useState(initial);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const add = (e) => {
    e.preventDefault();
    setList([...list, { id: Date.now(), name, lead: "Priyanka E", status: "Planning", progress: 0, due: "TBD", priority }]);
    setName("");
  };

  const remove = (id) => setList(list.filter(p => p.id !== id));

  const changeStatus = (id, status) =>
    setList(list.map(p => p.id === id
      ? { ...p, status, progress: status === "Completed" ? 100 : status === "Planning" ? Math.min(p.progress, 20) : p.progress }
      : p));

  const shown = list.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) && (filter === "All" || p.status === filter));

  return (
    <>
      <h1>Projects</h1>

      <form className="add-form" onSubmit={add}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="New project name" required />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option>High</option><option>Medium</option><option>Low</option>
        </select>
        <button className="btn">+ Add Project</button>
      </form>

      <div className="toolbar">
        <div className="search">
          <FiSearch />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." />
        </div>
        <div className="filters">
          {["All", ...statuses].map(s => (
            <button key={s} className={"chip" + (filter === s ? " on" : "")} onClick={() => setFilter(s)}>{s}</button>
          ))}
        </div>
      </div>

      {shown.length === 0 && <p className="empty">No projects found 😕</p>}

      <div className="cards">
        {shown.map(p => (
          <div className="card" key={p.id}>
            <div className="card-top">
              <h3>{p.name}</h3>
              <button className="del" onClick={() => remove(p.id)} title="Delete"><FiTrash2 /></button>
            </div>
            <p>Lead: {p.lead}</p>
            <div className="row">
              <span className={"badge s-" + p.status.replace(" ", "")}>{p.status}</span>
              <span className={"prio p-" + p.priority}>{p.priority}</span>
            </div>
            <div className="bar"><div style={{ width: p.progress + "%" }} /></div>
            <small>{p.progress}% • Due {p.due}</small>
            <select value={p.status} onChange={e => changeStatus(p.id, e.target.value)}>
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        ))}
      </div>
    </>
  );
}