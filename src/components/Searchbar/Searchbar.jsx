import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  onSearchSubmit = event => {
    event.preventDefault();
    const searchString = event.currentTarget.elements.search.value
      .trim()
      .toLowerCase();
    this.props.onSubmit({ searchString });
  };

  render() {
    const { onSearchSubmit } = this;
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={onSearchSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.button_label}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
