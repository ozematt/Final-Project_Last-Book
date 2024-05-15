import React from "react";
import { useState } from "react";

const AddBook = () => {
  //DATA
  const [book, setBook] = useState({
    title: "",
    author: "",
    rating: "",
  });

  //checkedBox
  const [checked, setChecked] = useState(false);

  //borrowed-section
  const [borrowedClick, setBorrowedClick] = useState(false);
  const [borrowed, setBorrowed] = useState({
    name: "",
    date: "",
  });

  //selected book
  const [selectedBook, setSelectedBook] = useState([]);
  const [clickedBook, setClickedBook] = useState(false);

  //search section
  const [searchTerm, setSearchTerm] = useState("");
  const [booksView, setBooksView] = useState([]);

  //LOGIC
  const handleCheckChange = () => {
    if (!checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  const handleBorrowedChange = (e) => {
    const { name, value } = e.target;
    setBorrowed((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleBorrowedClick = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (borrowedClick) {
      setBorrowedClick(false);
    } else {
      setBorrowedClick(true);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const API = "https://www.googleapis.com/books/v1/volumes?q=";

    fetch(`${API}${value}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd pobierania danych");
        }
        return response.json();
      })
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const bookData = data.items
            .filter((item) => item.volumeInfo.title.startsWith(value))
            .map((item) => item.volumeInfo.title);
          setBooksView(bookData);
          console.log(bookData);
        } else {
          setBooksView([]);
        }
      })
      .catch((error) => {
        console.error("Błąd podczas wyszukiwania książki:", error);
      });
  };

  const handleClickBook = (book) => {
    setSearchTerm(book);
    setClickedBook(true);
  };
  console.log(searchTerm);

  //options to choose from
  const searchWindow = () => {
    return clickedBook ? null : (
      <div className="search-view">
        <ul>
          {booksView.slice(0, 3).map((book, index) => (
            <li
              onClick={() => handleClickBook(book)}
              className="search-view_item"
              key={index}
            >
              {book.length > 25 ? `${book.substring(0, 25)}...` : book}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  //UI
  return (
    <div className="wrapper add-book">
      <div className="back-view ">
        <div>
          <h2>Dodaj książke:</h2>
          <form className="form_section">
            {/* pierwsza sekcja*/}
            <section className="form_section_left">
              <div className="title_all">
                <label>
                  <input
                    className="title_input"
                    type="text"
                    placeholder="wprowadż tytuł"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </label>
                {/*search title window*/}
                {searchTerm ? searchWindow() : null}
              </div>
              <div className="form_section_left_part-two">
                <label className="rating_text">
                  <input type="number" name="rating" className="rating_input" />
                  jak oceniasz?
                </label>
                {borrowedClick ? (
                  <div className="borrowed">
                    <input
                      type="text"
                      name="name"
                      placeholder="komu przyczyłeś"
                      onChange={handleBorrowedChange}
                    />
                    <input
                      type="date"
                      name="date"
                      placeholder="kiedy"
                      onChange={handleBorrowedChange}
                    />
                  </div>
                ) : null}
              </div>
            </section>
            {/*druga sekcja*/}
            <section className="form_section_right">
              <input type="submit" value="+" className="submit_btn" />
              <label>
                <input
                  type="checkbox"
                  value="checked"
                  onClick={handleCheckChange}
                />
                {!checked ? "posiadasz?" : "posiadam"}
              </label>
              {checked ? (
                <button onClick={handleBorrowedClick} value={borrowedClick}>
                  {!borrowedClick ? "pożyczone?" : "pożyczone"}
                </button>
              ) : null}
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
