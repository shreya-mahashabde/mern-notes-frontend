import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://mern-notes-backend-gf66.onrender.com";
// const API = "http://localhost:5000/notes";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch notes on page load
  useEffect(() => {
    fetchNotes();
    console.log('fetching notes...3')
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get(`${API}/get-notes`);
    setNotes(res.data);
  };

  // Add note
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('000');
    if (!form.title || !form.content) return;

    console.log('111');
    if (isEditing) await axios.put(`${API}/update-note/${id}`, form);
    await axios.post(`${API}/add-note`, form);
    console.log('222');

    setForm({ title: "", content: "" });
    console.log('333');
    fetchNotes();
  };

  // Edit note
  const editNote = async (note) => {
    setIsEditing(true);
    setForm(note);
  };

  // Delete note
  const deleteNote = async (id) => {
    await axios.delete(`${API}/delete-note/${id}`);
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

        <button type="Submit" className="btn btn-primary btn-sm w-100">
          {isEditing ? 'Update Note' : 'Add Note'}
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
              onClick={() => editNote(note)}
            >
              Edit
            </button>
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
