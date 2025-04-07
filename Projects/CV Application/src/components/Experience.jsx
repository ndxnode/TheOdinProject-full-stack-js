import { useState } from "react";

function Experience({ jobs, updateExperience }) {
  const [isEditing, setIsEditing] = useState(true);
  const [jobList, setJobList] = useState(
    jobs.length > 0
      ? jobs
      : [
          {
            company: "",
            position: "",
            responsibilities: "",
            startDate: "",
            endDate: "",
          },
        ]
  );

  const handleJobChange = (index, e) => {
    const { name, value } = e.target;
    const updatedJobs = [...jobList];
    updatedJobs[index] = {
      ...updatedJobs[index],
      [name]: value,
    };
    setJobList(updatedJobs);
  };

  const addJob = () => {
    setJobList([
      ...jobList,
      {
        company: "",
        position: "",
        responsibilities: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const removeJob = (index) => {
    const updatedJobs = jobList.filter((_, i) => i !== index);
    setJobList(updatedJobs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateExperience({ jobs: jobList });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="section">
      <h2>Work Experience</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          {jobList.map((job, index) => (
            <div key={index} className="job-entry">
              <h3>Job {index + 1}</h3>

              <div className="form-group">
                <label htmlFor={`company-${index}`}>Company:</label>
                <input
                  type="text"
                  id={`company-${index}`}
                  name="company"
                  value={job.company}
                  onChange={(e) => handleJobChange(index, e)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor={`position-${index}`}>Position:</label>
                <input
                  type="text"
                  id={`position-${index}`}
                  name="position"
                  value={job.position}
                  onChange={(e) => handleJobChange(index, e)}
                />
              </div>

              <div className="form-group">
                <label htmlFor={`responsibilities-${index}`}>
                  Main Responsibilities:
                </label>
                <textarea
                  id={`responsibilities-${index}`}
                  name="responsibilities"
                  value={job.responsibilities}
                  onChange={(e) => handleJobChange(index, e)}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor={`startDate-${index}`}>Start Date:</label>
                <input
                  type="date"
                  id={`startDate-${index}`}
                  name="startDate"
                  value={job.startDate}
                  onChange={(e) => handleJobChange(index, e)}
                />
              </div>

              <div className="form-group">
                <label htmlFor={`endDate-${index}`}>End Date:</label>
                <input
                  type="date"
                  id={`endDate-${index}`}
                  name="endDate"
                  value={job.endDate}
                  onChange={(e) => handleJobChange(index, e)}
                />
              </div>

              {jobList.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeJob(index)}
                  className="btn-remove"
                >
                  Remove Job
                </button>
              )}
            </div>
          ))}

          <div className="job-buttons">
            <button type="button" onClick={addJob} className="btn-add">
              Add Another Job
            </button>
            <button type="submit" className="btn-submit">
              Submit All Jobs
            </button>
          </div>
        </form>
      ) : (
        <div className="info-display">
          {jobList.map((job, index) => (
            <div key={index} className="job-display">
              <h3>
                {job.position} at {job.company}
              </h3>
              <p>
                <strong>Duration:</strong> {job.startDate} to {job.endDate}
              </p>
              <p>
                <strong>Responsibilities:</strong> {job.responsibilities}
              </p>
            </div>
          ))}
          <button onClick={handleEdit} className="btn-edit">
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default Experience;
