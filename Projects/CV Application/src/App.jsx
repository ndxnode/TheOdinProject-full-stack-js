import "./App.css";
import General from "./components/General";
import Education from "./components/Education";
import Experience from "./components/Experience";
import CV from "./components/CV";
import { useState } from "react";

function App() {
  const initialInfo = {
    first_name: "Andy",
    last_name: "",
    email: "",
    telephone: "",
    school: "",
    degree: "",
    grad_date: "",
    jobs: [],
  };
  const [cvInfo, setCvInfo] = useState(initialInfo);

  const updateGeneral = (generalData) => {
    setCvInfo({
      ...cvInfo,
      ...generalData,
    });
  };

  const updateEducation = (educationData) => {
    setCvInfo({
      ...cvInfo,
      ...educationData,
    });
  };

  const updateExperience = (experienceData) => {
    setCvInfo({
      ...cvInfo,
      jobs: experienceData.jobs,
    });
  };

  return (
    <>
      <h1 className="title">Create your CV!</h1>
      <div className="container">
        <div className="edit-container">
          <General
            generalInfo={{
              first_name: cvInfo.first_name,
              last_name: cvInfo.last_name,
              email: cvInfo.email,
              telephone: cvInfo.telephone,
            }}
            updateGeneral={updateGeneral}
          />
          <Education
            educationInfo={{
              school: cvInfo.school,
              degree: cvInfo.degree,
              grad_date: cvInfo.grad_date,
            }}
            updateEducation={updateEducation}
          />
          <Experience jobs={cvInfo.jobs} updateExperience={updateExperience} />
        </div>
        <CV cvInfo={cvInfo}></CV>
      </div>
    </>
  );
}

export default App;
