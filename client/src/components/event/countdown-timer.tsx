
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  eventName: string;
}

export function CountdownTimer({ targetDate, eventName }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate]);
  
  return (
    <div className="w-full bg-slate-50 rounded-md py-4 px-6 shadow-sm">
      <h3 className="text-xl font-medium text-slate-700 mb-3">{eventName}</h3>
      <div className="flex justify-center items-center gap-4 md:gap-6 text-center">
        {[
          { value: timeLeft.days.toString().padStart(2, '0'), label: "DD" },
          { value: ":", label: "" },
          { value: timeLeft.hours.toString().padStart(2, '0'), label: "HH" },
          { value: ":", label: "" },
          { value: timeLeft.minutes.toString().padStart(2, '0'), label: "MM" },
          { value: ":", label: "" },
          { value: timeLeft.seconds.toString().padStart(2, '0'), label: "SS" }
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className={`text-4xl md:text-5xl font-bold text-slate-700 ${item.value === ":" ? "text-slate-500 -mt-2" : ""}`}>
              {item.value}
            </span>
            {item.label && <span className="text-xs text-slate-500 mt-1">{item.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
