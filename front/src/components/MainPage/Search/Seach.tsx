import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { updateSearch } from "../../../reduxActions/actions";
import "./search.css";

export default function Search() {
  const dispatch: Dispatch<any> = useDispatch();
  const searchInput = useRef<HTMLInputElement>(null);
  const search = () => {
    updateSearch(
      dispatch,
      searchInput && searchInput.current ? searchInput.current.value : ""
    );
  };

  return (
    <div className="searchDiv">
      <input
        ref={searchInput}
        type={"text"}
        className="searchInput"
        placeholder="Search..."
        onChange={search}
      />
    </div>
  );
}
