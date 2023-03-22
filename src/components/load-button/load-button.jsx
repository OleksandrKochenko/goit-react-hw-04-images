import PropTypes from 'prop-types';
import css from './load-button.module.css';

function Button({ onClick }) {
  return (
    <button className={css.button} type="button" onClick={onClick}>
      Load more
    </button>
  );
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
