import React from "react";
import List from "../List";
import AddBook from "../AddBook";
import { useParams } from "react-router-dom";

const UserLayout = () => {
  const { userName } = useParams();

  console.log(userName);

  return (
    <>
      {/*<List />*/}
      <AddBook />
    </>
  );
};

export default UserLayout;
