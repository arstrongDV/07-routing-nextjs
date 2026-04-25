import css from './SearchBox.module.css'

interface SearchBoxProps {
    searchQuery: string;
    onChange: (newQuery: string) => void;
}

const SearchBox = ({ searchQuery, onChange }: SearchBoxProps) => {
  return (
    <input
      className={css.input}
      value={searchQuery}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      placeholder="Search notes"
    />
  );
};

export default SearchBox