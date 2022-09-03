import React, { ChangeEvent, useId, useState } from "react";
import "./AddGoal.css";
import addGoal from "../../api/addGoal/addGoal";
import classNames from "classnames";

const monthOptions = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

const AddGoal = () => {
  const [goal, setGoal] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const isValid = goal && selectedMonth;
  const inputId = useId();
  const selectId = useId();

  const handleChangeGoal = (event: ChangeEvent<HTMLInputElement>) => {
    setGoal(event.target.value);
  };

  const handleChangeMonth = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const handleSubmit = () => {
    if (isValid) {
      addGoal({ goal, month: parseInt(selectedMonth) })
        .then(() => {
          setGoal("");
          setSelectedMonth(null);
        })
        .catch(() => {
          setError("Oops, something went wrong, please try again!");
        });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="item">
        <label className="label" htmlFor={inputId}>
          Add goal *
        </label>
        <input
          className="input"
          name={inputId}
          id={inputId}
          onChange={handleChangeGoal}
          placeholder="Your goal"
          required
          type="text"
        />
      </div>

      <div className="item">
        <label className="label" htmlFor={selectId}>
          Pick month *
        </label>
        <select
          className="select"
          name={selectId}
          id={selectId}
          onChange={handleChangeMonth}
          required
        >
          {monthOptions.map((option) => (
            <option className="option" key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="item">
        {error && <p className="error">{error}</p>}

        <button
          disabled={!isValid}
          className={classNames("button", {
            "button-disabled": !isValid,
          })}
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddGoal;
