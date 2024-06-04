import React from "react";
import AddBook from "../AddBook";
import { useParams } from "react-router-dom";

const UserLayout = () => {
  const { userName } = useParams();

  return (
    <>
      <AddBook />
    </>
  );
};

export default UserLayout;
