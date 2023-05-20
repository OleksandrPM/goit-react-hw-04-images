import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ code, currentTarget, target }) => {
    if (code === 'Escape' || currentTarget === target) {
      this.props.onClose();
    }
  };

  render() {
    const {
      props: { children },
      closeModal,
    } = this;

    return createPortal(
      <div className={css.overlay} onClick={closeModal}>
        <div className={css.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = { onClose: PropTypes.func.isRequired };

export default Modal;
