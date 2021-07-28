import React, { useState, useRef, useEffect } from 'react';
import 'components/reset-button/style/resetModal.css';
import $ from 'jquery';

type ModalProps = {
  open: boolean;
  close: () => void;
  reset: () => void;
};

const ResetModal = (props: ModalProps) => {
  const [pw, setPw] = useState('');
  const { open, close, reset } = props;

  const onConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (pw === '1234') {
      alert(`채팅창이 초기화 되었습니다.`);
      reset();
      close();
    }
    else {
      alert(`암호가 틀렸습니다.`);
    }
  };

  const pwHandler = (event: any) => setPw(event.target.value);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'open_modal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            채팅창 초기화
            <button type='button' className='modal__close_btn' onClick={close}>
              {' '}
              &times;{' '}
            </button>
          </header>
          <main>
            <div className='modal__input_pw'>
              <input
                type='password'
                placeholder='암호'
                value={pw}
                onChange={pwHandler}
              />
            </div>
          </main>
          <footer>
            <div className='modal__btn_box'>
              <button
                type='button'
                className='btn_box__modal_close_btn'
                onClick={close}
              >
                {' '}
                취소{' '}
              </button>
              <button
                type='button'
                className='btn_box__modal_confirm_btn'
                onClick={onConfirm}
              >
                {' '}
                확인{' '}
              </button>
            </div>
          </footer>
        </section>
      ) : (
        <div>this is null</div>
      )}
    </div>
  );
};

export default ResetModal;
