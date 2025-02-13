import React from 'react';

export const ticketProcess = [
    {step:1, title: "Ticket Selection", link: "/events/"},
    {step:2, title: "Attendee Details", link: "/events/attendee"},
    {step:3, title: "Ready", link: "/events/ready"},
];


const TicketProgress = ({ currentStep, totalSteps }) => {
    
    const progress = (currentStep / totalSteps) * 100;
   
    return (
        <div className='mb-3'>
            <div className='flex justify-between text-white'>
                <h1 className='font-light  text-2xl'>{ticketProcess.find(process => process.step === currentStep)?.title}</h1>
                <p className='roboto font-light text-sm'>Step {currentStep}/{totalSteps}</p>
            </div>
            <div className='relative inline-block w-full h-1 bg-[#0E464F] rounded-2xl'>
                <span className='absolute bg-[#24A0B5] h-1 rounded-2xl transition-all duration-300' style={{ width: `${progress}%`, minWidth: "5px" }}></span>
            </div>
        </div>
    );
}

export default TicketProgress;
