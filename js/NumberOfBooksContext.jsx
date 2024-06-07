import React, { createContext, useState, useContext } from "react";

const NumberOfBooksContext = createContext();

export const NumberOfBooksProvider = ({ children }) => {
  const [numberOfBooks, setNumberOfBooks] = useState(0);

  return (
    <NumberOfBooksContext.Provider value={{ numberOfBooks, setNumberOfBooks }}>
      {children}
    </NumberOfBooksContext.Provider>
  );
};

export const useNumberOfBooks = () => useContext(NumberOfBooksContext);
