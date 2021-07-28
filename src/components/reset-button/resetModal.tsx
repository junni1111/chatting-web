import React, { useState, useRef, useEffect } from 'react';
import 'components/reset-button/style/resetModal.css';
import imgPw from 'resources/images/scope2.png';
import imgText from 'resources/images/scope.png';
import $ from 'jquery';

type ModalProps = {
  open: boolean;
  close: () => void;
  reset: () => void;
};

const ResetModal = (props: ModalProps) => {
  const [lookPw, setLookPw] = useState(false);
  const [pw, setPw] = useState('');
  const { open, close, reset } = props;

  const onConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (pw === 'whtn93') {
      alert(`채팅창이 초기화 되었습니다.`);
      reset();
      closeWithPw();
    } else {
      alert(`암호가 틀렸습니다.`);
    }
  };

  const closeWithPw = () => {
    close();
    setLookPw(false);
    setPw('');
  };

  const pwHandler = (event: any) => setPw(event.target.value);

  const onEnterPress = (event: any) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      onConfirm(event);
    }
  };

  const onEscPress = (event: any) => {
    if (event.keyCode === 27) {
      event.preventDefault();
      closeWithPw();
    }
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLookPw(!lookPw);
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'open_modal modal' : 'modal'} onKeyDown={onEscPress}>
      {open ? (
        <section>
          <header>
            채팅창 초기화
            <button
              type='button'
              className='modal__close_btn'
              onClick={closeWithPw}
            >
              {' '}
              &times;{' '}
            </button>
          </header>
          <main>
            <div className='modal__input_pw'>
              <input
                type={lookPw ? 'text' : 'password'}
                placeholder='암호'
                value={pw}
                onChange={pwHandler}
                onKeyDown={onEnterPress}
              />
              <button
                type='button'
                onClick={onClick}
                className='modal__input_look_pw_btn'
              >
                <img
                  src={lookPw ? imgText : imgPw}
                  alt='LookPassword'
                  className='modal__input_look_pw_btn__img'
                />
              </button>
            </div>
          </main>
          <footer>
            <div className='modal__btn_box'>
              <button
                type='button'
                className='btn_box__modal_close_btn'
                onClick={closeWithPw}
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
