import React from "react";
import Book from "./Book";
import { useState, useEffect } from "react";
import { API } from "./api/constans";
import { useNumberOfBooks } from "./NumberOfBooksContext";

const List = ({ newBook }) => {
  //DATA
  const [books, setBooks] = useState([]);
  const [listClicked, setListClicked] = useState(false);

  const userId = JSON.parse(localStorage.getItem("currentUser"))?.id;
  const { setNumberOfBooks } = useNumberOfBooks();

  //LOGIC
  useEffect(() => {
    if (userId) {
      // Fetch user data
      fetch(`${API}/users/${userId}`)
        .then((response) => response.json())
        .then((user) => {
          // Fetch books data
          fetch(`${API}/books`)
            .then((response) => response.json())
            .then((allBooks) => {
              // Filter books by userId
              const userBooks = allBooks.filter(
                (book) => book.userId === user.id,
              );
              setNumberOfBooks(userBooks.length);
              setBooks(userBooks);
            })
            .catch((error) => console.error("Error fetching books:", error));
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [userId, setNumberOfBooks]);

  useEffect(() => {
    if (newBook && newBook.userId === userId) {
      setBooks((prevBooks) => {
        const updatedBooks = [...prevBooks, newBook];
        setNumberOfBooks(updatedBooks.length);
        return updatedBooks;
      });
    }
  }, [newBook, userId, setNumberOfBooks]);

  //delete book from list
  const handleDelete = (deletedBookId) => {
    fetch(`${API}/books/${deletedBookId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Update user book list
        const updatedBooks = books.filter((book) => book.id !== deletedBookId);
        setBooks(updatedBooks);
        setNumberOfBooks(updatedBooks.length); // Update number of books
      })
      .catch((error) => console.error("Error deleting book:", error));
  };

  const handleListClick = () => {
    if (listClicked) {
      setListClicked(false);
    } else {
      setListClicked(true);
    }
  };

  //UI
  return (
    <>
      {/* new book added*/}
      <section>
        <div className="wrapper section_wrapper">
          <div className="section_title">
            <h2 className="section_title_text">Aktualnie dodana książka:</h2>
          </div>
          <div className="section_box cover-button-relative">
            <div className="cover-button"></div>
            <Book book={newBook} />
          </div>
        </div>
      </section>

      {/*  user book list*/}
      {listClicked ? (
        <section className="user_book_list-clicked">
          <div className="wrapper section_wrapper">
            {!listClicked ? (
              <div className="box-relative">
                <div className="user_book_list-foreground">
                  <h2 onClick={handleListClick}>Kliknij, aby sprawdzić</h2>
                </div>
              </div>
            ) : null}
            <div className="section_title list_title-flex">
              <h2 className="section_title_text">
                Twoja lista przeczytanych książek:
              </h2>
              <span className="list_hide" onClick={handleListClick}>
                ZWIŃ
              </span>
            </div>
            <div className="section_box_list-clicked">
              {books.length > 0 ? (
                <ul>
                  {books.map((book) => (
                    <Book key={book.id} book={book} onDelete={handleDelete} />
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </section>
      ) : (
        <section className="user_book_list">
          <div className="wrapper section_wrapper">
            {!listClicked ? (
              <div className="box-relative">
                <div className="user_book_list-foreground">
                  <h2 onClick={handleListClick}>Kliknij, aby sprawdzić</h2>
                </div>
              </div>
            ) : null}

            <div className="section_title">
              <h2 className="section_title_text">
                Twoja lista przeczytanych książek:
              </h2>
            </div>
            <div className="section_box_list">
              {books.length > 0 ? (
                <ul>
                  {books.map((book) => (
                    <Book key={book.id} book={book} onDelete={handleDelete} />
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default List;
