import React from "react";
import { Goal } from "../../types";
import "./Goals.css";

const Goals = ({ goals }: { goals: Array<Goal> }) => {
  const getAllMonthsWithGoals = (goals: Array<Goal>) => {
    const monthOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return monthOptions.map((option) => {
      const existingGoal = goals.find((element) => element.month === option);
      return !existingGoal
        ? {
            goal: "",
            month: option,
          }
        : existingGoal;
    });
  };

  const monthsWithGoals = getAllMonthsWithGoals(goals);
  return (
    <section className="goals">
      <h1>Goals</h1>

      <ul className="goal-list">
        {monthsWithGoals.map(({ goal, month }) => {
          return (
            <li key={month}>
              <div className="list-item">
                <p className="goal">{goal}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Goals;
