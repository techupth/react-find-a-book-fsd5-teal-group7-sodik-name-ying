import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
function App() {
  /* there r 2 usestate bc 
  1 input value will change every time when u put any text 
  2 is display book list bc when value to search change display will change too*/

  const [findBooks, setFindBook] = useState("");
  const [bookList, setBookList] = useState([]);
  /*remind 
  first index in arr of usestate always be second index bc fnc turn value to usestate
  */

  const getBookMatch = async (text) => {
    const getData = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${text}`
    );
    console.log(getData);
    setBookList(getData.data.items);
  }; // crate fnc

  useEffect(() => {
    getBookMatch(findBooks); // parameter findbook from e.target.value at line39
  }, [findBooks]);

  //useeffect isnt fnc but it be event that will be set what should be work
  // nothing = always run
  // only empty arr = run only first time render
  // if arr not empty mean check that value change? then it will run every time that value change

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <form>
        <label>
      {/* debounceinput = หน่วงเวลาตอน พิม */}
          <DebounceInput 
            minLength={2}
            debounceTimeout={300}
            type="text"
            name="name"
            value={findBooks} // dont forget value
            onChange={(e) => {
              setFindBook(e.target.value);
            }}
          />
        </label>
      </form>
      <div>
        <ul>
          {bookList.map((book) => {
            return <li>{book.volumeInfo.title}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
export default App;
