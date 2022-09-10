import React, { useEffect, useState } from "react";
import "./App.css";
import AddGoal from "./components/AddGoal/AddGoal";
import Goals from "./components/Goals/Goals";
import { Goal } from "./types";
import getGoals from "./api/getGoals/getGoals";

function App() {
  const [goals, setGoals] = useState<Array<Goal>>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    getGoals()
      .then((res) => {
        setGoals(res.data);
      })
      .catch(() => setError("Something went wrong when getting goals"));
  }, []);

  const amountOfFilledMonths = goals.length;

  return (
    <div className="app">
      <header className="header">Goal organizer</header>

      {error && <p className="error">{error}</p>}

      {!error && (
        <>
          <AddGoal filledMonths={goals.map(({ month }) => month)} />

          {amountOfFilledMonths > 0 && <Goals goals={goals} />}
        </>
      )}
    </div>
  );
}

export default App;
