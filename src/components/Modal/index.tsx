import classNames from 'classnames';
import React, { MouseEventHandler, PropsWithChildren } from 'react';

export interface IModal {
  active?: boolean;
  onClose?: MouseEventHandler;
}

const Modal = ({ active, onClose, children }: PropsWithChildren<IModal>) => {
  return (
    <div
      className={classNames('is-overlay', 'modal', {
        'is-active': active,
      })}
    >
      <div className='modal-background' onClick={onClose}></div>
      <div className='modal-card'>
        <section className='modal-card-body'>{children}</section>
        <button
          className='modal-close is-large'
          aria-label='close'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default Modal;
