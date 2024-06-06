'use client';

import React, { useEffect, useState } from 'react'

const LINKRESEND_TIMER = 600; // 10 minutes in seconds

export default function LinkResendTimer({ setIsResendDisabled }: { setIsResendDisabled: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [timer, setTimer] = useState(LINKRESEND_TIMER);

  const startTimer = () => {
    setIsResendDisabled(true);
    let countdown = timer;

    const interval = setInterval(() => {
      countdown -= 1;
      setTimer(countdown);

      if (countdown <= 0) {
        clearInterval(interval);
        setIsResendDisabled(false);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <span className='text-black dark:text-white'>Resend Link in {Math.floor(timer / 60)} minutes {timer % 60} seconds</span>
  )
}
