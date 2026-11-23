import React, { useState } from "react";


function Test() {

  const questions = [

    {
      question:
      "1. Which type of work do you enjoy the most?",

      options:[
        "Building AI Applications",
        "Creating Websites",
        "Designing User Interfaces",
        "Testing Software Quality"
      ]
    },

    {
      question:
      "2. What excites you while learning technology?",

      options:[
        "Machine Learning & AI",
        "Frontend Development",
        "Backend APIs",
        "Cyber Security"
      ]
    },

    {
      question:
      "3. Which activity do you prefer in projects?",

      options:[
        "Coding & Logic",
        "UI Designing",
        "Debugging Errors",
        "Data Analysis"
      ]
    },

    {
      question:
      "4. Which programming language interests you most?",

      options:[
        "Python",
        "JavaScript",
        "Java",
        "C++"
      ]
    },

    {
      question:
      "5. What kind of problems do you enjoy solving?",

      options:[
        "AI Predictions",
        "Website Performance",
        "Testing Bugs",
        "Database Management"
      ]
    },

    {
      question:
      "6. Which environment suits you best?",

      options:[
        "Creative Innovation",
        "Team Collaboration",
        "Research & Analysis",
        "System Automation"
      ]
    },

    {
      question:
      "7. Which tool would you like to work with?",

      options:[
        "TensorFlow",
        "React",
        "Node.js",
        "Selenium"
      ]
    },

    {
      question:
      "8. What type of apps do you like?",

      options:[
        "AI Chatbots",
        "E-Commerce Websites",
        "Mobile Apps",
        "Cloud Platforms"
      ]
    },

    {
      question:
      "9. Which career sounds most exciting?",

      options:[
        "ML Engineer",
        "Frontend Developer",
        "Backend Developer",
        "QA Engineer"
      ]
    },

    {
      question:
      "10. Which skill is your strongest?",

      options:[
        "Logical Thinking",
        "Creativity",
        "Communication",
        "Testing & Analysis"
      ]
    },

    {
      question:
      "11. How do you approach learning?",

      options:[
        "Research Deeply",
        "Practice Projects",
        "Visual Learning",
        "Testing Experiments"
      ]
    },

    {
      question:
      "12. Which project would you build first?",

      options:[
        "AI Career Chatbot",
        "Portfolio Website",
        "Online Shopping App",
        "Automation Testing Tool"
      ]
    }

  ];

  const [answers, setAnswers] = useState([]);

  const [result, setResult] = useState("");

  const handleSelect = (index, option) => {

    const updatedAnswers = [...answers];

    updatedAnswers[index] = option;

    setAnswers(updatedAnswers);
  };

  const submitTest = () => {

    if(answers.length < questions.length){

      alert(
        "Please answer all questions"
      );

      return;
    }

    let aiScore = 0;

    let webScore = 0;

    let qaScore = 0;

    answers.forEach((answer)=>{

      if(
        answer.includes("AI") ||
        answer.includes("Machine") ||
        answer.includes("TensorFlow") ||
        answer.includes("Python") ||
        answer.includes("ML")
      ){

        aiScore++;
      }

      if(
        answer.includes("React") ||
        answer.includes("Frontend") ||
        answer.includes("Website") ||
        answer.includes("Node")
      ){

        webScore++;
      }

      if(
        answer.includes("Testing") ||
        answer.includes("QA") ||
        answer.includes("Selenium")
      ){

        qaScore++;
      }

    });

    if(
      aiScore >= webScore &&
      aiScore >= qaScore
    ){

      setResult(

        "🤖 Recommended Career: AI / ML Engineer"

      );
    }

    else if(
      webScore >= aiScore &&
      webScore >= qaScore
    ){

      setResult(

        "🌐 Recommended Career: Full Stack Web Developer"

      );
    }

    else{

      setResult(

        "🧪 Recommended Career: QA / Testing Engineer"

      );
    }

  };

  return (

    <div className="test-container">

      <h1>
        🧠 Advanced Career Test
      </h1>

      <p className="subtitle">

        Answer these questions to discover
        your best technology career path

      </p>

      {
        questions.map((q,index)=>(

          <div
            className="question-card"
            key={index}
          >

            <h3>
              {q.question}
            </h3>

            <div className="options">

              {
                q.options.map((option,i)=>(

                  <button
                    key={i}

                    className={
                      answers[index] === option
                      ? "selected"
                      : ""
                    }

                    onClick={()=>
                      handleSelect(index,option)
                    }
                  >

                    {option}

                  </button>

                ))
              }

            </div>

          </div>

        ))
      }

      <button
        className="submit-btn"
        onClick={submitTest}
      >

        Submit Career Test

      </button>

      {
        result &&

        <div className="result-box">

          <h2>
            {result}
          </h2>

          <p>

            Based on your interests,
            strengths and career preferences,
            this domain suits you best.

          </p>

        </div>
      }

    </div>
  );
}

export default Test;