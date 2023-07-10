import { useEffect } from "react";
import "./App.css";
import { fetchDataFromApi } from "./utils/api";

function App() {
  useEffect(() => {
    const apiData = () => {
      fetchDataFromApi("/movie/popular").then((res) => {
        console.log(res);
      });
    };
    apiData();
  });

  return (
    <>
      <div className="App">
        <h1 className="text-white">Hello World</h1>
      </div>
    </>
  );
}

export default App;
