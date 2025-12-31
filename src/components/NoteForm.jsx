import { useState } from 'react';

export default function NoteForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notes, setNotes] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() && content.trim()) {
            const newNote = {
                id: Date.now(),
                title: title.trim(),
                content: content.trim()
            };
            setNotes([...notes, newNote]);
            setTitle('');
            setContent('');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-3">Notes Manager</h2>

            <form className="mb-3">
                <input className="form-control mb-2" placeholder="Title" />
                <textarea className="form-control mb-2" placeholder="Content"></textarea>
                <button className="btn btn-primary w-100" type='submit' onClick={handleSubmit}>Add Note</button>
            </form>

            <div className="card p-3">
                <h5>Sample Note</h5>
                <p>Bootstrap makes it look neat!</p>
            </div>
        </div>
    );
}
