import { team } from "../data";

export default function Team() {
  return (
    <>
      <h1>Team Members</h1>
      <div className="cards">
        {team.map(m => (
          <div className="card team-card" key={m.id}>
            <div className="big-avatar" style={{ background: m.color }}>{m.name[0]}</div>
            <h3>{m.name}</h3>
            <span className="badge">{m.role}</span>
            <small>✉️ {m.email}</small>
          </div>
        ))}
      </div>
    </>
  );
}