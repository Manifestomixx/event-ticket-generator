import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Barcode from "../components/Barcode";
import jsPDF from "jspdf";
import domtoimage from 'dom-to-image';

const Tickets = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ticketRef = useRef(null);
  const [attendeeDetails, setAttendeeDetails] = useState({});
  const [profileImage, setProfileImage] = useState("");
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const tickets = [
    { index: 0, price: "Free", tag: "REGULAR ACCESS", day: "20/52" },
    { index: 1, price: "$150", tag: "VIP ACCESS", day: "20/52" },
    { index: 2, price: "$150", tag: "VVIP ACCESS", day: "20/52" }
  ];

  const hasPurchasedTicket = () => {
    return selectedTicket !== null || localStorage.getItem("freeTicket") !== null;
  };

  const downloadAsImage = async () => {
    if (!ticketRef.current) return;
    try {
      const imgData = await domtoimage.toPng(ticketRef.current);
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "ticket.png";
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const downloadAsPDF = async () => {
    if (!ticketRef.current) return console.error("Ticket reference is null!");
    try {
      const options = {
        quality: 1,
        width: ticketRef.current.offsetWidth * 2,
        height: ticketRef.current.offsetHeight * 2,
        style: {
          transform: "scale(2)",
          transformOrigin: "top left",
          background: "white",
        },
      };
      const imgData = await domtoimage.toPng(ticketRef.current, options);
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (ticketRef.current.offsetHeight * imgWidth) / ticketRef.current.offsetWidth;
      pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);
      pdf.save("ticket.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("attendeeDetails");
      const savedTicket = localStorage.getItem("selectedTicket");
      const savedCount = localStorage.getItem("ticketCount");
      const storedImage = localStorage.getItem("profileImage");
      if (savedTicket) setSelectedTicket(JSON.parse(savedTicket));
      if (savedCount) setTicketCount(JSON.parse(savedCount));
      if (storedImage) setProfileImage(storedImage);
      if (storedData) setAttendeeDetails(JSON.parse(storedData));
    } catch (error) {
      console.error("Error loading localStorage data:", error);
    }
  }, []);

  const purchasedTicket = tickets.find(ticket => ticket.tag === selectedTicket?.tag);

  if (!hasPurchasedTicket()) {
    return (
      <main className="bg-[#02191D] h-dvh flex justify-center items-center text-white">
        <h1 className="text-2xl">No ticket has been bought or claimed yet.</h1>
      </main>
    );
  }

  return (
    <main className="bg-[#02191D] md:h-dvh p-10 flex justify-center">
      <div className="before:rounded-tl-full w-[25rem] md:w-[40rem] md:h-[78rem] border border-[#0E464F] bg-[#08252B]  md:bg-[#041E23] rounded-3xl p-5 md:p-12 mb-5">
        <div className="text-center roboto flex flex-col justify-center items-center">
          <h1 className="text-3xl my-3 text-white">Your Tickets</h1>
          <p className="text-sm text-center font-extralight text-white">
            Check your email for a copy or you can <span className="font-semibold">download</span>
          </p>

          {/* Ticket */}
          <div className="md:p-10">
            <div ref={ticketRef} className="bg-[url('/src/assets/ticket.svg')] bg-no-repeat md:bg-cover p-5 md:p-7 md:h-[52rem] bg-center h-[47rem] w-[20rem] md:w-[26rem] bg-contain">
              <div className="bg-gradient-to-b from-[#133D44] via-[#042a31] to-[#08343C] flex flex-col items-center border border-[#0E464F] rounded-2xl md:p-2 md:h-[39rem] mt-13 md:mt-0">

          {/* Banner */}
                <div className="md:space-y-2 text-white">
                  <h1 className="special text-[36px] md:text-4xl md:mt-7 mt-2 ">Techember Fest "25</h1>
                  <div className="text-xs font-extralight md:space-y-2">
                    <p>📍04 Rumens road, Ikoyi, Lagos</p>
                    <p>📆March 15, 2025 | 7:00 PM</p>
                  </div>
                </div>

          {/* Image */}
                <div className="md:w-full p-3 flex justify-center mt-1">
                  <div className="w-46 h-46 border border-[#24A0B5] rounded-2xl bg-[#0E464F] overflow-hidden hidden md:block">
                    {profileImage && <img src={profileImage || "/placeholder.jpg"} alt="Profile" className="w-48 h-48" />}
                  </div>
                  <div className="md:hidden w-36 h-36 border border-[#24A0B5] rounded-2xl bg-[#0E464F] flex overflow-hidden">
                  {profileImage && <img src={profileImage || "/placeholder.jpg"} alt="Profile" className="w-48 h-48" />}
                  </div>
                </div>


            {/* Ticket information */}
                <div className="p-3 w-full md:mt-4">   
                <div className="bg-[#08343C] border border-[#133D44] text-start text-white p-4 rounded-lg shadow-lg w-full max-w-md">
                  <div className="grid grid-cols-2">
                    <div className="space-y-1 border-b  border-[#12464E] pb-1">
                      <p className="text-[9px] md:text-xs text-gray-400">Enter your name</p>
                      <p className="text-xs md:text-sm">{attendeeDetails.fullName}</p>
                    </div>
                    <div className="space-y-1 border-b border-l pl-2 border-[#12464E] ">
                      <p className="text-[9px] md:text-xs text-gray-400">
                        Enter your email *
                      </p>
                      <p className="text-[10px] md:text-sm">{attendeeDetails.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-[#12464E]">
                    <div className="space-y-1 border-b border-[#12464E] py-1">
                      <p className="text-[9px] md:text-xs text-gray-400 ">Ticket Type:</p>
                      <p className="text-xs md:text-sm">{selectedTicket !== null && tickets[selectedTicket] ? tickets[selectedTicket].tag : "N/A"}</p>
                    </div>
                    <div className="space-y-1 border-b border-l pl-2 py-1 border-[#12464E] ">
                      <p className="text-[9px] md:text-xs text-gray-400">Ticket for :</p>
                      <p className="text-xs md:text-sm">{ticketCount}</p>
                    </div>
                  </div>

                  <div className="pt-3">
                    <p className="text-xs text-gray-400 mb-1">Special request?</p>
                    <p className="font-extralight text-xs md:text-sm">
                      {attendeeDetails.textarea}
                    </p>
                  </div>
                </div>
              </div>
              </div>
              <Barcode value="1234567891026"/>
            </div>
          </div>

          <button
              className="bg-[#24A0B5] text-white p-3.5 w-full md:w-1/2 rounded-xl cursor-pointer"
              onClick={downloadAsPDF}
            >
              Download Ticket
            </button>
        </div>
      </div>
    </main>
  );
};

export default Tickets;
