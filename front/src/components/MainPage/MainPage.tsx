import React from "react";
import Header from "./Header/Header";
import PostsTable from "./PostsTable/PostsTable";
import { socket, SocketContext } from "../../socket/socket";

export default function MainPage() {
  return (
    <div>
      <SocketContext.Provider value={socket}>
        <Header />
        <PostsTable />
      </SocketContext.Provider>
    </div>
  );
}
