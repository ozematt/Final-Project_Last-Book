import React from "react";
import { useState } from "react";
import Book from "./Book";
import { API } from "./api/constans";
import List from "./List";

const AddBook = () => {
  //DATA
  const [bookAdded, setBookAdded] = useState(false);
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
    userId: "",
  });
  console.log(book);
  //borrowed-section
  const [borrowedClick, setBorrowedClick] = useState(false);
  const [borrowedName, setBorrowedName] = useState("");
  const [borrowedDate, setBorrowedDate] = useState("");

  //cover
  const [covers, setCovers] = useState([]);

  //checkedBox
  const [checked, setChecked] = useState(false);
  const [shouldUncheck, setShouldUncheck] = useState(false);

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
  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
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
          if (data.items && data.items.length > 0) {
            // book title search
            const bookData = data.items
              .filter((item) => item.volumeInfo.title.startsWith(value))
              .map((item) => item.volumeInfo.title);
            setBooksView(bookData);
            // console.log(bookData);

            const authors = data.items
              .filter((item) => item.volumeInfo.title.startsWith(value))
              .map((item) => item.volumeInfo.authors);
            setSearchedAuthors(authors);

            const covers = data.items
              .filter((item) => item.volumeInfo.title.startsWith(value))
              .map((item) => item.volumeInfo.imageLinks.smallThumbnail);
            setCovers(covers);

            if (booksView) {
              const book = data.items.find((item) =>
                item.volumeInfo.title.includes(booksView),
              );
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
  const handleClickBook = (book, index) => {
    setCovers(covers[index]);
    setSearchTerm(book);
    setSearchedAuthors(searchedAuthors[index].join(", "));
    setClickedBook(true);
  };

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // console.log(currentUser.id);
  ////FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser) {
      console.error("Brak zalogowanego użytkownika!");
      return;
    }
    const newBook = {
      bookData: {
        title: searchTerm,
        authors: searchedAuthors,
        rating: rating,
        have: checked,
        cover: covers,
      },
      borrowed: {
        borrowedStan: borrowedClick,
        name: borrowedName,
        date: borrowedDate,
      },
      userId: currentUser.id,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    };

    fetch(`${API}/books`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Błąd:", error));
    setBook((prevState) => ({ ...prevState, ...newBook }));

    //object book clean
    setSearchTerm("");
    setRating(0);
    setSearchedAuthors([]);
    setCovers([]);
    setBorrowedClick(false);
    setChecked(false);
    setShouldUncheck(true);
    setBorrowedDate("");
    setBorrowedName("");
    setBookAdded(true);
    setClickedBook(false);
  };

  const addedBookInfo = () => {
    setTimeout(() => {
      setBookAdded(false);
    }, 1500);
    return (
      <>
        {bookAdded ? (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Informacja</h2>
              <p>Książka została dodana pomyślnie!</p>
            </div>
          </div>
        ) : null}
      </>
    );
  };

  const handleRatingFocus = () => {
    if (rating === 0) {
      setRating("");
    }
  };
  //
  const searchWindow = () => {
    return clickedBook ? null : (
      <div className="search-view">
        <ul className="search-ul_list">
          {booksView.slice(0, 20).map((book, index) => (
            <li
              onClick={() => handleClickBook(book, index)}
              className="search-ul_list_item"
              key={index}
            >
              <div className="cover_search">
                <img className="cover_search_img" src={covers[index]} alt="" />
                <div>
                  <div className="book_info-text">tytuł:</div>
                  <div className="book_info-text_fill">
                    <strong>
                      {book.length > 48 ? `${book.substring(0, 48)}...` : book}
                    </strong>
                  </div>
                  <div className="book_info-text">autor:</div>
                  <div className="book_info-text_fill">
                    <strong>{searchedAuthors[index]}</strong>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  //UI
  return (
    <>
      {/*LISTA*/}

      {/*DODAWANIE KSIAŻKI */}
      <section>
        <div className="wrapper section_wrapper">
          <div className="section_title">
            <h2 className="section_title_text">Dodaj książke:</h2>
          </div>
          <div className="section_box">
            <form className="form-sections" onSubmit={handleSubmit}>
              {/* left section */}
              <section className="form-sections_left">
                <div className="form-sections_left_search">
                  <div className="search_section_bar">
                    <label>
                      <input
                        className="search-input"
                        type="text"
                        placeholder="wprowadż tytuł"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </label>

                    {/* search window examples */}
                    {searchTerm ? searchWindow() : null}
                  </div>
                  <div className="selected-book">
                    <div className="cover_search_img">
                      {covers.length > 0 ? (
                        <img
                          src={covers}
                          alt="book cover"
                          className="cover_search_img"
                        />
                      ) : null}
                    </div>
                    <div className="book_info">
                      <div>
                        <div className="book_info-text">tytuł:</div>
                        <div className="book_info-text_fill">
                          <strong>
                            {searchTerm.length > 66
                              ? `${searchTerm.substring(0, 66)}...`
                              : searchTerm}
                          </strong>
                        </div>
                        <div className="book_info-text">autor:</div>
                        <div className="book_info-text_fill">
                          <strong>{searchedAuthors}</strong>
                        </div>
                      </div>
                      {/*buttons validation*/}
                      <div className="borrowed_focus">
                        {checked ? (
                          <div className="borrowed_btns">posiadam</div>
                        ) : null}
                        {borrowedClick ? (
                          <div className="borrowed_btns">pożyczone</div>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <input
                        type="number"
                        name="rating"
                        value={rating}
                        onChange={(e) => {
                          setRating(e.target.value);
                        }}
                        className="rating_input"
                        max="10"
                        onFocus={handleRatingFocus}
                        placeholder="0/10"
                      />
                      <div className="book_info-text rating_text">
                        twoja <br /> ocena
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/*druga sekcja*/}
              <section className="form-sections_right">
                <input type="submit" value="+" className="submit_btn" />
                <div className="check_input">
                  <input
                    type="checkbox"
                    value="checked"
                    checked={shouldUncheck ? false : checked}
                    onChange={handleCheckChange}
                    className="check_input_checkbox"
                  />
                  {!checked ? <span>posiadasz? </span> : <span>posiadam</span>}
                </div>

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
                      placeholder="komu? kiedy?"
                      onChange={(e) => setBorrowedName(e.target.value)}
                    />
                    <input
                      className="borrowed_date"
                      type="date"
                      value={borrowedDate}
                      placeholder="kiedy?"
                      onChange={(e) => setBorrowedDate(e.target.value)}
                    />
                  </div>
                ) : null}
              </section>
            </form>
          </div>
        </div>
        {bookAdded ? addedBookInfo() : null}
      </section>
      <List newBook={book} />
    </>
  );
};

export default AddBook;
