import { useEffect, useState } from 'react';
import { LoaderContainer, LoaderSpinner, LoaderTitle, LoaderSteps, LoaderStep, LoaderStepIndicator, LoaderStepDot } from './Loader.styles';

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
    <LoaderContainer>
      <LoaderSpinner />
      <LoaderTitle>{title}</LoaderTitle>
      <LoaderSteps>
        {steps.map((step, i) => {
          const state = i < activeStep ? 'done' : i === activeStep ? 'active' : 'pending';
          return (
            <LoaderStep key={i} $state={state}>
              <LoaderStepIndicator>
                {state === 'done' ? '✓' : state === 'active' ? <LoaderStepDot /> : ''}
              </LoaderStepIndicator>
              {step}
            </LoaderStep>
          );
        })}
      </LoaderSteps>
    </LoaderContainer>
  );
}
