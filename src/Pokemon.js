import React, { useState, useEffect } from "react";
import { getPokemon } from "./api"

function Pokemon({ name = "pikachu" }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

//   console.log({ status, error, data })

  useEffect(() => {
    setStatus("pending");
    getPokemon(name)
        .then((data) => {
          setData(data);
          setStatus("resolved");
        })
        .catch((error) => {
          setError(error);
          setStatus("rejected");
        });
  }, [name]);

  // got an error? display error status
  if (status === "rejected") {
    return (
        <pre>
        <code>{JSON.stringify(error, null, 2)}</code>
      </pre>
    );
  }

  // still fetching? display loading
  if (status !== "resolved") {
    return <p>Loading...</p>;
  }

  // all good! display pokemon
  return (
      <div>
        <h3>{data.name}</h3>
        <img src={data.sprite} alt={`${data.name} sprite`} />
      </div>
  );
}

export default Pokemon