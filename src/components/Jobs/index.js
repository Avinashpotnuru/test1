import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import JobCard from "../JobCard";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://testapi.getlokalapp.com/common/jobs?page=${page}`
        );

        if (response.data.results.length === 0) {
          setHasMore(false); 
        } else {
          setJobs((prevJobs) => [...prevJobs, ...response.data.results]);
        }
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
      setLoading(false);
    };
    fetchJobs();
  }, [page]);

  return (
    <div className="jobs">
      <div className="jobs-container">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more jobs available</p>}
      {hasMore && !loading && (
        <button className="load-more" onClick={() => setPage(page + 1)}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Jobs;
