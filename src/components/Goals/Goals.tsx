import React from "react";
import { Goal } from "../../types";
import "./Goals.css";

enum MonthNameOption {
  SHORT = "short",
  LONG = "long",
}

const getMonthName = ({
  month,
  monthNameOption = MonthNameOption.SHORT,
}: {
  month: number;
  monthNameOption?: MonthNameOption;
}) => {
  const date = new Date();
  date.setMonth(month - 1);

  return date.toLocaleString("en-US", { month: monthNameOption });
};

const monthOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const Goals = ({ goals }: { goals: Array<Goal> }) => {
  const getAllMonthsWithGoals = (goals: Array<Goal>) =>
    monthOptions.map((option) => {
      const existingGoal = goals.find((element) => element.month === option);
      return !existingGoal
        ? {
            goal: "",
            month: option,
          }
        : existingGoal;
    });

  const monthsWithGoals = getAllMonthsWithGoals(goals);

  return (
    <section className="goals">
      <h1>Goals</h1>

      <div className="calendar" aria-hidden>
        <ul className="months">
          {monthOptions.map((month) => (
            <li key={month} className="month">
              <p>{getMonthName({ month })}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="calendar">
        <ul className="goal-list">
          {monthsWithGoals.map(({ goal, month }) => (
            <li className="list" key={month}>
              <div className="list-item">
                <span data-testid="goal-with-month" className="visually-hidden">
                  {"Goal for " +
                    getMonthName({
                      month,
                      monthNameOption: MonthNameOption.LONG,
                    })}
                </span>
                <p data-testid="goal" className="goal">
                  {goal}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Goals;
