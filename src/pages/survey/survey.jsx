import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Card } from "antd";
import "./survey.css";

function Survey() {
  const Navigate = useNavigate();
  const surveyData = [
    {
      question: "What is your favorite color?",
      answers: ["Red", "Blue", "Green"],
    },
    {
      question: "Which programming language do you like the most?",
      answers: ["JavaScript", "Python", "Java"],
    },
    {
      question: "Which Frontend framework do you like the most?",
      answers: ["ReactJs", "NextJs", "VueJs"],
    },
    {
      question: "Which Backend framework do you like the most?",
      answers: ["Express", "Spring", "Django"],
    },
    {
      question: "Which mobile operating system do you prefer?",
      answers: ["iOS", "Android", "Other"],
    },
    {
      question: "What is your favorite food cuisine?",
      answers: ["Italian", "Mexican", "Chinese"],
    },
    {
      question: "How often do you exercise per week?",
      answers: ["Never", "1-2 times", "3-4 times"],
    },
    {
      question: "What type of music do you enjoy the most?",
      answers: ["Pop", "Rock", "Other"],
    },
    {
      question: "Which social media platform do you use most frequently?",
      answers: ["Facebook", "Instagram", "Twitter"],
    },
    {
      question: "What is your preferred mode of transportation?",
      answers: ["Car", "Bike", "Public transport"],
    },
  ];

  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState(0);
  const [timer, setTimer] = useState(() => {
    const storedTimer = parseInt(localStorage.getItem("timer") || "150", 10);
    return storedTimer > 0 ? storedTimer : 150;
  });
  const [selected, setSelected] = useState("");

  const checkAnswerExist = async () => {
    try {
      const existAnswer = await localStorage.getItem("answer");
      if (existAnswer.length !== 0) {
        setAnswers(JSON.parse(existAnswer));
        setQuestion(JSON.parse(existAnswer).length);
      }
    } catch (error) {}
  };

  const handleSubmit = async () => {
    if (selected) {
      const newAnswers = [...answers, selected];
      console.log(newAnswers);
      setAnswers(newAnswers);
      await localStorage.setItem("answer", JSON.stringify(newAnswers));

      setSelected("");
      if (question < surveyData.length - 1) {
        setQuestion((prevQuestion) => prevQuestion + 1);
      } else {
        toast.success("Survey completed!");
        handleFinish();
      }
    } else {
      toast("Please select an answer before moving to the next question.");
    }
  };

  const handleFinish = async () => {
    const finalAnswer = await localStorage.getItem("answer");
    // call api to save the result
    // then remove the localstorage
    await localStorage.removeItem("answer");
    await localStorage.removeItem("timer");
    setTimeout(() => {
      Navigate("/end");
    }, 1000);
  };

  const timeSet = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  };

  useEffect(() => {
    checkAnswerExist();
    timeSet();
  }, []);

  let checkIsValid = async () => {
    localStorage.setItem("timer", timer.toString());
    if (timer === 0) {
      await toast.error("Times Up!");
      await localStorage.removeItem("answer");
      await localStorage.removeItem("timer");
      setTimeout(() => {
        Navigate("/end");
      }, 1000);
    }
  };

  useEffect(() => {
    checkIsValid();
  }, [timer]);

  return (
    <div className="parent">
      <Toaster className='toaster' />
      <card className="card">
        <div>
          <h1>Q {question + 1}</h1>
        </div>
        <div className="content">
          <div className="question">
            <p>{surveyData[question].question}</p>
          </div>
          <div className="answers">
            {surveyData[question].answers.map((answer, index) => (
              <span>
                <input
                  type="radio"
                  value={answer}
                  checked={selected === answer} // Check if this answer is selected
                  onChange={() => setSelected(answer)}
                />
                {answer}
              </span>
            ))}
            {question === surveyData.length - 1 ? (
              <button onClick={handleSubmit}>Finish</button>
            ) : (
              <button onClick={handleSubmit}>Next</button>
            )}
          </div>
        </div>
        <div className="timer">
          <p>
            Time left: {Math.floor(timer / 60)}:{timer % 60}
          </p>
        </div>
      </card>
    </div>
  );
}

export default Survey;
