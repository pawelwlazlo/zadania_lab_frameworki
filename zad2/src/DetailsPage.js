import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function DetailsPage() {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.github.com/repositories/${id}`)
      .then((response) => setRepo(response.data))
      .catch((error) => console.error(`Error: ${error}`));
  }, [id]);

  if (!repo) return "Loading...";

  return (
    <div className="api-details">
      <h1>{repo.name}</h1>
      <p>{repo.description}</p>
      <p>{`Stars: ${repo.stargazers_count}`}</p>
      <p>{`Watchers: ${repo.watchers_count}`}</p>
    </div>
  );
}

export default DetailsPage;
