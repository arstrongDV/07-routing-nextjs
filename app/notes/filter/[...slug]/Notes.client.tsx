'use client'

import { useState } from 'react'
import css from './NotesPage.module.css'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { useDebouncedCallback } from 'use-debounce'
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

interface NotesProps {
  category: string | undefined;
}

function Notes({ category }: NotesProps) {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState(''); 
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setPage(1); // 🔥 reset сторінки
  }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, searchQuery, category],
    queryFn: () => fetchNotes({
          page: page,
          search: searchQuery,
          tag: category
    }),
    placeholderData: keepPreviousData
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
  <div className={css.app}>
    <header className={css.toolbar}>
    <SearchBox
      searchQuery={inputValue}
      onChange={(value: string) => {
        setInputValue(value);
        debouncedSearch(value);
      }}
    />

      {data && data?.totalPages > 1 && (
        <Pagination totalPages={data?.totalPages} currentPage={page} onPageChange={setPage} />
      )}
      <button className={css.button} onClick={() => setShowModal(true)}>Create note +</button>
    </header>

    {data?.notes.length !== 0 && (
      <NoteList notes={data?.notes || []} />
    )}

    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <NoteForm onClose={() => setShowModal(false)} />
      </Modal>
    )}
  </div>
  )
}

export default Notes;