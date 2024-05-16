import React from "react";
import AddBook from "./AddBook";

const Book = ({ book }) => {
  const { bookData, borrowed } = book;
  const { title, authors, rating, have, cover } = bookData;
  const { borrowedStan, name, date } = borrowed;

  console.log(borrowedStan);

  return (
    <>
      <div className="book">
        <div className="img_section">
          <div className="book_cover">
            {cover ? (
              <img src={cover} alt="book cover" className="book_cover" />
            ) : null}
          </div>
          {borrowedStan ? (
            <button
              className="borrowed_btn_list"
              style={{ background: "red", color: "black", fontWeight: "bold" }}
            >
              pożyczyłem
            </button>
          ) : (
            <button
              className="borrowed_btn_list"
              style={{ background: "lightgray", color: "white" }}
            >
              pożyczyłem
            </button>
          )}
        </div>
        <div className="flex_ma">
          <div className="book_main">
            <p className="book_main_title">{title}</p>
            <div className="book_main_content">
              <div className="book_main_author_box">
                <p className="book_main_author">{authors}</p>
                {borrowedStan ? <p> w posiadniu</p> : null}
              </div>
              <div className="book_main_rating_box">
                {rating > 0 ? <p>{rating}</p> : <p>0</p>}
              </div>
            </div>
          </div>
          <div className="book_borrow_data">
            {date ? <span>kiedy: {date}</span> : null}
            {name.length >= 3 ? <span>komu: {name}</span> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
