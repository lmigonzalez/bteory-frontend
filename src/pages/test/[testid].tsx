import { AxiosHeaders } from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { globalState } from "~/Store";
// pages/category/index.tsx
const CategoryIndexPage = () => {
  const {
    query: { testid },
  } = useRouter();

  const { test, setTest } = globalState();

  useEffect(() => {
    void setTest(testid as string, new AxiosHeaders());
  }, []);

  return (
    <div>
      {" "}
      {
        // questions
        test.explanation.toString()
      }{" "}
    </div>
  );
};

export default CategoryIndexPage; // pero bro que calificacion le das a las practicas que ves aqui?
// aver, deja revisar
