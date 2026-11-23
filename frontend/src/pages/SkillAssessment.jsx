import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const skillData = {

  "Python": {
  roles:["AI Engineer","Backend Developer","Data Scientist"],
  learning:["Machine Learning","Flask","Django"],
  demand:"Very High"
},

"Java": {
  roles:["Java Developer","Software Engineer"],
  learning:["Spring Boot","Microservices"],
  demand:"High"
},

"JavaScript": {
  roles:["Frontend Developer","Full Stack Developer"],
  learning:["React","Node.js","TypeScript"],
  demand:"Very High"
},

"React": {
  roles:["Frontend Developer","UI Developer"],
  learning:["Redux","Next.js","Tailwind CSS"],
  demand:"High"
},

"Node.js": {
  roles:["Backend Developer","Full Stack Developer"],
  learning:["MongoDB","Express.js"],
  demand:"High"
},

"MongoDB": {
  roles:["Database Developer","Backend Developer"],
  learning:["Mongoose","Aggregation"],
  demand:"High"
},

"MySQL": {
  roles:["Database Administrator","Backend Developer"],
  learning:["SQL Optimization","Stored Procedures"],
  demand:"High"
},

"PostgreSQL": {
  roles:["Database Engineer","Backend Developer"],
  learning:["Advanced SQL","Database Scaling"],
  demand:"High"
},

"Machine Learning": {
  roles:["ML Engineer","Data Scientist"],
  learning:["TensorFlow","Scikit-learn"],
  demand:"Very High"
},

"Deep Learning": {
  roles:["AI Engineer","Research Scientist"],
  learning:["Neural Networks","PyTorch"],
  demand:"Very High"
},

"Artificial Intelligence": {
  roles:["AI Engineer","Research Engineer"],
  learning:["Machine Learning","Deep Learning"],
  demand:"Very High"
},

"Data Science": {
  roles:["Data Scientist","Business Analyst"],
  learning:["Python","Statistics","Visualization"],
  demand:"Very High"
},

"TensorFlow": {
  roles:["AI Engineer","ML Engineer"],
  learning:["Deep Learning","Keras"],
  demand:"High"
},

"PyTorch": {
  roles:["AI Researcher","ML Engineer"],
  learning:["Deep Learning","Transformers"],
  demand:"High"
},

"Pandas": {
  roles:["Data Analyst","Data Scientist"],
  learning:["NumPy","Data Cleaning"],
  demand:"High"
},

"NumPy": {
  roles:["Data Scientist","ML Engineer"],
  learning:["Linear Algebra","Data Processing"],
  demand:"High"
},

"Flask": {
  roles:["Backend Developer","Python Developer"],
  learning:["REST API","MongoDB"],
  demand:"High"
},

"Django": {
  roles:["Backend Developer","Web Developer"],
  learning:["REST Framework","Authentication"],
  demand:"High"
},

"FastAPI": {
  roles:["API Developer","Backend Engineer"],
  learning:["Async Programming","Swagger"],
  demand:"High"
},

"HTML": {
  roles:["Frontend Developer","Web Designer"],
  learning:["CSS","JavaScript"],
  demand:"Medium"
},

"CSS": {
  roles:["UI Developer","Frontend Developer"],
  learning:["Tailwind CSS","Responsive Design"],
  demand:"Medium"
},

"Tailwind CSS": {
  roles:["Frontend Developer","UI Developer"],
  learning:["React","Responsive UI"],
  demand:"High"
},

"Bootstrap": {
  roles:["Frontend Developer","Web Designer"],
  learning:["Responsive Design","CSS"],
  demand:"Medium"
},

"Angular": {
  roles:["Frontend Developer","Enterprise Developer"],
  learning:["TypeScript","RxJS"],
  demand:"High"
},

"Vue.js": {
  roles:["Frontend Developer","UI Engineer"],
  learning:["Vuex","Nuxt.js"],
  demand:"High"
},

"Next.js": {
  roles:["Frontend Developer","Full Stack Developer"],
  learning:["SSR","React"],
  demand:"Very High"
},

"Express.js": {
  roles:["Backend Developer","API Developer"],
  learning:["Node.js","MongoDB"],
  demand:"High"
},

"AWS": {
  roles:["Cloud Engineer","DevOps Engineer"],
  learning:["EC2","Lambda","Cloud Security"],
  demand:"Very High"
},

"Azure": {
  roles:["Cloud Engineer","System Administrator"],
  learning:["Virtual Machines","Azure DevOps"],
  demand:"High"
},

"Google Cloud": {
  roles:["Cloud Architect","DevOps Engineer"],
  learning:["BigQuery","Cloud Functions"],
  demand:"High"
},

"Docker": {
  roles:["DevOps Engineer","Cloud Engineer"],
  learning:["Kubernetes","CI/CD"],
  demand:"High"
},

"Kubernetes": {
  roles:["DevOps Engineer","Cloud Engineer"],
  learning:["Containers","Helm"],
  demand:"Very High"
},

"Linux": {
  roles:["System Administrator","DevOps Engineer"],
  learning:["Shell Scripting","Networking"],
  demand:"High"
},

"Git": {
  roles:["Software Developer","DevOps Engineer"],
  learning:["GitHub","Version Control"],
  demand:"Very High"
},

"GitHub": {
  roles:["Software Developer","Open Source Contributor"],
  learning:["Git","CI/CD"],
  demand:"High"
},

"Cyber Security": {
  roles:["Cyber Security Analyst","Ethical Hacker"],
  learning:["Networking","Penetration Testing"],
  demand:"Very High"
},

"Ethical Hacking": {
  roles:["Penetration Tester","Security Researcher"],
  learning:["Kali Linux","Burp Suite"],
  demand:"Very High"
},

"Network Security": {
  roles:["Security Engineer","SOC Analyst"],
  learning:["Firewalls","SIEM"],
  demand:"High"
},

"Penetration Testing": {
  roles:["Ethical Hacker","Security Tester"],
  learning:["OWASP","Metasploit"],
  demand:"High"
},

"Flutter": {
  roles:["Mobile App Developer"],
  learning:["Firebase","Dart"],
  demand:"High"
},

"React Native": {
  roles:["Mobile Developer","Cross Platform Developer"],
  learning:["React","API Integration"],
  demand:"High"
},

"Android Development": {
  roles:["Android Developer","Mobile Engineer"],
  learning:["Kotlin","Firebase"],
  demand:"High"
},

"iOS Development": {
  roles:["iOS Developer","Mobile Engineer"],
  learning:["Swift","Xcode"],
  demand:"High"
},

"Firebase": {
  roles:["Backend Developer","Mobile Developer"],
  learning:["Authentication","Firestore"],
  demand:"High"
},

"REST API": {
  roles:["Backend Developer","API Engineer"],
  learning:["Postman","Authentication"],
  demand:"Very High"
},

"GraphQL": {
  roles:["API Developer","Backend Engineer"],
  learning:["Apollo","Node.js"],
  demand:"High"
},

"DevOps": {
  roles:["DevOps Engineer","Cloud Engineer"],
  learning:["Docker","Kubernetes"],
  demand:"Very High"
},

"CI/CD": {
  roles:["DevOps Engineer","Release Engineer"],
  learning:["GitHub Actions","Jenkins"],
  demand:"High"
},

"Selenium": {
  roles:["Automation Tester","QA Engineer"],
  learning:["Testing","Automation Framework"],
  demand:"High"
},

"Manual Testing": {
  roles:["QA Tester","Software Tester"],
  learning:["Test Cases","Bug Tracking"],
  demand:"Medium"
},

"Automation Testing": {
  roles:["QA Automation Engineer","Software Tester"],
  learning:["Selenium","JUnit"],
  demand:"High"
},

"Power BI": {
  roles:["Business Analyst","Data Analyst"],
  learning:["Data Visualization","DAX"],
  demand:"High"
},

"Tableau": {
  roles:["Data Analyst","BI Developer"],
  learning:["Dashboards","Visualization"],
  demand:"High"
},

"Excel": {
  roles:["Data Analyst","Business Analyst"],
  learning:["Pivot Tables","Formulas"],
  demand:"High"
},

"Figma": {
  roles:["UI/UX Designer","Product Designer"],
  learning:["Wireframing","Prototype Design"],
  demand:"High"
},

"UI/UX Design": {
  roles:["UI Designer","UX Researcher"],
  learning:["Figma","User Research"],
  demand:"High"
},

"Communication Skills": {
  roles:["Team Lead","Project Manager"],
  learning:["Presentation","Collaboration"],
  demand:"Very High"
},

"Problem Solving": {
  roles:["Software Engineer","Data Scientist"],
  learning:["DSA","Algorithms"],
  demand:"Very High"
}
};

function SkillAssessment() {

  const [skill, setSkill] = useState("");

  const [data, setData] = useState(null);

  const handleSkillSelect = async(item)=>{

    setSkill(item);

    setData(skillData[item]);

    try{

      await axios.post(

        "http://127.0.0.1:5000/track-activity",

        {

          user: localStorage.getItem("user"),

          feature: "Skill Assessment"

        }

      );

    }

    catch(err){

      console.log(err);

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

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-2xl mx-auto mb-4 shadow-xl">

            💡

          </div>

          <h1 className="text-3xl md:text-4xl font-black gradient-text mb-3">

            Skill Assessment

          </h1>

          <p className="text-slate-400 text-sm">

            Analyze skills and discover career opportunities

          </p>

        </div>

        {/* SEARCH */}

        <input

          type="text"

          placeholder="Search IT skill..."

          value={skill}

          onChange={(e)=>setSkill(e.target.value)}

          className="w-full p-3 rounded-2xl bg-slate-800/60 border border-slate-700 outline-none text-white text-sm mb-6"

        />

        {/* SKILL BUTTONS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">

          {Object.keys(skillData)

            .filter((item)=>

              item.toLowerCase().includes(

                skill.toLowerCase()

              )

            )

            .map((item,i)=>(

              <button

                key={i}

                onClick={()=>handleSkillSelect(item)}

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

            {/* JOB ROLES */}

            <div className="glass p-5 rounded-3xl">

              <h2 className="text-lg font-bold mb-4 text-white">

                💼 Job Roles

              </h2>

              <div className="flex flex-wrap gap-2">

                {data.roles.map((role,i)=>(

                  <span

                    key={i}

                    className="border border-indigo-400 text-indigo-300 px-3 py-1 rounded-xl text-xs"

                  >

                    {role}

                  </span>

                ))}

              </div>

            </div>

            {/* LEARNING */}

            <div className="glass p-5 rounded-3xl">

              <h2 className="text-lg font-bold mb-4 text-white">

                📚 Recommended Learning

              </h2>

              <div className="flex flex-wrap gap-2">

                {data.learning.map((item,i)=>(

                  <span

                    key={i}

                    className="border border-cyan-400 text-cyan-300 px-3 py-1 rounded-xl text-xs"

                  >

                    {item}

                  </span>

                ))}

              </div>

            </div>

            {/* DEMAND */}

            <div className="glass p-5 rounded-3xl">

              <h2 className="text-lg font-bold mb-4 text-white">

                📈 Industry Demand

              </h2>

              <p className="text-cyan-300 text-lg font-bold">

                {data.demand}

              </p>

            </div>

          </motion.div>

        )}

      </motion.div>

    </div>

  );

}

export default SkillAssessment;