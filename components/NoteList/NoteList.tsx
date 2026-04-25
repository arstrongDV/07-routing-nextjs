'use client'

import css from './NoteList.module.css'
import type { Note } from '../../types/note'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type NoteListProps = {
  notes: Note[];
};

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['notes']})
    }
  })

  return (
    <ul className={css.list}>
    {notes.map(note => (
        <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>
              <Link href={`/notes/${note.id}`} >{note.title}</Link>
              </h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button} onClick={() => deleteMutation.mutate(note.id)}>Delete</button>
            </div>
        </li>
    ))}
    </ul>
  )
}

export default NoteList
