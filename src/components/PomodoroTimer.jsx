"use client";

import { useEffect, useState } from "react";

export default function PomodoroTimer() {
  const POMODORO_TIME = 25 * 60; // 25 minutes

  const [secondsLeft, setSecondsLeft] = useState(POMODORO_TIME);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    if (secondsLeft === 0) {
      setIsRunning(false);
      alert("Pomodoro complete! Take a break.");
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  function startTimer() {
    setIsRunning(true);
  }

  function pauseTimer() {
    setIsRunning(false);
  }

  function resetTimer() {
    setIsRunning(false);
    setSecondsLeft(POMODORO_TIME);
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="border p-4 w-fit space-y-4">
      <div className="text-3xl font-mono">
        {minutes}:{seconds.toString().padStart(2, "0")}
      </div>

      <div className="flex gap-2">
        {!isRunning ? (
          <button
            className="border px-4 py-1"
            onClick={startTimer}
          >
            Start
          </button>
        ) : (
          <button
            className="border px-4 py-1"
            onClick={pauseTimer}
          >
            Pause
          </button>
        )}

        <button
          className="border px-4 py-1"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
