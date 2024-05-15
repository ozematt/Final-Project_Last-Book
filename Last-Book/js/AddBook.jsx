import React from "react";
import { useState } from "react";

const AddBook = () => {
  //DATA
  const [book, setBook] = useState({
    title: "",
    author: "",
    rating: "",
  });

  const [borrowed, setBorrowed] = useState({
    name: "",
    date: "",
  });

  const [checked, setChecked] = useState(false);

  const [borrowedClick, setBorrowedClick] = useState(false);

  const [error, setError] = useState("");

  //LOGIC
  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setBook((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleBorrowedChange = (e) => {
    const { name, value } = e.target;
    setBorrowed((prevState) => ({ ...prevState, [name]: value }));
  };

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

  //UI
  return (
    <div className="wrapper add-book">
      <div className="back-view ">
        <div>
          <h2>Dodaj książke:</h2>
          <form className="form_section">
            {/* pierwsza sekcja*/}
            <section className="form_section_left">
              <div className="title_all">
                <input
                  type="text"
                  name="title"
                  placeholder="wprowadż tytuł"
                  value={book.title}
                  onChange={handleBookChange}
                />
                <input
                  type="text"
                  name="author"
                  placeholder="wprowadź autora"
                  value={book.author}
                  onChange={handleBookChange}
                />
              </div>
              <div className="form_section_left_part-two">
                <label className="rating_text">
                  <input
                    type="number"
                    name="rating"
                    className="rating_input"
                    value={book.rating}
                    onChange={handleBookChange}
                  />
                  jak oceniasz?
                </label>
                {borrowedClick ? (
                  <div className="borrowed">
                    <input
                      type="text"
                      name="name"
                      placeholder="komu przyczyłeś"
                      onChange={handleBorrowedChange}
                    />
                    <input
                      type="text"
                      name="date"
                      placeholder="kiedy"
                      onChange={handleBorrowedChange}
                    />
                  </div>
                ) : null}
              </div>
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
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
