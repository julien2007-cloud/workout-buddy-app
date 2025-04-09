import React, { useEffect, useState } from "react";
import "./Home.css";
import WorkoutForm from "../../components/workoutForm";
function Home() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const response = await fetch("http://localhost:4000/api/workouts");
    const json = await response.json();

    if (response.ok) {
      setWorkouts(json);
    }
  };

  const handleDelete = async (workout_id) => {
    const response = await fetch(
      "http://localhost:4000/api/workouts/" + workout_id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
    if (response.ok) {
      await fetchWorkouts();
      console.log(json)
      console.log("workout deleted successfully")
    }
  };

  return (
    <div className="main-cont">
      <div className="all-workout-cont">
        {workouts &&
          workouts.map((workout) => {
            return (
              <div className="workout-cont" key={workout._id}>
                <div className="top-block">
                  <p>{workout.title}</p>
                  <button className="trash-btn" onClick={async () => await handleDelete(workout._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </button>
                </div>
                <div className="middle-block">
                  <p>Load (kg): {workout.load}</p>
                  <p>Number of reps: {workout.reps}</p>
                  <p>{workout.createdAt} minutes ago</p>
                </div>
              </div>
            );
          })}
      </div>
      <WorkoutForm fetchWorkouts={fetchWorkouts} />
    </div>
  );
}

export default Home;
