import { useState, useEffect } from "react";
import axios from "axios";
import { formatDateTime } from "../../utils/dateFormatter";

import "./Home.css";

const Home = () => {
  const [tickets, setTickets] = useState([]);
  const [filterType, setFilterType] = useState("type");
  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterOptions, setFilterOptions] = useState({});

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const params = {
          ...(filterValue && { [filterType]: filterValue }),
          ...(sortBy && { sortBy: sortBy, sortOrder: sortOrder }),
        };

        const response = await axios.get(import.meta.env.VITE_GET_TICKETS, { params });
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Server is down!");
      }
    };

    fetchTickets();
  }, [filterType, filterValue, sortBy, sortOrder]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_GET_FILTERS);
        setFilterOptions(response.data);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  const renderFilterOptions = () => {
    if (!filterOptions[filterType]) {
      return null;
    }

    return filterOptions[filterType].map((option) => (
      <option key={option._id || option} value={option._id || option}>
        {option.name || option}
      </option>
    ));
  };

  const handleClearFilters = () => {
    setFilterType("");
    setFilterValue("");
    setSortBy("");
    setSortOrder("asc");
  };

  return (
    <div className="content-box">
      <h1>Ticket List</h1>
      <div className="filters">
        <div className="filter-container">
          <select className="filterSpace" onChange={(e) => setFilterType(e.target.value)}>
            <option value="">Select Filter</option>
            <option value="type">Type</option>
            <option value="status">Status</option>
            <option value="assignedTo">Assigned To</option>
            <option value="severity">Severity</option>
          </select>
          {filterType && (
            <select
              className="filterSpace"
              disabled={!filterType}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}>
              <option value="">Select Value</option>
              {renderFilterOptions()}
            </select>
          )}
        </div>

        <div className="sort-container">
          <div className="sort-select-wrapper">
            <select className="sort-select" onChange={(e) => setSortBy(e.target.value)}>
              <option value="">Select Sort</option>
              <option value="resolvedOn">Resolved On</option>
              <option value="dateCreated">Date Created</option>
            </select>
          </div>
          <div className="sort-select-wrapper">
            <select className="sort-select" onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">ASC</option>
              <option value="desc">DESC</option>
            </select>
          </div>
          <button onClick={handleClearFilters}>Clear Filters</button>
        </div>
      </div>

      <table className="ticket-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date Created</th>
            <th>Description</th>
            <th>Type</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Severity</th>
            <th>Resolved On</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} className="ticket-row">
              <td>{ticket.topic}</td>
              <td>{formatDateTime(ticket.dateCreated)}</td>
              <td>{ticket.description}</td>
              <td>{ticket.type}</td>
              <td>{ticket.assignedTo || "NA"}</td>
              <td>{ticket.status}</td>
              <td>
                <span className={`ticket-severity severity-${ticket.severity.toLowerCase()}`}>
                  {ticket.severity}
                </span>
              </td>
              <td>{ticket.resolvedOn ? formatDateTime(ticket.resolvedOn) : "NA"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
