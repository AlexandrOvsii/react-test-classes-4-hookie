import React, { useEffect, useRef, useState } from 'react';

export default function Clock() {
  const [time, setTime] = useState(() => new Date());
  const intervalId = useRef(null);

  useEffect(() => {
    intervalId.current =
    setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      stop();
    };
  });

  const stop = () => {
    clearInterval(intervalId.current);
  };

  return (
    <div>
      <p>Текущее время: {time.toLocaleTimeString()}</p>
      <button type="button" onClick={stop}>
        Остановить время
      </button>
    </div>
  );
}

