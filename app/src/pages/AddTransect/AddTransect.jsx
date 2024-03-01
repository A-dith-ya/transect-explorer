import React, { useState } from 'react';
import './AddTransect.css';

const AddTransect = () => {
  const [formData, setFormData] = useState({
    transectName: '',
    observation: '',
    coordinates: [{ longitude: '', latitude: '' }],
    attachments: []
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'longitude' || name === 'latitude') {
      const newCoordinates = [...formData.coordinates];
      newCoordinates[index][name] = value;
      setFormData(prevState => ({
        ...prevState,
        coordinates: newCoordinates
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleAddCoordinateField = () => {
    setFormData(prevState => ({
      ...prevState,
      coordinates: [...prevState.coordinates, { longitude: '', latitude: '' }]
    }));
  };

  const handleRemoveCoordinateField = (index) => {
    const newCoordinates = [...formData.coordinates];
    newCoordinates.splice(index, 1);
    setFormData(prevState => ({
      ...prevState,
      coordinates: newCoordinates
    }));
  };

  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prevState => ({
      ...prevState,
      attachments: files
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here, e.g., sending data to backend
    // Reset the form after submission if needed
    setFormData({
      transectName: '',
      observation: '',
      coordinates: [{ longitude: '', latitude: '' }],
      attachments: []
    });
  };

  return (
    <div>
      <h2>Add Transect</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="transectName">Transect Name:</label>
          <input
            type="text"
            id="transectName"
            name="transectName"
            value={formData.transectName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Region:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Region</option>
            <option value="Category 1">Region 1</option>
            <option value="Category 2">Region 2</option>
            <option value="Category 3">Region 3</option>
          </select>
        </div>
        <div>
          <label htmlFor="observation">Observation:</label>
          <textarea
            id="observation"
            name="observation"
            value={formData.observation}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Coordinates:</label>
          {formData.coordinates.map((coord, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Longitude"
                name="longitude"
                value={coord.longitude}
                onChange={(e) => handleChange(e, index)}
              />
              <input
                type="text"
                placeholder="Latitude"
                name="latitude"
                value={coord.latitude}
                onChange={(e) => handleChange(e, index)}
              />
              {index > 0 && <button type="button" onClick={() => handleRemoveCoordinateField(index)}>Remove</button>}
            </div>
          ))}
            <button type="button" onClick={handleAddCoordinateField}>Add Coordinate</button>
        </div>
        <div>
          <label htmlFor="attachments">Attachments:</label>
          <input
            type="file"
            id="attachments"
            name="attachments"
            multiple
            onChange={handleAttachmentChange}
          />
        </div>
        <button type="submit">Add Transect</button>
      </form>
    </div>
  );
};

export default AddTransect;