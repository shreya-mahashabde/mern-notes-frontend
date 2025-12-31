import { useEffect, useState } from "react";
import axios from "axios";

// const API = "https://mern-notes-backend.onrender.com/notes";
const API = "https://474pp90k-5000.inc1.devtunnels.ms/notes";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  console.log(form, 'formform')

  // Fetch notes on page load
  useEffect(() => {
    fetchNotes();
    console.log('fetching notes...1')
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get(API);
    setNotes(res.data);
  };

  // Add note
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    await axios.post(API, form);
    setForm({ title: "", content: "" });
    fetchNotes();
  };

  // Delete note
  const deleteNote = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchNotes();
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h3 className="text-center mb-4">Notes Manager</h3>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Content"
          rows="3"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <button className="btn btn-primary btn-sm w-100">
          Add Note
        </button>
      </form>

      {/* LIST */}
      <ul className="list-group">
        {notes.map((note) => (
          <li
            key={note._id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div>
              <div className="fw-bold">{note.title}</div>
              <div className="text-muted small">{note.content}</div>
            </div>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => deleteNote(note._id)}
            >
              Delete
            </button>
          </li>
        ))}

        {notes.length === 0 && (
          <li className="list-group-item text-center text-muted">
            No notes yet
          </li>
        )}
      </ul>
    </div>
  );
}
