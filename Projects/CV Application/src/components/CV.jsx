function CV({ cvInfo }) {
  return (
    <div className="cv-preview">
      <h2>CV Preview</h2>

      {/* General Information */}
      <div className="cv-section">
        <h3>Personal Information</h3>
        <p className="cv-name">
          {cvInfo.first_name} {cvInfo.last_name}
        </p>
        <p className="cv-contact">Email: {cvInfo.email}</p>
        <p className="cv-contact">Phone: {cvInfo.telephone}</p>
      </div>

      {/* Education */}
      <div className="cv-section">
        <h3>Education</h3>
        {cvInfo.school && (
          <div className="cv-education">
            <p className="cv-school">
              <strong>{cvInfo.school}</strong>
            </p>
            <p className="cv-degree">{cvInfo.degree}</p>
            <p className="cv-dates">Graduated: {cvInfo.grad_date}</p>
          </div>
        )}
      </div>

      {/* Experience */}
      <div className="cv-section">
        <h3>Work Experience</h3>
        {cvInfo.jobs.map((job, index) => (
          <div key={index} className="cv-job">
            <p className="cv-position">
              <strong>{job.position}</strong>
            </p>
            <p className="cv-company">{job.company}</p>
            <p className="cv-dates">
              {job.startDate} - {job.endDate}
            </p>
            <p className="cv-responsibilities">{job.responsibilities}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CV;
