import { useState } from "react";
import { Button } from "../ui/button";
import questionBank from "../../utils/questionbank";
import axios from "axios";
import {
  ChevronLeft,
  ChevronUp,
  CornerDownLeft,
  ArrowRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Questions = () => {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [answers, setAnswers] = useState<{ title: string; answer: string }[]>(
    []
  );

  const indexHandler = async () => {
    if (value === "") return;

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

  const reduceIndexHandler = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      indexHandler();
    }
  };

  return (
    <>
      <section className="h-screen">
        <div className="w-full h-9/10 flex items-center justify-center py-4">
          {index <= questionBank.length - 1 ? (
            <>
              <div className="w-full sm:w-2/3 md:w-1/2 px-6 sm:px-0 flex items-start gap-4">
                <div className="grow-0 flex items-center gap-2">
                  <span className="text-lg text-zinc-500">{index + 1}</span>
                  <ArrowRight size={20} className="text-zinc-500" />
                </div>
                <div className="grow-1 w-full flex flex-col items-start">
                  <h1 className="w-full text-2xl text-zinc-600">
                    {questionBank[index].title}
                  </h1>
                  <div className="py-3 w-full">
                    {questionBank[index].type === "input" ? (
                      <input
                        type="text"
                        placeholder="Type your answer here..."
                        value={value}
                        className="w-full outline-0 border-b-2 focus:border-b-zinc-600 py-3 transition duration-100 text-2xl sm:text-3xl text-zinc-500"
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKey}
                      />
                    ) : (
                      // <select
                      //   id="selectedAns"
                      //   className="w-full outline-0 border-b-2 focus:border-b-zinc-600 py-3 transition duration-100 text-2xl sm:text-xl text-zinc-500"
                      //   onChange={(e) => setValue(e.target.value)}
                      // >
                      //   {questionBank[index].options?.map((opt, index) => {
                      //     return (
                      //       <option
                      //         key={index}
                      //         value={opt}
                      //         className="py-5 bg-gray-300 border-2 hover:bg-gray-200"
                      //       >
                      //         {opt}
                      //       </option>
                      //     );
                      //   })}
                      // </select>
                      <Select onValueChange={(val) => setValue(val)}>
                        <SelectTrigger className="w-full outline-0 border-0 rounded-none border-b-2 focus:border-b-zinc-600 py-3 transition duration-100 text-2xl sm:text-xl text-zinc-500">
                          <SelectValue
                            placeholder="Select an option.."
                            className="py-3"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {questionBank[index].options?.map((opt, index) => {
                              return (
                                <SelectItem
                                  key={index}
                                  value={opt}
                                  className="py-3 text-xl sm:text-xl text-zinc-900"
                                >
                                  {opt}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={indexHandler}
                      className="cursor-pointer bg-zinc-600 hover:bg-zinc-600 text-xl rounded-sm px-4 py-5 hidden sm:flex"
                    >
                      {index === questionBank.length - 1 ? "Submit" : "OK"}
                    </Button>
                    <div className="flex items-center gap-2">
                      <p className="text-sm">
                        press <span className="font-medium">Enter</span>
                      </p>
                      <CornerDownLeft width={16} height={18} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
              <h3 className="text-xl font-medium text-center py-2">
                Thank you for providing your information. We will get in touch
                with you shortly.
              </h3>
            </div>
          )}
        </div>

        <div className="h-1/10 w-full flex items-center justify-center gap-3">
          {index <= questionBank.length - 1 && (
            <>
              <button
                className="cursor-pointer bg-zinc-600 hover:bg-zinc-600 rounded-sm px-4 py-1 hidden sm:block sm:w-fit"
                onClick={reduceIndexHandler}
              >
                <ChevronUp width={32} height={32} color="white" />
              </button>{" "}
              <button
                className="cursor-pointer bg-zinc-600 hover:bg-zinc-600 rounded-sm px-4 py-1 block sm:hidden w-fit"
                onClick={reduceIndexHandler}
              >
                <ChevronLeft width={32} height={32} color="white" />
              </button>
              <Button
                className="text-2xl cursor-pointer bg-zinc-600 hover:bg-zinc-600 rounded-sm px-4 py-5 sm:hidden w-3/5 flex items-center"
                onClick={indexHandler}
              >
                {index === questionBank.length - 1 ? "Submit" : "OK"}
              </Button>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Questions;
