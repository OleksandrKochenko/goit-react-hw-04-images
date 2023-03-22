import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles.css';
import css from './searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [qValue, setQvalue] = useState('');

  const handleChange = e => {
    setQvalue(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(qValue);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.search_form_button}>
          <span className={css.search_form_button_label}>Search</span>
        </button>
        <input
          className={css.search_form_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
