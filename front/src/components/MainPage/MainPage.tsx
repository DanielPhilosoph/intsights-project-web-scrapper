import React from "react";
import Header from "./Header/Header";
import PostsTable from "./PostsTable/PostsTable";
import Search from "./Search/Seach";

export default function MainPage() {
  return (
    <div>
      <Header />
      <Search />
      <PostsTable />
    </div>
  );
}
