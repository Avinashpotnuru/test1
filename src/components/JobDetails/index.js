import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import { FaArrowLeft } from "react-icons/fa";

const JobDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { job } = location.state;

  const handleBackToHome = () => {
    navigate("/"); 
  };

  return (
    <>
      <button className="back-to-home" onClick={handleBackToHome}>
        <FaArrowLeft className="back-icon" />
      
      </button>

      <div className="job-details">
        <div className="job-header">
          <h1 className="job-title">{job.title}</h1>
          <div className="job-image">
            {job.creatives.length > 0 && (
              <img
                src={job.creatives[0].file}
                alt="Job"
                className="job-image__img"
              />
            )}
          </div>
        </div>
        <div className="job-info">
          <div className="job-info__section">
            <h2>Job Details</h2>
            <p>
              <strong>Location:</strong> {job.primary_details.Place}
            </p>
            <p>
              <strong>Salary:</strong> {job.primary_details.Salary}
            </p>
            <p>
              <strong>Experience Required:</strong>{" "}
              {job.primary_details.Experience}
            </p>
            <p>
              <strong>Job Type:</strong> {job.primary_details.Job_Type}
            </p>
            <p>
              <strong>Qualification:</strong>{" "}
              {job.primary_details.Qualification}
            </p>
          </div>
          <div className="job-info__section">
            <h2>Contact Details</h2>
            <p>
              <strong>Phone:</strong>{" "}
              <a href={`tel:${job.contact_preference.whatsapp_no}`}>
                {job.contact_preference.whatsapp_no}
              </a>
            </p>
            <p>
              <strong>WhatsApp:</strong>{" "}
              <a
                href={job.contact_preference.whatsapp_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </p>
          </div>
          <div className="job-info__section">
            <h2>Description</h2>
            <p>{job.other_details}</p>
          </div>
          <div className="job-info__section">
            <h2>Additional Information</h2>
            <p>
              <strong>Job Category:</strong> {job.job_category}
            </p>
            <p>
              <strong>Number of Vacancies:</strong> {job.openings_count}
            </p>
            <p>
              <strong>Application Count:</strong> {job.num_applications}
            </p>
            <p>
              <strong>Company:</strong> {job.company_name}
            </p>
          </div>
          <div className="job-info__section">
            <button
              className="call-button"
              onClick={() =>
                (window.location.href = `tel:${job.contact_preference.whatsapp_no}`)
              }
            >
              📞 Call HR
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
