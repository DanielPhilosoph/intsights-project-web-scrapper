import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import "./postsTable.css";

import { updateData } from "../../../reduxActions/actions";
import { socket } from "../../../socket/socket";
import { formatDate } from "../../../helper/functions";

export default function PostsTable() {
  const state: StateType = useSelector((state: StateType) => state);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    socket.on("strongW2ise", (data) => {
      console.log(data);

      if (!data.error) {
        updateData(dispatch, data.data);
      } else {
        console.log(data.error);
      }
    });
  }, []);
  console.log(state.data && state.data[0] ? state.data[0]["Content"] : "");
  const tbodyRender = state.data
    ? state.data.map((post) => {
        const keys = Object.keys(post);
        const values = Object.values(post);

        return (
          <tr key={post.Date + post.Title}>
            {keys.map((key, i) => {
              if (key === "Date") {
                console.log(formatDate(post[key]).date);

                if (formatDate(post[key]).date) {
                  //* If managed to format
                  return (
                    <td key={post.Date + i}>{formatDate(post[key]).date}</td>
                  );
                }
                return <td key={post.Date + i}>{post[key]}</td>;
              }
              return (
                <td key={post.Date + i}>
                  <span className="tbodyTDSpan">{values[i]}</span>
                </td>
              );
            })}
          </tr>
        );
      })
    : "";

  return (
    <div className="portTableDiv">
      <Table className="portTable" striped bordered hover responsive="xl">
        <thead>
          <tr>
            {state.data && state.data[0] !== undefined
              ? Object.keys(state.data[0]).map((key) => {
                  return <th key={key}>{key}</th>;
                })
              : ""}
          </tr>
        </thead>
        <tbody>{tbodyRender}</tbody>
      </Table>
    </div>
  );
}
