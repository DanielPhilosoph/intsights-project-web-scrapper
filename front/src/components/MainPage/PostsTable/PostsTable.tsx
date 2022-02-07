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

  let tbodyRender;
  if (state.data) {
    tbodyRender = state.data.map((post) => {
      const keys = Object.keys(post);
      const values = Object.values(post);
      let tdValue: string = "";
      return (
        <tr key={post.date + post.title}>
          {keys.map((key, i) => {
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
