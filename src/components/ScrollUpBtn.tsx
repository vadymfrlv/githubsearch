import React from 'react';

interface ScrollUpBtnProps {
  onClick: () => void;
}

export const ScrollUpBtn: React.FC<ScrollUpBtnProps> = ({ onClick: scrollUp }) => {
  return (
    <button
      className="fixed bottom-5 right-5 rounded-md bg-gray-300 p-2 uppercase shadow-md"
      onClick={scrollUp}
    >
      Scroll Up
    </button>
  );
};
