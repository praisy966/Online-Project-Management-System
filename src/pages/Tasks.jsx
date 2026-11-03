import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { tasks as initial, team } from "../data";

const cols = [
  { key: "todo", title: "To Do" },
  { key: "doing", title: "In Progress" },
  { key: "done", title: "Done" },
];

export default function Tasks() {
  const [tasks, setTasks] = useState(initial);
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState(team[0].name.split(" ")[0]);
  const [priority, setPriority] = useState("Medium");

  const add = (e) => {
    e.preventDefault();
    setTasks([...tasks, { id: Date.now(), title, status: "todo", assignee, priority }]);
    setTitle("");
  };

  const remove = (id) => setTasks(tasks.filter(t => t.id !== id));

  const move = (id, dir) => setTasks(tasks.map(t => {
    if (t.id !== id) return t;
    const i = cols.findIndex(c => c.key === t.status) + dir;
    return cols[i] ? { ...t, status: cols[i].key } : t;
  }));

  return (
    <>
      <h1>Tasks</h1>
      <form className="add-form" onSubmit={add}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task title" required />
        <select value={assignee} onChange={e => setAssignee(e.target.value)}>
          {team.map(m => <option key={m.id}>{m.name.split(" ")[0]}</option>)}
        </select>
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option>High</option><option>Medium</option><option>Low</option>
        </select>
        <button className="btn">+ Add Task</button>
      </form>

      <div className="board">
        {cols.map(c => (
          <div className="column" key={c.key}>
            <h3>{c.title} <span className="count">{tasks.filter(t => t.status === c.key).length}</span></h3>
            {tasks.filter(t => t.status === c.key).map(t => (
              <div className="task" key={t.id}>
                <div className="card-top">
                  <p>{t.title}</p>
                  <button className="del" onClick={() => remove(t.id)}><FiTrash2 /></button>
                </div>
                <div className="row">
                  <small>👤 {t.assignee}</small>
                  <span className={"prio p-" + t.priority}>{t.priority}</span>
                </div>
                <div className="arrows">
                  <button onClick={() => move(t.id, -1)}>←</button>
                  <button onClick={() => move(t.id, 1)}>→</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}