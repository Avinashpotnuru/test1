
import React, { useState, useEffect } from "react";
import "./index.css";

const Bookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarkedJobs(storedBookmarks);
  }, []);

  const removeBookmark = (jobId) => {
    const updatedBookmarks = bookmarkedJobs.filter((job) => job.id !== jobId);
    setBookmarkedJobs(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="bookmarks-page">
      {bookmarkedJobs.length > 0 ? (
        bookmarkedJobs.map((job) => (
          <div key={job.id} className="bookmark-card">
            <div className="bookmark-card-header">
              <h5 className="bookmark-card-title">{job.title}</h5>
              <button
                className="bookmark-remove-btn"
                onClick={() => removeBookmark(job.id)}
              >
                ❌
              </button>
            </div>
            <p className="bookmark-card-detail">
              <strong>Location:</strong> {job.job_location_slug}
            </p>
            <p>
              <strong>Salary:</strong>{" "}
              {job.primary_details?.Salary !== "-"
                ? job.primary_details.Salary
                : "not mentioned"}
            </p>
            <p>
              <strong>Phone:</strong> {job?.custom_link.slice(4)}
            </p>
          </div>
        ))
      ) : (
        <p className="no-bookmarks-message">No bookmarks available</p>
      )}
    </div>
  );
};

export default Bookmarks;
