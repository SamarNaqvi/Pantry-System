// src/components/Modal.js

import { ReactElement, ReactNode, useState } from "react";

const Modal = ({
  title,
  showModal,
  setShowModal,
  onsubmit,
  children,
}: {
  title: String;
  showModal: Boolean;
  setShowModal: Function;
  onsubmit: Function;
  children: ReactNode;
}) => {
  return (
    <div
      className={`fixed inset-0 p-48 flex items-center justify-center z-50 transition-opacity duration-500 ${
        showModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setShowModal(false)}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div
        className="bg-white rounded-lg shadow-lg p-10 w-full transition-transform duration-500 transform ${
          showModal ? 'translate-y-0' : '-translate-y-10'
        }"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl border border-solid border-slate-300 border-t-0 border-l-0 border-r-0 pb-3 border-opacity-[0.4] font-bold">{`${title} Modal`}</h1>
        {children}
        <div className="mt-5 flex items-center gap-x-3">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <button
            className=" px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => {
              if (onsubmit()) setShowModal(false);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
