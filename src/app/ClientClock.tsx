"use client";

import { useEffect, useState } from "react";

export function ClientClock() {
  const [time, setTime] = useState<string | undefined>();
  useEffect(() => {
    setTimeout(() => {
      const t = new Date().toLocaleDateString("en", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      });
      setTime(t);
    }, 1000);
  }, []);

  return (
    <>
      <h2>{`Last Time Rendered On Client`}</h2>
      <h3>{time || <div className="clock-ghost" />}</h3>
    </>
  );
}
