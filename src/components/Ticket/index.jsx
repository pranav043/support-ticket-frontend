import { useState } from "react";
import "./Ticket.css";
import axios from "axios";

const Ticket = () => {
  const [ticketData, setTicketData] = useState({
    topic: "",
    description: "",
    dateCreated: new Date().toISOString(),
    severity: "",
    type: "",
    status: "",
    resolvedOn: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!ticketData.topic.trim()) {
      newErrors.topic = "Topic is required.";
      isValid = false;
    } else if (ticketData.topic.trim().length < 5) {
      newErrors.topic = "Topic must be at least 5 characters long.";
      isValid = false;
    }

    if (!ticketData.description.trim()) {
      newErrors.description = "Description is required.";
      isValid = false;
    } else if (ticketData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters long.";
      isValid = false;
    }

    if (!["LOW", "MEDIUM", "HIGH"].includes(ticketData.severity)) {
      newErrors.severity = "Please select a valid severity level.";
      isValid = false;
    }

    if (!ticketData.type.trim()) {
      newErrors.type = "Type is required.";
      isValid = false;
    }

    if (!["NEW", "ASSIGNED", "RESOLVED"].includes(ticketData.status)) {
      newErrors.status = "Invalid status selected.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post(import.meta.env.VITE_CREATE_TICKET, ticketData);
        alert("Successfully Created Agent");

        setTicketData({
          topic: "",
          description: "",
          dateCreated: new Date().toISOString(),
          severity: "",
          type: "",
          status: "",
          resolvedOn: "",
        });
        setErrors({});
      } catch (error) {
        console.error(
          "Error Creating Ticket:",
          error.response ? error.response.data.message : "Error while creating Agent"
        );
        if (error.response && error.response.data.message) {
          setErrors({ apiError: error.response.data.message });
        }
      }
    }
  };

  const handleChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  return (
    <div className="content-box">
      <h2>Create New Ticket</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="topic"
          value={ticketData.topic}
          onChange={handleChange}
          placeholder="Topic"
          className={errors.topic ? "input-error" : ""}
        />
        {errors.topic && <p className="error-message">{errors.topic}</p>}

        <textarea
          name="description"
          value={ticketData.description}
          onChange={handleChange}
          placeholder="Description"
          className={errors.description ? "input-error" : ""}
        />
        {errors.description && <p className="error-message">{errors.description}</p>}

        <select
          name="severity"
          value={ticketData.severity}
          onChange={handleChange}
          className={errors.severity ? "input-error" : ""}>
          <option value="">Select Severity</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
        {errors.severity && <p className="error-message">{errors.severity}</p>}

        <input
          type="text"
          name="type"
          value={ticketData.type}
          onChange={handleChange}
          placeholder="Type"
          className={errors.type ? "input-error" : ""}
        />
        {errors.type && <p className="error-message">{errors.type}</p>}

        <select
          name="status"
          value={ticketData.status}
          onChange={handleChange}
          className={errors.status ? "input-error" : ""}>
          <option value="">Select Status</option>
          <option value="NEW">NEW </option>
          <option value="ASSIGNED">ASSIGNED</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>
        {errors.status && <p className="error-message">{errors.status}</p>}

        <button type="submit" className="submit-agent">
          Create Ticket
        </button>
        {errors.apiError && <p>{errors.apiError}</p>}
      </form>
    </div>
  );
};

export default Ticket;
