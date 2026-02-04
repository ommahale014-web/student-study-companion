"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0 && minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsActive(false);
          setIsBreak(!isBreak);
          setMinutes(isBreak ? 25 : 5);
          // Optional: Add notification sound here
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isBreak]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setIsBreak(false);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-4">
      {/* Timer Display */}
      <div className="relative flex items-center justify-center">
        {/* Glow Effect behind numbers */}
        <div className={`absolute inset-0 blur-3xl opacity-20 transition-colors duration-1000 ${isBreak ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
        
        <div className="relative flex flex-col items-center">
          <div className="text-8xl md:text-9xl font-black tracking-tighter text-white tabular-nums drop-shadow-2xl">
            {String(minutes).padStart(2, "0")}<span className="text-indigo-500/50 animate-pulse">:</span>{String(seconds).padStart(2, "0")}
          </div>
          
          <div className="mt-4 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-md">
            {isBreak ? (
              <>
                <Coffee className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Short Break</span>
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Focus Mode</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <Button
          onClick={resetTimer}
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-2xl border-slate-700 bg-slate-800/40 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>

        <Button
          onClick={toggleTimer}
          className={`h-16 px-8 rounded-3xl text-lg font-bold transition-all duration-300 shadow-xl ${
            isActive 
            ? "bg-slate-700 text-white hover:bg-slate-600 shadow-black/20" 
            : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-500/20"
          }`}
        >
          {isActive ? (
            <><Pause className="w-6 h-6 mr-2 fill-current" /> Pause</>
          ) : (
            <><Play className="w-6 h-6 mr-2 fill-current" /> Start Session</>
          )}
        </Button>

        {/* Dynamic Indicator Dots */}
        <div className="hidden md:flex flex-col gap-1.5 ml-4">
          {[1, 2, 3, 4].map((dot) => (
            <div 
              key={dot} 
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                dot === 1 && isActive ? 'bg-indigo-500 animate-pulse' : 'bg-slate-700'
              }`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}