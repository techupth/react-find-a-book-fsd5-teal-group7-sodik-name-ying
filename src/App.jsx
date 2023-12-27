import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [textInput, setTextInput] = useState("");
  const [search, setSearch] = useState([]);

  const getBook = async (index) => {
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${index}`
    );
    setSearch(result.data.items);
  };
  console.log(search);
  useEffect(() => {
    getBook(textInput);
  }, [textInput]);

  return (
    <div className="App">
      <div>
        <h1>Find a Book</h1>
        <input
          className="input"
          type="text"
          value={textInput}
          onChange={(event) => {
            setTextInput(event.target.value);
          }}
        ></input>
        {search.map((item, index) => {
          return (
            <div key={index}>
              <ul>
                <li>{item.volumeInfo.title}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
