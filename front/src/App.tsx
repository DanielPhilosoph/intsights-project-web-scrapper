import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import MainPage from "./components/MainPage/MainPage";
import NavBar from "./components/NavBar";
import { updateData } from "./reduxActions/actions";

const REFRESH_TIME_MS = 5000;

function App() {
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await axios.get("http://localhost:3004/strongW2ise");
        updateData(dispatch, response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();

    setInterval(async () => {
      async function x() {
        try {
          const response = await axios.get("http://localhost:3004/strongW2ise");
          updateData(dispatch, response.data.data);
          console.log("updated");
        } catch (error) {
          console.log(error);
        }
      }
      await x();
    }, REFRESH_TIME_MS);
  }, []);

  return (
    <div className="App">
      <NavBar />
      <MainPage />
    </div>
  );
}

export default App;
