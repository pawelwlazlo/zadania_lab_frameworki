import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    axios.get("https://api.github.com/users/mrogur/repos")
      .then((response) => setRepos(response.data))
      .catch((error) => console.error(`Error: ${error}`));
  }, []);

  return (
    <div className="api-results">
      <h1>Repozytoria</h1>
      {repos.map((repo) => (
        <div key={repo.id}>
          <Link to={`/details/${repo.id}`}>{repo.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
