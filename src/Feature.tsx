import { useState } from "react";
import { useSharedNotes } from "@baditaflorin/mesh-common";
import type { MeshConfig, YRoom } from "@baditaflorin/mesh-common";

export function Feature({ room, config }: { room: YRoom | null; config: MeshConfig }) {
  const notes = useSharedNotes(room);
  const [text, setText] = useState("");
  const add = () => {
    if (notes.add(text)) setText("");
  };

  return (
    <main className="feature-placeholder">
      <p className="eyebrow">Shared capture</p>
      <h1>{config.appName}</h1>
      <p>{config.description}</p>
      <div className="note-composer">
        <label htmlFor="note-text">New note</label>
        <input
          id="note-text"
          value={text}
          maxLength={500}
          placeholder="Add an idea for the group"
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") add();
          }}
        />
        <button type="button" onClick={add} disabled={!text.trim()}>
          Add note
        </button>
      </div>
      <p className="feature-status" aria-live="polite">
        {notes.notes.length} shared {notes.notes.length === 1 ? "note" : "notes"}
      </p>
      <ul className="note-list" aria-label="Shared notes">
        {notes.notes.map((note) => (
          <li key={note.id}>
            <strong>{note.text}</strong>
            <span>from {note.peerId}</span>
            {note.peerId === room?.peerId ? (
              <button type="button" onClick={() => notes.remove(note.id)}>
                Remove note
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
