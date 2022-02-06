import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import "./postsTable.css";

import { updateData } from "../../../reduxActions/actions";
import { socket } from "../../../socket/socket";

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
  return (
    <div className="portTableDiv">
      <Table className="portTable" striped bordered hover responsive="xl">
        <thead>
          <tr>
            {state.data && state.data[0] !== undefined
              ? Object.keys(state.data[0]).map((key) => {
                  if (key !== "id") {
                    return <th key={key}>{key}</th>;
                  }
                  return "";
                })
              : ""}
          </tr>
        </thead>
        <tbody>
          {state.data
            ? state.data.map((post) => {
                const { id, ...restPost } = post;
                return (
                  <tr key={id}>
                    {Object.values(restPost).map((property, i) => {
                      return <td key={id + i}>{property}</td>;
                    })}
                  </tr>
                );
              })
            : ""}
        </tbody>
      </Table>
    </div>
  );
}
