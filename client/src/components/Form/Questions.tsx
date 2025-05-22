import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import questionBank from "../../utils/questionbank";
import axios from "axios";

const Questions = () => {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [answers, setAnswers] = useState<{ title: string; answer: string }[]>(
    []
  );

  const indexHandler = async () => {
    const newAnswer = {
      title: questionBank[index].title,
      answer: value,
    };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    setIndex(index + 1);
    setValue("");

    if (index === questionBank.length - 1) {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/v1/add/question`,
          { questionsAnswers: updatedAnswers }
        );

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <section className="w-[30rem] mx-auto mt-8 py-4">
        {index <= questionBank.length - 1 ? (
          <>
            <h1 className="text-2xl">{questionBank[index].title}</h1>
            <div className="py-3">
              <Input
                type="text"
                placeholder="Answer"
                value={value}
                className="focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:ring-offset-0"
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <Button
              onClick={indexHandler}
              className="hover:bg-slate-50 hover:text-neutral-950 transition duration-200 cursor-pointer"
            >
              {index === questionBank.length - 1 ? "Submit" : "Ok"}
            </Button>
          </>
        ) : (
          <div>
            <h1 className="text-3xl text-start pb-4">Answers Given-:</h1>
            {answers.map((ans, index) => {
              return (
                <h3
                  className="text-xl font-medium text-start py-2"
                  key={questionBank[index].id}
                >
                  {questionBank[index].title} = {ans.answer}
                </h3>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default Questions;
