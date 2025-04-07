import { useState } from "react";

function Education({ educationInfo, updateEducation }) {
  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState(educationInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEducation(formData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="section">
      <h2>Education</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="school">School:</label>
            <input
              type="text"
              id="school"
              name="school"
              value={formData.school}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="degree">Degree/Title of Study:</label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="grad_date">Date of Study/Graduation:</label>
            <input
              type="date"
              id="grad_date"
              name="grad_date"
              value={formData.grad_date}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-submit">
            Submit
          </button>
        </form>
      ) : (
        <div className="info-display">
          <p>
            <strong>School:</strong> {formData.school}
          </p>
          <p>
            <strong>Degree:</strong> {formData.degree}
          </p>
          <p>
            <strong>Graduation Date:</strong> {formData.grad_date}
          </p>
          <button onClick={handleEdit} className="btn-edit">
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default Education;
