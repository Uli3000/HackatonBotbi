import { useRef } from "react";
import { useModalContext } from "../Context/ModalContext";
import { createPortal } from "react-dom";
import "./Modal.css";

interface Props {
  children: React.ReactNode;
}

function Modal({ children }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { state, setState } = useModalContext();
  const closeModal = () => {
    setState(false);
  };

  const modalRoot = document.getElementById("modal");

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!state || !modalRoot) {
    return null;
  }

  return createPortal(
    <div className="overlay" onClick={closeModal}>
      <div className="modal" onClick={handleContentClick} ref={modalRef}>
        {children}
        <button
          className="close-button"
          onClick={closeModal}
          aria-label="Cerrar modal"
        >
          ✖
        </button>
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
