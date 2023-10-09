import { FC, FormEventHandler, Key, useEffect, useState } from 'react';

import { TypesNote } from '../types';
import { Note } from './Note';

export const Notes: FC = () => {
  const [notes, seTypesNotes] = useState<TypesNote[]>([]);

  const geTypesNotes = async () => {
    try {
      const res = await fetch('http://localhost:7070/notes');
      const data = await res.json();
      seTypesNotes(data);
    } catch {}
  };

  const posTypesNotes = async (note: TypesNote) => {
    try {
      await fetch('http://localhost:7070/notes', {
        method: 'POST',
        body: JSON.stringify(note),
      });
      await geTypesNotes();
    } catch {}
  };

  const deleteNotes = async (id: Key) => {
    try {
      await fetch(`http://localhost:7070/notes/${id}`, {
        method: 'DELETE',
      });
      await geTypesNotes();
    } catch {}
  };

  const onDelete = (id: Key) => () => deleteNotes(id);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newNote: TypesNote = {
      content: e.currentTarget.content.value,
    };

    posTypesNotes(newNote);
  };

  useEffect(() => {
    geTypesNotes();
    return () => {
      seTypesNotes([]);
    };
  }, []);

  return (
    <div className="notes">
      <div className="notes__top">
        <h1 className="notes__top__title">Notes</h1>
        <button className="notes__top__update" onClick={geTypesNotes}>
          &#128472;
        </button>
      </div>
      <div className="notes__list">
        {notes.map((note) => (
          <Note key={note.id} onDelete={onDelete} {...note} />
        ))}
      </div>
      <form className="notes__form" onSubmit={onSubmit}>
        <label className="notes__form__label">
          New Note
          <textarea className="notes__form__textarea" name="content"></textarea>
        </label>
        <button className="notes__form__add">&#10148;</button>
      </form>
    </div>
  );
};
