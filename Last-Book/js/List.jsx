import React from "react";
import Book from "./Book";
import { useState, useEffect } from "react";
import { API } from "./api/constans";

const List = ({ newBook }) => {
  const [books, setBooks] = useState([]);
  // const [loading, setLoading] = useState(false);
  // console.log(books);
  const userId = JSON.parse(localStorage.getItem("currentUser"))?.id;
  // console.log(userId);

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
              // console.log(allBooks);
              const userBooks = allBooks.filter(
                (book) => book.userId === user.id,
              );
              setBooks(userBooks);
            })
            .catch((error) => console.error("Error fetching books:", error));
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [userId]);

  return (
    <>
      <section>
        <div className="wrapper section_wrapper">
          <div className="section_title">
            <h2 className="section_title_text">Lista książek przeczytanych:</h2>
          </div>
          <div className="section_box">
            {/*<Book book={newBook} />*/}
            <h1>Books of the User</h1>
            {books.length > 0 ? (
              <ul>
                {books.map((book) => (
                  <li key={book.id}>{book.bookData.title}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};
export default List;
