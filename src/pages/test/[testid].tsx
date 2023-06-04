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
  console.log(test);
  return (
    <div>
      {" "}
      {
        // questions
        test.explanation.map((item) => {})
      }{" "}
    </div>
  );
};

export default CategoryIndexPage;
