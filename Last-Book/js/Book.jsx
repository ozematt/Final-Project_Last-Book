import React, { useState } from "react";

const Book = ({ book, onDelete }) => {
  const { bookData, borrowed, id } = book;
  const { title, authors, rating, cover } = bookData;
  const { borrowedStan, name, date } = borrowed;

  const [borrowedEdit, setBorrowedEdit] = useState(true);

  let buttonStyle = {
    background: "#FC2C2CFF",
    color: "white",
  };

  const handleBorrowedEdit = () => {
    setBorrowedEdit(!borrowedEdit);
  };

  const deleteBook = () => {
    onDelete(id);
  };

  return (
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
            onClick={handleBorrowedEdit}
            style={borrowedEdit ? buttonStyle : undefined}
          >
            pożyczyłem
          </button>
        ) : (
          <button className="borrowed_btn_list" onClick={handleBorrowedEdit}>
            pożyczyłem
          </button>
        )}
      </div>
      <div>
        <div className="book_main">
          <div className="book_info-text">
            <strong>tytuł:</strong>
          </div>
          <div className="book_main_title">{title}</div>
          <div className="book_main_content">
            <div className="book_main_author_box">
              <div className="book_info-text">
                <strong>autor:</strong>
              </div>
              <div className="book_main_author">{authors}</div>
              {borrowedStan ? (
                <p>
                  <strong>POSIADAM</strong>
                </p>
              ) : null}
            </div>
            <div className="book_rating_box">
              <div className="book_main_rating_box">
                {rating > 0 ? <span>{rating}</span> : <span>0</span>}
              </div>
              <span>ocena</span>
              <br />
              <button onClick={deleteBook} className="book_delete_btn">
                usuń <br />
                książke
              </button>
            </div>
          </div>
          {borrowedEdit ? (
            <div className="book_borrow_data">
              {date ? (
                <div className="book_borrow_data_info">
                  <strong>kiedy:</strong> {date}
                </div>
              ) : null}
              {name.length >= 3 ? (
                <div className="book_borrow_data_info">
                  <strong>komu:</strong> {name}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Book;
