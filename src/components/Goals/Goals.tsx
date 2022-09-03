import React from "react";
import { Goal } from "../../types";
import "./Goals.css";

const Goals = ({ goals }: { goals: Array<Goal> }) => {
  return (
    <section className="goals">
      <h1>Goals</h1>

      <ul className="goal-list">
        {goals.map(({ goal, id }) => (
          <li className="list-item" key={id}>
            {goal}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Goals;
