import { useState, useEffect } from "react";
import axios from "axios";

export default function BookSearch() {
  const [book, setBook] = useState("");
  const [bookData, setBookData] = useState([]);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [showOtherBookOption, setShowOtherBookOption] = useState(false);

  const handleForm = async (e, defaultSearchResults = 5) => {
    e.preventDefault();
    const bookAPI = "https://www.googleapis.com/books/v1/volumes?q=";
    const apiKey = "&key=AIzaSyDbhse2d4w_bbA_0LPmEMaatKr9o3ZeDfg";
    const defaultResults = "&maxResults=" + defaultSearchResults;
    try {
      const data = await axios.get(bookAPI + book + apiKey + defaultResults);
      setBookData(data.data.items);
      setShowLoadMoreBtn(true);
      setShowOtherBookOption(true);
      console.log(data.data.items[4].volumeInfo.imageLinks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          handleForm(e);
        }}
      >
        <div>
          <label>Name: </label>
          <input className="border-2" />
        </div>
        <div>
          <label>Book Name: </label>
          <input
            className="border-2"
            onChange={(e) => setBook(e.target.value)}
          />
        </div>
        <button type="submit" className="border px-2 py-1 bg-indigo-300">
          Search
        </button>
      </form>

      <div className="flex space-x-1 flex-wrap justify-center">
        {bookData.map((item) => {
          return (
            <div className="flex flex-col justify-center border-2 border-indigo-500 m-1">
              {item.volumeInfo.imageLinks ? (
                <img
                  src={item.volumeInfo.imageLinks.thumbnail}
                  alt={item.volumeInfo.title}
                  className="h-40 w-36"
                />
              ) : (
                <p className="text-red-500">Image not found</p>
              )}

              <p className="w-36 py-1">{item.volumeInfo.title}</p>
            </div>
          );
        })}
        {showOtherBookOption ? (
          <div className="flex flex-col justify-center border-2 border-indigo-500 m-1">
            <img src="" alt="book cover" className="h-40 w-36" />

            <p className="w-36 py-1">other book</p>
          </div>
        ) : (
          ""
        )}
      </div>
      {showLoadMoreBtn ? (
        <button
          onClick={(e) => {
            handleForm(e, 15);
            setShowLoadMoreBtn(false);
          }}
          className="border px-2 py-1 bg-indigo-300"
        >
          Load More
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
