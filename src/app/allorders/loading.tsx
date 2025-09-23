import React from 'react';

export default function Loading() {
  return (
    // <div className="h-screen flex justify-center items-center">
    //   <span className="loader"></span>
    // </div>
    <div className="text-center text-3xl font-bold mt-[20%]">
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </div>
  );
}
