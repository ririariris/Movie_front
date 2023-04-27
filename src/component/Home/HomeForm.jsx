import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate("/");
    }
  }, [navigate]);

  return <div></div>;
};

export default HomeForm;
