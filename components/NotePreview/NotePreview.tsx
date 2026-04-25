import React from 'react'
import Modal from '../Modal/Modal'
import css from './NotePreview.module.css'
import { useRouter } from 'next/navigation'
import { Note } from '@/types/note'

interface NotePreview {
    note: Note
}

const NotePreview = ({ note }: NotePreview) => {
    const router = useRouter()
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

        <button className={css.backBtn} onClick={() => router.back()}>Back</button>
    </div>
  )
}

export default NotePreview
