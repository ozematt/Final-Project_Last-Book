import React from "react";
import AddBook from "./AddBook";

const Book = ({ book }) => {
  const { bookData, borrowed } = book;
  const { title, authors, rating, have, cover } = bookData;
  const { borrowedStan, name, date } = borrowed;

  console.log(borrowedStan);

  return (
    <div className="book">
      <div className="img_section">
        <div className="book_cover"></div>
        {borrowedStan ? (
          <button style={{ background: "red" }}>pożyczyłem</button>
        ) : (
          <button style={{ background: "gray" }}>pożyczyłem</button>
        )}
      </div>
      <div className="flex_ma">
        <div className="book_main">
          <p className="book_main_title">{title}</p>
          <div className="book_main_content">
            <div className="book_main_author_box">
              <p className="book_main_author">{authors}</p>
              {borrowedStan ? <p> POSIADAM</p> : <p>nieposiadam</p>}
            </div>
            <div className="book_main_rating_box">
              {rating > 0 ? <p>{rating}</p> : <p>0</p>}
            </div>
          </div>
        </div>
        <div className="book_borrow_data">
          {date ? <p>kiedy: {date}</p> : <p>kiedy?</p>}
          {name.length > 3 ? <p>komu: {name}</p> : <p>komu?</p>}
        </div>
      </div>
    </div>
  );
};

export default Book;
