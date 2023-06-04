import { AxiosHeaders } from "axios";
import React, { type FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { type QuestionType, type TestType, getTest } from "~/axios";
import Layout from "~/components/Layout";
import { globalState } from "~/Store";

const Test: FC = () => {
  const router = useRouter();
  const { test } = router.query;

  const { questions, getQuestions } = globalState();

  return <Layout></Layout>;
};

export default Test;
