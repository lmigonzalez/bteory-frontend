import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllQuestions } from "../../axios";
import Layout from "~/components/Layout";
import { AiOutlineArrowLeft, AiFillDelete } from "react-icons/ai";
interface Question {
  _id: string;
  options: [string];
  category: string;
  complexity: string;
  answer: string;
  question: string;
  explanation: [
    { type: string; content: string; images: string; explanation: string }
  ];
}

const MyComponent: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionData, setQuestionData] = useState<Question | null>(null);

  useEffect(() => {
    const fetchQuestionData = async () => {
      if (id && questions.length > 0) {
        const selectedQuestion = findQuestionById(questions);
        setQuestionData(selectedQuestion);
      } else {
        await fetchAllQuestions();
      }
    };

    fetchQuestionData();
  }, [id, questions]);

  const fetchAllQuestions = async () => {
    try {
      const response = await getAllQuestions();
      const selectedQuestion = findQuestionById(response);
      setQuestionData(selectedQuestion);
    } catch (err) {
      console.log(err);
    }
  };

  function deleteQuestion() {}

  const findQuestionById = (questions: Question[]): Question | null => {
    return questions.find((question) => question._id === id) || null;
  };

  console.log(questionData);

  return (
    <Layout name="Admin Question">
      <div className="mt-6 flex justify-between border-b-[2px] border-my_black pb-3">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-between text-xl text-my_blue "
        >
          {" "}
          <AiOutlineArrowLeft /> Back
        </button>

        <button
          onClick={deleteQuestion}
          className="transition-all hover:-translate-y-1"
        >
          <AiFillDelete size={25} fill="#EA5455" />
        </button>
      </div>
      {questionData && (
        <div className="">
          <strong>Question:</strong>
          <p className="mb-4">{questionData?.question}</p>
          <strong>Options:</strong>
          <ul className="mb-4">
            {questionData?.options?.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
          <strong>Answer:</strong>
          <p className="mb-4">{questionData?.answer}</p>
          <strong>Category:</strong>
          <p className="mb-4">{questionData?.category}</p>
          <strong>Complexity:</strong>
          <p className="mb-4">{questionData?.complexity}</p>

          <div>
            <strong>Explanation:</strong>

            <ul className="space-y-4">
              {questionData.explanation.map((item, index) => {
                return item.type === "image" ? (
                  <li key={index}>
                    <Image src={item.content} alt="" width={200} height={200} />
                  </li>
                ) : (
                  <li>
                    <p>{item.explanation}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      <div></div>
    </Layout>
  );
};

export default MyComponent;
