import React, { useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./postsTable.css";
import ReactPaginate from "react-paginate";

import { capitalizeFirstLetter, formatDate, isString } from "../../../helper/functions";

export default function PostsTable() {
  const state: StateType = useSelector((state: StateType) => state);
  const [pageNumber, setPageNumber] = useState(0);

  //* Paging logic
  const postsPerPage = 10;
  const pagesVisited = pageNumber * postsPerPage;

  //* Consts
  const SHOW_MORE_LENGTH = 150;

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const showMoreOrLess = (event: any, more: string) => {
    if (event.target) {
      event.target.textContent =
        event.target.textContent === "Show more" ? "Show less" : "Show more";
      if (event.target.textContent === "Show less") {
        event.target.parentNode.childNodes[0].textContent += more;
      } else {
        event.target.parentNode.childNodes[0].textContent =
          event.target.parentNode.childNodes[0].textContent.substring(0, SHOW_MORE_LENGTH);
      }
    }
  };

  let dataToRender: StrongW2iseType[];
  let tbodyRender;
  let pageCount = 0;

  if (state.data) {
    //* Filler with the search param (from state)
    dataToRender = state.data.filter(
      (post) =>
        post.title.toLowerCase().includes(state.search.toLowerCase()) ||
        post.content.toLowerCase().includes(state.search.toLowerCase()) ||
        post.section.toLowerCase().includes(state.search.toLowerCase())
    );

    //? Set page count for paginate
    pageCount = Math.ceil(dataToRender.length / postsPerPage);

    //? At first render, sort by date
    dataToRender = [
      ...dataToRender.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }),
    ].slice(pagesVisited, pagesVisited + postsPerPage);

    //* Render data
    tbodyRender = dataToRender.map((post) => {
      const keys = Object.keys(post);
      const values = Object.values(post);
      let tdValue: string | number;
      return (
        <tr key={post.id + post.title}>
          {keys.map((key, i) => {
            //? Dont show sentimentScore
            if (key === "sentimentScore") return "";
            if (key === "id") return "";
            if (key === "date") {
              const formattedDate = formatDate(post[key]).date;
              //* Date formatting
              tdValue = formattedDate !== undefined ? formattedDate : post[key];
            } else {
              tdValue = values[i];
            }
            if (key === "content") {
              let value = values[i];
              if (isString(value) && value.length > SHOW_MORE_LENGTH) {
                const shorten = value.substring(0, SHOW_MORE_LENGTH);
                const more = value.substring(SHOW_MORE_LENGTH + 1);
                return (
                  <td key={post.id + i}>
                    <span className="tbodyTDSpan">
                      <span>{shorten}</span>
                      <button
                        className="showMoreLessButton"
                        onClick={(event) => showMoreOrLess(event, more)}
                      >
                        Show more
                      </button>
                    </span>
                  </td>
                );
              }
            }
            return (
              <td key={post.id + i}>
                <span className="tbodyTDSpan">{tdValue}</span>
              </td>
            );
          })}
        </tr>
      );
    });
  }

  return (
    <div className="postTableDiv">
      {state.data && state.data.length === 0 ? (
        <Spinner animation="border" className="loader" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        ""
      )}
      <Table className="postTable" striped bordered hover responsive="xl">
        <thead>
          <tr>
            {state.data && state.data[0] !== undefined
              ? Object.keys(state.data[0]).map((key) => {
                  if (key === "sentimentScore") return "";
                  if (key === "id") return "";
                  return (
                    <th key={key} className="postTableTh">
                      {capitalizeFirstLetter(key)}
                    </th>
                  );
                })
              : ""}
          </tr>
        </thead>
        <tbody>{tbodyRender}</tbody>
      </Table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}
