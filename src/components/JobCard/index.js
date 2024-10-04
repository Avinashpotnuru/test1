import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const isBookmarked = storedBookmarks.some((b) => b.id === job.id);
    setIsBookmarked(isBookmarked);
  }, [job.id]);

  const hasRequiredKeys =
    job.title &&
    job.job_location_slug &&
    job.primary_details?.Salary &&
    job?.custom_link;

  if (!hasRequiredKeys) {
    return null;
  }

  const handleClick = () => {
    navigate(`/job/${job.id}`, { state: { job } });
  };

  const handleBookmark = (job) => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const isAlreadyBookmarked = storedBookmarks.some((b) => b.id === job.id);

    
    toast.dismiss();

    if (!isAlreadyBookmarked) {
      localStorage.setItem(
        "bookmarks",
        JSON.stringify([...storedBookmarks, job])
      );
      setIsBookmarked(true);
      toast.success("Job bookmarked!", {
        position: "top-center",
        className: "custom-toast",
        autoClose: 3000,
      });
    } else {
      const updatedBookmarks = storedBookmarks.filter((b) => b.id !== job.id);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
      toast.info("Job removed from bookmarks!", {
        position: "top-center",
        className: "custom-toast",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="job-card" onClick={handleClick}>
      {isBookmarked ? (
        <FaBookmark
          className="bookmark-icon active"
          onClick={(e) => {
            e.stopPropagation();
            handleBookmark(job);
          }}
        />
      ) : (
        <FaRegBookmark
          className="bookmark-icon"
          onClick={(e) => {
            e.stopPropagation();
            handleBookmark(job);
          }}
        />
      )}
      <h5>{job.title}</h5>
      <p>
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
  );
};

export default JobCard;
