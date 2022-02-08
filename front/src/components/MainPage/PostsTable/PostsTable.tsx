import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./postsTable.css";

import { formatDate } from "../../../helper/functions";

export default function PostsTable() {
  const state: StateType = useSelector((state: StateType) => state);
  const [data, setData] = useState<StrongW2iseType[]>([]);

  const onThClick = (event: React.MouseEvent) => {
    if (data.length === 0) {
      setData(dataToRender);
    }
    if (event.target instanceof HTMLTableCellElement) {
      switch (event.target.textContent) {
        case "date":
          setData((prevData) => [
            ...prevData.sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            }),
          ]);
          break;
        case "author":
          setData((prevData) => [
            ...prevData.sort((a, b) => {
              if (a.author < b.author) {
                return -1;
              }
              if (a.author > b.author) {
                return 1;
              }
              return 0;
            }),
          ]);
          break;
        case "title":
          setData((prevData) => [
            ...prevData.sort((a, b) => {
              if (a.title < b.title) {
                return -1;
              }
              if (a.title > b.title) {
                return 1;
              }
              return 0;
            }),
          ]);
          break;
        default:
          return "";
      }
    }
  };

  let dataToRender: StrongW2iseType[];
  let tbodyRender;
  if (state.data) {
    //* Filler with the search param (from state)
    dataToRender =
      data.length === 0
        ? state.data.filter(
            (post) =>
              post.title.toLowerCase().includes(state.search.toLowerCase()) ||
              post.content.toLowerCase().includes(state.search.toLowerCase())
          )
        : data.filter(
            (post) =>
              post.title.toLowerCase().includes(state.search.toLowerCase()) ||
              post.content.toLowerCase().includes(state.search.toLowerCase())
          );

    //* Render data
    tbodyRender = dataToRender.map((post) => {
      const keys = Object.keys(post);
      const values = Object.values(post);
      let tdValue: string = "";
      return (
        <tr key={post.date + post.title}>
          {keys.map((key, i) => {
            //? Dont show sentimentScore
            if (key === "sentimentScore") return "";
            if (key === "date") {
              const formattedDate = formatDate(post[key]).date;
              //* Date formatting
              tdValue = formattedDate !== undefined ? formattedDate : post[key];
            } else {
              tdValue = values[i];
            }
            return (
              <td key={post.date + i}>
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
      <Table className="postTable" striped bordered hover responsive="xl">
        <thead>
          <tr>
            {state.data && state.data[0] !== undefined
              ? Object.keys(state.data[0]).map((key) => {
                  //? Dont show sentimentScore
                  if (key === "sentimentScore") return "";
                  return (
                    <th key={key} className="postTableTh" onClick={onThClick}>
                      {key}
                    </th>
                  );
                })
              : ""}
          </tr>
        </thead>
        <tbody>{tbodyRender}</tbody>
      </Table>
    </div>
  );
}
