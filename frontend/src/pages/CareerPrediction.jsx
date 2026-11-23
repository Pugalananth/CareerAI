import React, {
  useState
} from "react";

import { motion } from "framer-motion";

import axios from "axios";


const careerData = {

  "Artificial Intelligence": {
    python:1, ml:1, web:0,
    scope:"Very High Demand",
    salary:"₹12 LPA",
    skills:["Python","Deep Learning","TensorFlow"],
    platforms:["Coursera","Udemy","LeetCode"]
  },

  "Web Development": {
    python:0, ml:0, web:1,
    scope:"High Demand",
    salary:"₹10 LPA",
    skills:["React","Node.js","MongoDB"],
    platforms:["freeCodeCamp","Udemy","YouTube"]
  },

  "Data Science": {
    python:1, ml:1, web:0,
    scope:"Very High Demand",
    salary:"₹14 LPA",
    skills:["Python","Pandas","Machine Learning"],
    platforms:["Kaggle","Coursera","DataCamp"]
  },

  "Cloud Computing": {
    python:1, ml:0, web:0,
    scope:"Very High Demand",
    salary:"₹13 LPA",
    skills:["AWS","Docker","Kubernetes"],
    platforms:["AWS Academy","Udemy","Coursera"]
  },

  "Cyber Security": {
    python:1, ml:0, web:0,
    scope:"Very High Demand",
    salary:"₹11 LPA",
    skills:["Networking","Ethical Hacking","Linux"],
    platforms:["TryHackMe","HackTheBox","Udemy"]
  },

  "Mobile Development": {
    python:0, ml:0, web:1,
    scope:"High Demand",
    salary:"₹9 LPA",
    skills:["Flutter","React Native","Firebase"],
    platforms:["Udemy","YouTube","Coursera"]
  },

  "UI UX Design": {
    python:0, ml:0, web:1,
    scope:"High Demand",
    salary:"₹8 LPA",
    skills:["Figma","Adobe XD","Wireframing"],
    platforms:["Coursera","YouTube","Skillshare"]
  },

  "DevOps Engineer": {
    python:1, ml:0, web:0,
    scope:"Very High Demand",
    salary:"₹15 LPA",
    skills:["Docker","CI/CD","Kubernetes"],
    platforms:["Udemy","AWS Academy","Coursera"]
  },

  "Blockchain Developer": {
    python:1, ml:0, web:1,
    scope:"Growing Demand",
    salary:"₹18 LPA",
    skills:["Solidity","Ethereum","Web3"],
    platforms:["Alchemy","Udemy","YouTube"]
  },

  "Game Developer": {
    python:0, ml:0, web:0,
    scope:"High Demand",
    salary:"₹9 LPA",
    skills:["Unity","C#","Unreal Engine"],
    platforms:["Udemy","Unity Learn","YouTube"]
  },

  "Software Engineer": {
    python:1, ml:0, web:1,
    scope:"Very High Demand",
    salary:"₹12 LPA",
    skills:["Java","DSA","System Design"],
    platforms:["LeetCode","GeeksforGeeks","Coursera"]
  },

  "Backend Developer": {
    python:1, ml:0, web:1,
    scope:"High Demand",
    salary:"₹11 LPA",
    skills:["Node.js","Express","MongoDB"],
    platforms:["Udemy","freeCodeCamp","YouTube"]
  },

  "Frontend Developer": {
    python:0, ml:0, web:1,
    scope:"High Demand",
    salary:"₹9 LPA",
    skills:["HTML","CSS","React"],
    platforms:["freeCodeCamp","YouTube","Udemy"]
  },

  "Machine Learning Engineer": {
    python:1, ml:1, web:0,
    scope:"Very High Demand",
    salary:"₹16 LPA",
    skills:["TensorFlow","Scikit-learn","Python"],
    platforms:["Coursera","Kaggle","Udemy"]
  },

  "Full Stack Developer": {
    python:1, ml:0, web:1,
    scope:"Very High Demand",
    salary:"₹13 LPA",
    skills:["React","Node.js","MongoDB"],
    platforms:["Udemy","freeCodeCamp","YouTube"]
  },

  "Database Administrator": {
    python:0, ml:0, web:0,
    scope:"High Demand",
    salary:"₹10 LPA",
    skills:["SQL","Oracle","MongoDB"],
    platforms:["Oracle Academy","Udemy","Coursera"]
  },

  "Network Engineer": {
    python:0, ml:0, web:0,
    scope:"High Demand",
    salary:"₹9 LPA",
    skills:["CCNA","Networking","Linux"],
    platforms:["Cisco","Udemy","YouTube"]
  },

  "AI Researcher": {
    python:1, ml:1, web:0,
    scope:"Very High Demand",
    salary:"₹20 LPA",
    skills:["Deep Learning","Research","Python"],
    platforms:["Coursera","Arxiv","Kaggle"]
  },

  "Ethical Hacker": {
    python:1, ml:0, web:0,
    scope:"Very High Demand",
    salary:"₹12 LPA",
    skills:["Penetration Testing","Linux","Networking"],
    platforms:["TryHackMe","HackTheBox","Udemy"]
  },

  "QA Engineer": {
    python:0, ml:0, web:1,
    scope:"High Demand",
    salary:"₹8 LPA",
    skills:["Testing","Automation","Selenium"],
    platforms:["Udemy","Coursera","YouTube"]
  },
  "Prompt Engineer": {
  python:1, ml:1, web:0,
  scope:"Very High Demand",
  salary:"₹18 LPA",
  skills:["Prompt Engineering","LLM","AI Tools"],
  platforms:["OpenAI","Coursera","YouTube"]
},

"Data Analyst": {
  python:1, ml:0, web:0,
  scope:"Very High Demand",
  salary:"₹9 LPA",
  skills:["Excel","SQL","Power BI"],
  platforms:["DataCamp","Coursera","Udemy"]
},

"Business Analyst": {
  python:0, ml:0, web:0,
  scope:"High Demand",
  salary:"₹10 LPA",
  skills:["Excel","Communication","Analytics"],
  platforms:["Coursera","Udemy","YouTube"]
},

"Android Developer": {
  python:0, ml:0, web:1,
  scope:"High Demand",
  salary:"₹11 LPA",
  skills:["Kotlin","Android Studio","Firebase"],
  platforms:["Udemy","YouTube","Google"]
},

"iOS Developer": {
  python:0, ml:0, web:1,
  scope:"High Demand",
  salary:"₹12 LPA",
  skills:["Swift","Xcode","iOS UI"],
  platforms:["Apple","Udemy","Coursera"]
},

"AR VR Developer": {
  python:0, ml:0, web:0,
  scope:"Growing Demand",
  salary:"₹14 LPA",
  skills:["Unity","ARCore","3D Design"],
  platforms:["Unity Learn","Udemy","YouTube"]
},

"Robotics Engineer": {
  python:1, ml:1, web:0,
  scope:"High Demand",
  salary:"₹15 LPA",
  skills:["ROS","Python","Embedded Systems"],
  platforms:["Coursera","Udemy","MIT OpenCourseWare"]
},

"IoT Engineer": {
  python:1, ml:0, web:0,
  scope:"High Demand",
  salary:"₹12 LPA",
  skills:["Arduino","Sensors","Networking"],
  platforms:["Udemy","Coursera","YouTube"]
},

"Embedded Systems Engineer": {
  python:0, ml:0, web:0,
  scope:"High Demand",
  salary:"₹13 LPA",
  skills:["C","Microcontrollers","Electronics"],
  platforms:["NPTEL","Udemy","Coursera"]
},

"SAP Developer": {
  python:0, ml:0, web:0,
  scope:"Very High Demand",
  salary:"₹16 LPA",
  skills:["SAP ABAP","ERP","SAP HANA"],
  platforms:["SAP Learning","Udemy","OpenSAP"]
},

"Salesforce Developer": {
  python:0, ml:0, web:1,
  scope:"Very High Demand",
  salary:"₹15 LPA",
  skills:["Apex","Lightning","CRM"],
  platforms:["Trailhead","Udemy","Coursera"]
},

"Power BI Developer": {
  python:0, ml:0, web:0,
  scope:"High Demand",
  salary:"₹10 LPA",
  skills:["Power BI","SQL","Visualization"],
  platforms:["Microsoft Learn","Udemy","Coursera"]
},

"Linux Administrator": {
  python:1, ml:0, web:0,
  scope:"High Demand",
  salary:"₹11 LPA",
  skills:["Linux","Shell Scripting","Servers"],
  platforms:["RedHat","Udemy","YouTube"]
},

"Site Reliability Engineer": {
  python:1, ml:0, web:0,
  scope:"Very High Demand",
  salary:"₹17 LPA",
  skills:["Kubernetes","Cloud","Automation"],
  platforms:["Google Cloud","Udemy","Coursera"]
},

"Automation Engineer": {
  python:1, ml:0, web:1,
  scope:"High Demand",
  salary:"₹11 LPA",
  skills:["Selenium","Python","Testing"],
  platforms:["Udemy","Coursera","YouTube"]
},

"SEO Specialist": {
  python:0, ml:0, web:1,
  scope:"Growing Demand",
  salary:"₹7 LPA",
  skills:["SEO","Google Analytics","Marketing"],
  platforms:["HubSpot","Coursera","YouTube"]
},

"Digital Marketing Specialist": {
  python:0, ml:0, web:1,
  scope:"Very High Demand",
  salary:"₹8 LPA",
  skills:["SEO","Ads","Content Marketing"],
  platforms:["Google","HubSpot","Udemy"]
},

"Product Manager": {
  python:0, ml:0, web:0,
  scope:"Very High Demand",
  salary:"₹20 LPA",
  skills:["Management","Analytics","Leadership"],
  platforms:["Coursera","Udemy","PM School"]
},

"UI Developer": {
  python:0, ml:0, web:1,
  scope:"High Demand",
  salary:"₹9 LPA",
  skills:["HTML","CSS","JavaScript"],
  platforms:["freeCodeCamp","YouTube","Udemy"]
},

"Computer Vision Engineer": {
  python:1, ml:1, web:0,
  scope:"Very High Demand",
  salary:"₹18 LPA",
  skills:["OpenCV","Deep Learning","Python"],
  platforms:["Coursera","Udemy","Kaggle"]
},

"NLP Engineer": {
  python:1, ml:1, web:0,
  scope:"Very High Demand",
  salary:"₹19 LPA",
  skills:["Transformers","Python","LLMs"],
  platforms:["HuggingFace","Coursera","Kaggle"]
},

"Big Data Engineer": {
  python:1, ml:0, web:0,
  scope:"Very High Demand",
  salary:"₹17 LPA",
  skills:["Hadoop","Spark","Kafka"],
  platforms:["Udemy","Coursera","DataCamp"]
},

"Penetration Tester": {
  python:1, ml:0, web:0,
  scope:"Very High Demand",
  salary:"₹14 LPA",
  skills:["Kali Linux","Networking","Security"],
  platforms:["TryHackMe","HackTheBox","Udemy"]
},

"Technical Support Engineer": {
  python:0, ml:0, web:0,
  scope:"High Demand",
  salary:"₹6 LPA",
  skills:["Troubleshooting","Networking","Support"],
  platforms:["Cisco","Coursera","Udemy"]
},

"AI Trainer": {
  python:1, ml:1, web:0,
  scope:"Growing Demand",
  salary:"₹13 LPA",
  skills:["AI Models","Prompting","Annotation"],
  platforms:["OpenAI","Coursera","Udemy"]
},

"Generative AI Engineer": {
  python:1, ml:1, web:0,
  scope:"Extremely High Demand",
  salary:"₹25 LPA",
  skills:["LLMs","LangChain","Python"],
  platforms:["DeepLearning.AI","OpenAI","Coursera"]
},

"Bioinformatics Engineer": {
  python:1, ml:1, web:0,
  scope:"Growing Demand",
  salary:"₹14 LPA",
  skills:["Biology","Python","Data Analysis"],
  platforms:["Coursera","edX","Udemy"]
},

"Financial Analyst": {
  python:0, ml:0, web:0,
  scope:"High Demand",
  salary:"₹10 LPA",
  skills:["Excel","Finance","Analytics"],
  platforms:["Coursera","Udemy","CFI"]
},

"Tech Recruiter": {
  python:0, ml:0, web:0,
  scope:"High Demand",
  salary:"₹8 LPA",
  skills:["Communication","Hiring","HR"],
  platforms:["LinkedIn Learning","Coursera","Udemy"]
},
  

};

function CareerPrediction() {

  const [interest,setInterest] = useState("");

  const [data,setData] = useState(null);

  const [career,setCareer] = useState("");

  const [percentage,setPercentage] = useState("");

  // Handle Career Selection

  const handleCareerSelect = async(item)=>{

    try{

      const res = await axios.post(

        "http://127.0.0.1:5000/predict-career",

        {

          user: localStorage.getItem("user"),

          python: careerData[item].python,

          ml: careerData[item].ml,

          web: careerData[item].web

        }

      );

      await axios.post(

        "http://127.0.0.1:5000/track-activity",

        {

          user: localStorage.getItem("user"),

          feature: "Career Prediction"

        }

      );

      setCareer(res.data.career);

      setPercentage(res.data.percentage);

      setData(careerData[item]);

    }

    catch(err){

      console.log(err);

      alert("Career prediction failed");

    }

  };

  return (

    <div className="min-h-screen gradient-bg pt-28 px-4 pb-12">

      <motion.div

        initial={{opacity:0,y:30}}

        animate={{opacity:1,y:0}}

        className="glass w-full max-w-4xl mx-auto p-6 rounded-3xl"

      >

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl mx-auto mb-4 shadow-xl">

            🚀

          </div>

          <h1 className="text-3xl md:text-4xl font-black gradient-text mb-3">

            Career Prediction

          </h1>

          <p className="text-slate-400 text-sm">

            Explore career opportunities using AI prediction

          </p>

        </div>

        {/* SEARCH */}

        <input

          type="text"

          placeholder="Search career interest..."

          value={interest}

          onChange={(e)=>setInterest(e.target.value)}

          className="w-full p-3 rounded-2xl bg-slate-800/60 border border-slate-700 outline-none text-white text-sm mb-6"

        />

        {/* CAREER OPTIONS */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">

          {Object.keys(careerData)

            .filter((item)=>

              item.toLowerCase().includes(

                interest.toLowerCase()

              )

            )

            .map((item,i)=>(

              <button

                key={i}

                onClick={()=>handleCareerSelect(item)}

                className="glass hover:bg-indigo-500/20 transition duration-300 p-3 rounded-2xl text-white text-sm font-medium"

              >

                {item}

              </button>

            ))}

        </div>

        {/* RESULT */}

        {data && (

          <motion.div

            initial={{opacity:0}}

            animate={{opacity:1}}

            className="space-y-4"

          >

            {/* MAIN INFO */}

            <div className="glass p-5 rounded-3xl">

              <div className="flex flex-col md:flex-row justify-between items-center gap-5">

                <div>

                  <h2 className="text-2xl font-bold text-cyan-300 mb-3">

                    🚀 {career}

                  </h2>

                  <p className="text-sm text-slate-300 mb-2">

                    📈 Future Scope: {data.scope}

                  </p>

                  <p className="text-sm text-slate-300">

                    💰 Average Salary: {data.salary}

                  </p>

                </div>

                {/* MATCH SCORE */}

                <div className="w-20 h-20 rounded-full border-4 border-indigo-400 flex items-center justify-center">

                  <span className="text-xl font-bold text-indigo-300">

                    {percentage}%

                  </span>

                </div>

              </div>

            </div>

            {/* SKILLS */}

            <div className="glass p-5 rounded-3xl">

              <h3 className="text-lg font-bold mb-4 text-white">

                🛠 Required Skills

              </h3>

              <div className="flex flex-wrap gap-2">

                {data.skills.map((skill,i)=>(

                  <span

                    key={i}

                    className="border border-cyan-400 text-cyan-300 px-3 py-1 rounded-xl text-xs"

                  >

                    {skill}

                  </span>

                ))}

              </div>

            </div>

            {/* PLATFORMS */}

            <div className="glass p-5 rounded-3xl">

              <h3 className="text-lg font-bold mb-4 text-white">

                🎯 Learning Platforms

              </h3>

              <div className="flex flex-wrap gap-2">

                {data.platforms.map((platform,i)=>(

                  <span

                    key={i}

                    className="border border-indigo-400 text-indigo-300 px-3 py-1 rounded-xl text-xs"

                  >

                    {platform}

                  </span>

                ))}

              </div>

            </div>

          </motion.div>

        )}

      </motion.div>

    </div>

  );

}

export default CareerPrediction;