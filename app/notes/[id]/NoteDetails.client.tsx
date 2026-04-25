'use client'

import css from './NoteDetails.module.css'
import { useQuery } from '@tanstack/react-query'
import { fetchNote } from '@/lib/api'
import { useParams } from 'next/navigation'

const NoteDetailsClient = () => {

   const { id } = useParams<{ id: string }>();

const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNote(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
              <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
    </div>

  )
}

export default NoteDetailsClient
