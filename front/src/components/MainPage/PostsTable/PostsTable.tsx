import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { updateData } from "../../../reduxActions/actions";

export default function PostsTable() {
  const state: StateType = useSelector((state: StateType) => state);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    async function getPosts() {
      updateData(dispatch);
    }
    getPosts();
  }, []);
  return (
    <div>
      <Table striped bordered hover>
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
