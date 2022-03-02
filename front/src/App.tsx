import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./components/MainPage/MainPage";
import NavBar from "./components/NavBar";
import { updateData } from "./reduxActions/actions";
import AnalyticsPage from "./components/AnalyticsPage/AnalyticsPage";

const REFRESH_TIME_MS = 120000;
const URL = "http://localhost:3004/strongW2ise";

function App() {
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await axios.get(URL);
        console.log(response.data.data);

        updateData(dispatch, response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();

    setInterval(async () => {
      async function x() {
        try {
          const response = await axios.get(URL);
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
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
