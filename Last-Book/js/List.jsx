import React from "react";
import Book from "./Book";

const List = ({ newBook }) => {
  return (
    <>
      <section>
        <div className="wrapper section_wrapper">
          <div className="section_title">
            <h2 className="section_title_text">Lista książek przeczytanych:</h2>
          </div>
          <div className="section_box">
            <Book book={newBook} />
          </div>
        </div>
      </section>
    </>
  );
};
export default List;
