import React from 'react';

function Modal() {
  return (
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              Modal Title
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessModal({ getShowSuccessModal, setShowSuccessModal }: ISuccessModal) {
  console.log(setShowSuccessModal);
  return (
    <div>
      {getShowSuccessModal() && <Modal /> }
    </div>
  );
}

interface ISuccessModal {
  getShowSuccessModal: Function,
  setShowSuccessModal: Function
}

export { SuccessModal };

export type { ISuccessModal };
