import { useEffect, useState } from 'react';

interface Props {
  title: string;
  steps: string[];
}

export default function Loader({ title, steps }: Props) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setActiveStep(0);
    const iv = setInterval(() => {
      setActiveStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(iv);
  }, [steps]);

  return (
    <div className="loader">
      <div className="loader-spinner" />
      <p className="loader-title">{title}</p>
      <ul className="loader-steps">
        {steps.map((step, i) => {
          const state = i < activeStep ? 'done' : i === activeStep ? 'active' : 'pending';
          return (
            <li key={i} className={`loader-step loader-step--${state}`}>
              <span className="loader-step-indicator">
                {state === 'done' ? '✓' : state === 'active' ? <span className="loader-step-dot" /> : ''}
              </span>
              {step}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
