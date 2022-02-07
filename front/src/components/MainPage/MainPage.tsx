import React from "react";
import Header from "./Header/Header";
import PostsTable from "./PostsTable/PostsTable";

export default function MainPage() {
  return (
    <div>
      <Header />
      <PostsTable />
    </div>
  );
}
