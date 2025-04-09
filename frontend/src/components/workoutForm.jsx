import React, { useState } from "react";
import "./WorkoutForm.css";

function WorkoutForm({ fetchWorkouts }) {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };

    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      await fetchWorkouts();
      setTitle("");
      setLoad(0);
      setReps(0);
      setError(null);
      console.log("new workout added", json);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form">
        <p>Add a New Workout</p>
        <div>
          <label>Exercise Title:</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <label>Load (in kg) </label>
          <input
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
          />
        </div>
        <div>
          <label>Number of Reps:</label>
          <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
          />
        </div>
        <button type="Submit">Add Workout</button>
        {error && <div className="error">{error}</div>}
      </div>
    </form>
  );
}

export default WorkoutForm;
