import classNames from 'classnames';
import React, {
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
} from 'react';

export interface IModal {
  active?: boolean;
  fixed?: boolean;
  showFooter?: boolean;
  footer?: ReactElement;
  onClose?: MouseEventHandler;
}

const Modal = ({
  active,
  fixed,
  showFooter,
  footer,
  onClose,
  children,
}: PropsWithChildren<IModal>) => {
  return (
    <div
      className={classNames('is-overlay', 'modal', {
        'is-active': active,
        'is-fixed': fixed,
      })}
    >
      <div className='modal-background' onClick={onClose}></div>
      <div className='modal-card'>
        <button
          className='modal-close is-large'
          aria-label='close'
          onClick={onClose}
        />
        <section className='modal-card-body'>{children}</section>
        {showFooter && <footer className='modal-card-foot'>{footer}</footer>}
      </div>
    </div>
  );
};

export default Modal;
