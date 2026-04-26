import React from 'react'
import css from './NotePreview.module.css'
import { useParams, useRouter } from 'next/navigation'
import { Note } from '@/types/note'
import { useQuery } from '@tanstack/react-query'
import { fetchNote } from '@/lib/api'
import Modal from '@/components/Modal/Modal'

const NotePreview = () => {
    const router = useRouter()
    const { id } = useParams<{ id: string }>();

    const { data: note, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNote(id),
        refetchOnMount: false,
    });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;
  return (
    <Modal onClose={() => router.back()}>
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{note.title}</h2>
                </div>
                <p className={css.tag}>{note.tag}</p>
                <p className={css.content}>{note.content}</p>
                <p className={css.date}>{note.createdAt}</p>
            </div>

            <button className={css.backBtn} onClick={() => router.back()}>Back</button>
        </div>
    </Modal>
  )
}

export default NotePreview
