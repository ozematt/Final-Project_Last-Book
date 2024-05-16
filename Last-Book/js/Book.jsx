import React from "react";

const Book = () => {
  return (
    <div className="book">
      <div className="img_section">
        <div className="book_cover"></div>
        <button>pożyczyłem</button>
      </div>
      <div className="flex_ma">
        <div className="book_main">
          <p className="book_main_title">tytuł książki</p>
          <div className="book_main_content">
            <div className="book_main_author_box">
              <p className="book_main_author">Autor</p>
              <p>posiadam</p>
            </div>
            <div className="book_main_rating_box">
              <p>10</p>
            </div>
          </div>
        </div>
        <div className="book_borrow_data">
          <p>kiedy?</p>
          <p>komu?</p>
        </div>
      </div>
    </div>
  );
};

export default Book;
