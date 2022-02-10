import React, { useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./postsTable.css";
import ReactPaginate from "react-paginate";

import { formatDate } from "../../../helper/functions";

export default function PostsTable() {
  const state: StateType = useSelector((state: StateType) => state);
  const [pageNumber, setPageNumber] = useState(0);

  const postsPerPage = 10;
  const pagesVisited = pageNumber * postsPerPage;

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  let dataToRender: StrongW2iseType[];
  let tbodyRender;
  let pageCount = 0;

  if (state.data) {
    //* Filler with the search param (from state)
    dataToRender = state.data.filter(
      (post) =>
        post.title.toLowerCase().includes(state.search.toLowerCase()) ||
        post.content.toLowerCase().includes(state.search.toLowerCase())
    );

    //? Set page count for paginate
    pageCount = Math.ceil(dataToRender.length / postsPerPage);

    //? At first render, filter by date
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
                  //? Dont show sentimentScore
                  if (key === "sentimentScore") return "";
                  if (key === "id") return "";
                  return (
                    <th key={key} className="postTableTh">
                      {key}
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
