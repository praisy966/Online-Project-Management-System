import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { projects, tasks } from "../data";

const COLORS = ["#6366f1", "#f59e0b", "#10b981"];

export default function Dashboard() {
  const stats = [
    { label: "Total Projects", value: projects.length, color: "#6366f1" },
    { label: "Completed", value: projects.filter(p => p.status === "Completed").length, color: "#10b981" },
    { label: "Total Tasks", value: tasks.length, color: "#f59e0b" },
    { label: "Pending Tasks", value: tasks.filter(t => t.status !== "done").length, color: "#ef4444" },
  ];

  const pieData = ["Planning", "In Progress", "Completed"].map(s => ({
    name: s, value: projects.filter(p => p.status === s).length,
  }));

  const barData = [
    { name: "To Do", count: tasks.filter(t => t.status === "todo").length },
    { name: "In Progress", count: tasks.filter(t => t.status === "doing").length },
    { name: "Done", count: tasks.filter(t => t.status === "done").length },
  ];

  const activity = [
    "Priyanka completed 'Write documentation'",
    "Divya started 'Build dashboard'",
    "Arun was assigned 'Setup database'",
    "New project 'Payment Gateway' created",
  ];

  return (
    <>
      <h1>Dashboard</h1>
      <div className="stats">
        {stats.map(s => (
          <div className="stat" key={s.label} style={{ borderTop: `4px solid ${s.color}` }}>
            <h3>{s.value}</h3><p>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="charts">
        <div className="panel">
          <h3>Projects by Status</h3>
          <div style={{ height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90} label>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="legend">
            {pieData.map((d, i) => <span key={d.name}><i style={{ background: COLORS[i] }} /> {d.name}</span>)}
          </div>
        </div>

        <div className="panel">
          <h3>Tasks Overview</h3>
          <div style={{ height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="charts">
        <div className="panel">
          <h3>Recent Projects</h3>
          <table>
            <thead><tr><th>Name</th><th>Lead</th><th>Status</th><th>Due</th></tr></thead>
            <tbody>
              {projects.slice(0, 4).map(p => (
                <tr key={p.id}><td>{p.name}</td><td>{p.lead}</td>
                  <td><span className={"badge s-" + p.status.replace(" ", "")}>{p.status}</span></td><td>{p.due}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel">
          <h3>Recent Activity</h3>
          <ul className="activity">
            {activity.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      </div>
    </>
  );
}