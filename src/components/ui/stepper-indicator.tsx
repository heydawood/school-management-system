import clsx from 'clsx';
import React from 'react';
import { Separator } from './separator';
import { MdCheck } from 'react-icons/md';

interface StepperIndicatorProps {
  activeStep: number;
  steps: string[];
}

const StepperIndicator = ({ activeStep, steps }: StepperIndicatorProps) => {
  return (
    <div className="flex items-center justify-center w-full relative">
      {steps.map((step, index) => (
        <div key={index} className="relative flex items-center">
          {index > 0 && <div className={clsx('h-[2px] w-[115px] border-b-2', index <= activeStep ? 'border-primary' : 'border-gray-300')}></div>}

          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <div
              // onClick={() => setActiveStep(index)}
              className={clsx(
                'relative z-10 w-[32px] h-[32px] flex items-center justify-center rounded-full border-2 transition-all',

                index < activeStep
                  ? 'border-primary bg-primary text-white'
                  : index === activeStep
                  ? 'border-primary bg-transparent'
                  : 'border-gray-300 bg-transparent text-gray-300',
              )}
            >
              {index === activeStep && <div className="w-[10px] h-[10px] bg-primary rounded-full"></div>}
              {index < activeStep && (
                <div className="text-white">
                  <MdCheck />
                </div>
              )}
            </div>

            {/* Step Name */}
            <div className="w-full flex justify-center">
              <span className={clsx('absolute top-8 text-[16px] font-medium whitespace-nowrap', index <= activeStep ? 'text-primary' : 'text-gray-300')}>{step}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepperIndicator;
