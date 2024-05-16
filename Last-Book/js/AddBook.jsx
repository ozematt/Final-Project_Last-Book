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
  const [borrowed, setBorrowed] = useState({});

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

  const handleRatingChange = (e) => {
    const value = e.target.value;
    setRating(value);
  };

  const handleBorrowedNameChange = (e) => {
    const value = e.target.value;
    setBorrowedName(value);
  };
  const handleBorrowedDateChange = (e) => {
    const value = e.target.value;
    setBorrowedDate(value);
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
              // console.log(cover);
              // console.log(authors);
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
              <div className="cover_search_img">
                <img src={cover} alt="" />
              </div>
              {book.length > 25 ? `${book.substring(0, 25)}...` : book}
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
  };
  console.log(book);

  //UI
  return (
    <div className="wrapper add-book">
      <div className="back-view ">
        <div>
          <h2>Dodaj książke:</h2>
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
                  {/*search title window*/}
                  {searchTerm ? searchWindow() : null}
                </div>
                <div className="form_section_left_part-two">
                  <label className="rating_text">
                    <input
                      type="number"
                      name="rating"
                      value={rating}
                      onChange={handleRatingChange}
                      className="rating_input"
                    />
                    jak oceniasz?
                  </label>
                </div>
              </div>
              <Book book={book} />
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
              {borrowedClick ? (
                <div className="borrowed">
                  <input
                    type="text"
                    value={borrowedName}
                    placeholder="komu przyczyłeś"
                    onChange={handleBorrowedNameChange}
                  />
                  <input
                    type="date"
                    value={borrowedDate}
                    placeholder="kiedy"
                    onChange={handleBorrowedDateChange}
                  />
                </div>
              ) : null}
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
