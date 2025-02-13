import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import TicketProgress, { ticketProcess } from '../components/TicketProgress';

const SelectTicket = () => {
  const [ selectedTicket, setSelectedTicket ] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  
  const totalSteps = 3;
  const [currentStep, setCurrentStep] = useState(1);

  const tickets = [
    {index: 0,price: "Free", tag: "REGULAR ACCESS", day: "20/52"},
    {index: 1,price: "$150", tag: "VIP ACCESS", day: "20/52"},
    {index: 2,price: "$150", tag: "VVIP ACCESS", day: "20/52"}
  ];

  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    const savedTicket = localStorage.getItem("selectedTicket");
    const savedCount = localStorage.getItem("ticketCount");

    if (savedTicket !== null) setSelectedTicket(JSON.parse(savedTicket));
    if (savedCount !== null) setTicketCount(JSON.parse(savedCount));
  }, []);

  const handleSelectTicket = (index) => {
    setSelectedTicket(index);
    localStorage.setItem("selectedTicket", JSON.stringify(index));
  };

  const handleNext = () => {
    if (selectedTicket !== null) {
      localStorage.setItem("selectedTicket", JSON.stringify(selectedTicket));
      localStorage.setItem("ticketCount", JSON.stringify(ticketCount));
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    } else {
      alert("Please select a ticket type.");
    }
  };

  useEffect(() => {
    if (currentStep > 1) {
      navigate(ticketProcess[currentStep - 1]?.link);
    }
  }, [currentStep]);
  
  return (
   <>
    <div className='w-[22rem] md:w-[40rem] md:h-[46rem] border border-[#0E464F] bg-[#08252B] md:bg-[#041E23] rounded-3xl p-5 md:p-12 mb-5'>

    <TicketProgress currentStep={currentStep} totalSteps={totalSteps} />


      <div className='md:border border-[#0E464F] md:bg-[#08252B] rounded-2xl md:p-5'>

        {/* Banner and time */}
        <div className='bg-gradient-to-br from-[#0E464F] to-[#052228] flex flex-col items-center border border-[#0E464F] rounded-2xl p-3'>
          <h1 className='special text-[46px] md:text-6xl '>Techember Fest "25</h1>
          <p className='text-center roboto text-xs w-3/4 md:w-3/5 md:text-sm font-extralight mb-8 md:my-2 tracking-wide leading-snug'>Join us for an unforgettable experience at [Event Name]! Secure your spot now.</p>
          <div className='hidden md:flex font-light text-sm roboto gap-3 items-center'>
            <p>📍[Event Location]</p><span className='border-x h-[13px] w-3'></span> <p>March 15, 2025 | 7:00 PM</p>
          </div>

          {/* mobile */}
          <div className='text-center text-sm sm:hidden roboto font-extralight space-y-1'>
            <p>📍[Event Location]</p>
            <p>March 15, 2025 | <span>7:00 PM</span></p>
          </div>
      </div>
          <span className='inline-block w-full h-0.5 bg-[#0E464F] rounded-2xl my-5'></span>

          {/* Ticket type */}
          <div>
            <h3 className='mb-2 text-xs md:text-sm  roboto font-extralight'>Select Ticket Type:</h3>
            <div className=' space-y-4 md:space-y-0 md:flex bg-[#041E23] border border-[#07373F] p-3 rounded-2xl justify-between'> 
              {tickets.map((ticket) => (
                <div key={ticket.index} className={`border border-[#197686] p-3 md:w-[140px] rounded-2xl transition-all duration-200 ${selectedTicket === ticket.index ? "bg-[#12464E]" : "bg-[#052228]"} cursor-pointer`} onClick={() => handleSelectTicket(ticket.index)}>
                    <h1 className='text-xl font-semibold roboto mb-2'>{ticket.price}</h1>
                    <h2 className='text-[12px] roboto font-extralight md:font-light'>{ticket.tag}</h2>
                    <p className='text-[12px] roboto font-light text-gray-300'>{ticket.day}</p>
                </div>
              ))}

            </div>
          </div>

          {/* Ticket number */}
          <div className='my-6'>
            <h3 className='mb-3 text-xs md:text-sm roboto font-extralight'>Number of Tickets</h3>
            <select className='w-full border border-[#0E464F] bg-[#08252B] rounded-lg p-2 ' value={ticketCount}
            onChange={(e) => setTicketCount(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
            </select>
          </div>
          <div className='md:flex justify-between w-full space-y-3 md:space-y-0 md:space-x-5 mt-7'>
            <button className='border border-[#24A0B5] text-[#24A0B5] p-3 w-full md:w-1/2 rounded-2xl' onClick={() => navigate(0)}>Cancel</button>

            {currentStep < totalSteps && (
                <button className='bg-[#24A0B5] text-white p-3.5 w-full md:w-1/2 rounded-2xl' onClick={() => {setCurrentStep((prev) => Math.min(prev + 1, totalSteps)); navigate(ticketProcess[currentStep]?.link)}}>Next</button>
            )}
          </div>
        </div>
    </div>
   
   </>
  )
}

export default SelectTicket