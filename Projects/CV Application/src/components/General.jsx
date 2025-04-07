import { useState } from "react";

export default function General({ generalInfo, updateGeneral }) {
  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState(generalInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateGeneral(formData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="section">
      <h2>General Information</h2>
      
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first_name">First Name:</label>
            <input 
              type="text" 
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="last_name">Last Name:</label>
            <input 
              type="text" 
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="telephone">Phone Number:</label>
            <input 
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
            />
          </div>
          
          <button type="submit" className="btn-submit">Submit</button>
        </form>
      ) : (
        <div className="info-display">
          <p><strong>Name:</strong> {formData.first_name} {formData.last_name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.telephone}</p>
          <button onClick={handleEdit} className="btn-edit">Edit</button>
        </div>
      )}
    </div>
  );
}
