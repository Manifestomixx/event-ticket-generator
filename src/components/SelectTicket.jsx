import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TicketProgress, { ticketProcess } from '../components/TicketProgress';
import PaymentsModal from '../components/PaymentsModal';


const SelectTicket = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  const totalSteps = 3;
  const [currentStep, setCurrentStep] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedTicket = localStorage.getItem("selectedTicket");
    const savedCount = localStorage.getItem("ticketCount");

    if (savedTicket !== null) setSelectedTicket(JSON.parse(savedTicket));
    if (savedCount !== null) setTicketCount(JSON.parse(savedCount));
  }, [isPaymentModalOpen]);

  const ticketTypes = [
    { index: 0, price: "Free", type: "REGULAR" },
    { index: 1, price: "$150", type: "VIP" },
    { index: 2, price: "$150", type: "VVIP" },
  ];

  const handleSelectTicket = (index) => {
    const selectedTicketObj = ticketTypes.find((ticket) => ticket.index === index);
    setSelectedTicket(selectedTicketObj);
    localStorage.setItem("selectedTicket", JSON.stringify(selectedTicketObj));

    // Open modal only for paid tickets
    if (selectedTicketObj.price !== "Free") {
      setIsPaymentModalOpen(true);
    }
  };


  const handleNext = () => {
    if (selectedTicket !== null) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
        navigate(ticketProcess[currentStep]?.link);
      }, 2000);
    } else {
      alert("Please select a ticket type.");
    }
  };


  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400"></div>
        </div>
      )}

      <div className={`w-[22rem] md:w-[40rem] md:h-[46rem] border border-[#0E464F] bg-[#08252B] md:bg-[#041E23] rounded-3xl p-5 md:p-12 mb-5 transition-all duration-200 ${loading ? "blur-md" : ""}`}>
        <TicketProgress currentStep={currentStep} totalSteps={totalSteps} />

        <div className='md:border border-[#0E464F] md:bg-[#08252B] rounded-2xl md:p-5'>
          <div className='bg-gradient-to-br from-[#0E464F] to-[#052228] flex flex-col items-center border border-[#0E464F] rounded-2xl p-3'>
            <h1 className='special text-[46px] md:text-6xl '>Techember Fest '25</h1>
            <p className='text-center roboto text-xs w-3/4 md:w-3/5 md:text-sm font-extralight mb-8 md:my-2 tracking-wide leading-snug'>
              Join us for an unforgettable experience at [Event Name]! Secure your spot now.
            </p>
          </div>

          <span className='inline-block w-full h-0.5 bg-[#0E464F] rounded-2xl my-5'></span>

          <div>
            <h3 className='mb-2 text-xs md:text-sm roboto font-extralight'>Select Ticket Type:</h3>
            <div className=' space-y-4 md:space-y-0 md:flex bg-[#041E23] border border-[#07373F] p-3 rounded-2xl justify-between'> 
              {[{ index: 0, price: "Free", type: "REGULAR ACCESS", day: "20/52" }, 
                { index: 1, price: "$150", type: "VIP ACCESS", day: "20/52" }, 
                { index: 2, price: "$150", type: "VVIP ACCESS", day: "20/52" }].map((ticket) => (
                <div key={ticket.index} 
                className={`border border-[#197686] p-3 md:w-[140px] rounded-2xl transition-all duration-200 cursor-pointer ${
                  selectedTicket?.index === ticket.index ? "bg-[#12464E]" : "bg-[#052228]"
                }`}
                  onClick={() => handleSelectTicket(ticket.index)}>
                  <h1 className='text-xl font-semibold roboto mb-2'>{ticket.price}</h1>
                  <h2 className='text-[12px] roboto font-extralight md:font-light'>{ticket.type}</h2>
                  <p className='text-[12px] roboto font-light text-gray-300'>{ticket.day}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='my-6'>
            <h3 className='mb-3 text-xs md:text-sm roboto font-extralight'>Number of Tickets</h3>
            <select className='w-full border border-[#0E464F] bg-[#08252B] rounded-lg p-2 ' 
              value={ticketCount} 
              onChange={(e) => setTicketCount(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div className='md:flex justify-between w-full space-y-3 md:space-y-0 md:space-x-5 mt-7'>
            <button className='border border-[#24A0B5] text-[#24A0B5] p-3 w-full md:w-1/2 rounded-2xl' onClick={() => navigate(0)}>Cancel</button>
            {currentStep < totalSteps && (
              <button 
                className='bg-[#24A0B5] text-white p-3.5 w-full md:w-1/2 rounded-2xl' 
                onClick={handleNext} 
                disabled={loading}>
                {loading ? "Loading..." : "Next"}
              </button>
            )}
          </div>
        </div>
      </div>

      {isPaymentModalOpen && (
  // <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
  <PaymentsModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen (false)}/>
)}
    </>
  );
};

export default SelectTicket;
