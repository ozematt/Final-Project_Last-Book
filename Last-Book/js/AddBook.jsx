import React from "react";
import { useState } from "react";
import Book from "./Book";

const AddBook = () => {
  //DATA

  //added book data
  const [book, setBook] = useState({
    bookData: {
      title: "",
      authors: [],
      rating: 0,
      have: false,
      cover: "",
    },
    borrowed: {
      borrowedStan: false,
      name: "",
      date: "",
    },
  });

  //borrowed-section

  const [borrowedClick, setBorrowedClick] = useState(false);
  const [borrowedName, setBorrowedName] = useState("");
  const [borrowedDate, setBorrowedDate] = useState("");

  //cover
  const [cover, setCover] = useState("");

  //checkedBox
  const [checked, setChecked] = useState(false);

  //selected book
  const [selectedBook, setSelectedBook] = useState([]);
  const [clickedBook, setClickedBook] = useState(false);

  //rating book
  const [rating, setRating] = useState(0);

  //search section
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedAuthors, setSearchedAuthors] = useState([]);
  const [booksView, setBooksView] = useState([]);

  //LOGIC
  const handleCheckChange = () => {
    if (!checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
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

  //// SEARCH AND API
  let timeoutId;
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const API = "https://www.googleapis.com/books/v1/volumes?q=";
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fetch(`${API}${value}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Błąd pobierania danych");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.items.map((item) => item.volumeInfo.authors));
          if (data.items && data.items.length > 0) {
            // book title search
            const bookData = data.items
              .filter((item) => item.volumeInfo.title.startsWith(value))
              .map((item) => item.volumeInfo.title);
            setBooksView(bookData);
            if (booksView) {
              const book = data.items.find((item) =>
                item.volumeInfo.title.includes(booksView),
              );
              // author and cover
              const authors = book.volumeInfo.authors;
              const cover = book.volumeInfo.imageLinks.smallThumbnail;
              setSearchedAuthors(authors);
              setCover(cover);
            }
          } else {
            setBooksView([]);
          }
        })
        .catch((error) => {
          console.error("Błąd podczas wyszukiwania książki:", error);
        });
    }, 2000);
  };

  //SEARCH OPTION WINDOW - LOGIC
  const searchWindow = () => {
    return clickedBook ? null : (
      <div className="search-view">
        <ul>
          {booksView.slice(0, 1).map((book, index) => (
            <li
              onClick={() => handleClickBook(book)}
              className="search-view_item"
              key={index}
            >
              <div className="cover_search">
                <img className="cover_search_img" src={cover} alt="" />

                {book.length > 25 ? `${book.substring(0, 25)}...` : book}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleClickBook = (book) => {
    setSearchTerm(book);
    setClickedBook(true);
  };

  ////FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    setBook({
      bookData: {
        title: searchTerm,
        authors: searchedAuthors,
        rating: rating,
        have: checked,
        cover: cover,
      },
      borrowed: {
        borrowedStan: borrowedClick,
        name: borrowedName,
        date: borrowedDate,
      },
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    };

    fetch("http://localhost:3000/books", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Błąd:", error));

    setSearchTerm("");
    setRating(0);
    setSearchedAuthors([]);
  };
  console.log(book);

  //UI
  return (
    <>
      {/*LISTA*/}
      <div className="wrapper list">
        <div className="back-view flex_ma">
          <h2>Lista:</h2>
          <Book book={book} />
        </div>
      </div>
      {/*DODAWANIE KSIAŻKI */}
      <div className="wrapper add-book">
        <div className="add-book_box">
          <div className="parent_relative">
            <h2 className="add-book_text">Dodaj książke:</h2>
            <form className="form_section" onSubmit={handleSubmit}>
              {/* pierwsza sekcja*/}
              <section className="form_section_left">
                <div className="form_section_left_search">
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
                    <label>
                      <p onChange={handleSearch}>autor:{searchedAuthors}</p>
                    </label>
                    {/*search title window*/}
                    {searchTerm ? searchWindow() : null}
                  </div>
                  <div className="form_section_left_part-two">
                    <label>
                      <input
                        type="number"
                        name="rating"
                        value={rating}
                        onChange={(e) => {
                          setRating(e.target.value);
                        }}
                        className="rating_input"
                      />
                    </label>
                    <span className="rating_text">
                      twoja
                      <br /> ocena
                    </span>
                  </div>
                </div>
                {/*<Book book={book} />*/}
              </section>
              {/*druga sekcja*/}
              <section className="form_section_right">
                <input type="submit" value="+" className="submit_btn" />
                <label className="check_input">
                  <input
                    type="checkbox"
                    value="checked"
                    onChange={handleCheckChange}
                  />
                  {!checked ? " posiadasz?" : " posiadam"}
                </label>

                {checked ? (
                  <button
                    onClick={handleBorrowedClick}
                    className="borrowed_btn"
                  >
                    {!borrowedClick ? "pożyczone?" : "pożyczone"}
                  </button>
                ) : null}
                {borrowedClick ? (
                  <div className="borrowed">
                    <input
                      className="borrowed_name"
                      type="text"
                      value={borrowedName}
                      placeholder="komu?"
                      onChange={(e) => setBorrowedName(e.target.value)}
                    />
                    <input
                      className="borrowed_date"
                      type="date"
                      value={borrowedDate}
                      onChange={(e) => setBorrowedDate(e.target.value)}
                    />
                  </div>
                ) : null}
              </section>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBook;
