import React from 'react';

const About = () => {
  return (
    <main className="bg-[#02191D] md:h-dvh p-10 flex justify-center">
      <div className="border border-[#0E464F] md:w-[40rem] md:h-[110rem] rounded-2xl">
        <div className="text-white p-7 space-y-3 roboto font-extralight">
          <h2>Event Ticket Booking UI – Open Source Practice Project 🎟️</h2>

          <h3>Overview</h3>
          <p>
            This is a beginner-friendly yet practical Event Ticket Booking UI designed for developers to 
            clone, explore, and build upon. The design focuses on a seamless, login-free ticket reservation 
            flow, allowing users to book event tickets quickly and efficiently.
          </p>
          <p>
            The project consists of a three-step ticket booking flow, and developers can extend it further 
            by integrating payment solutions, user authentication (optional), and ticket validation systems.
          </p>

          <h3>Flow & Features</h3>

          <h4>1️⃣ Ticket Selection</h4>
          <ul className="list-disc pl-9">
            <li>Users can browse available tickets (Free & Paid).</li>
            <li>Ticket options are displayed in a list or card view.</li>
            <li>For Free Tickets → Clicking “Get Free Ticket” proceeds to attendee details.</li>
            <li>For Paid Tickets → Clicking “Purchase Ticket” would ideally open a payment modal.</li>
          </ul>

          <h4>2️⃣ Attendee Details Form</h4>
          <ul className="list-disc pl-9">
            <li>Users input their Name, Email, and optional Phone Number.</li>
            <li>Profile picture upload option with preview functionality.</li>
            <li>Ticket summary is visible to ensure users review their details before submission.</li>
          </ul>

          <h4>3️⃣ Payment or Success Page</h4>
          <ul className="list-disc pl-9">
            <li>If the ticket is free, the user is taken directly to the Ticket Confirmation Page.</li>
            <li>
              If the ticket is paid, developers can integrate Stripe, Paystack, or Flutterwave to process 
              payments before showing the confirmation page.
            </li>
            <li>Upon successful booking, users should receive:</li>
            <ul className="list-disc pl-10">
              <li>A visual ticket preview with a unique QR Code.</li>
              <li>An option to download the ticket as a PDF or save it to their device.</li>
              <li>An email confirmation containing ticket details.</li>
            </ul>
          </ul>

          <h3>How to Build This 🚀</h3>

          <h4>📌 Frontend (Next.js or React)</h4>
          <ul className="list-disc pl-9">
            <li>Component Breakdown:</li>
            <ul className="list-disc pl-10">
              <li>TicketCard.tsx → Displays ticket details</li>
              <li>AttendeeForm.tsx → Captures user details</li>
              <li>PaymentModal.tsx → Handles payment processing</li>
              <li>SuccessScreen.tsx → Shows the final ticket preview</li>
            </ul>
            <li>State Management: React’s Context API, Zustand, or Redux (if needed).</li>
            <li>
              File Handling: Users should be able to upload images (profile picture for ticket) using 
              Firebase Storage, Cloudinary, or local preview with URL.createObjectURL().
            </li>
          </ul>

          <h4>📌 Backend (Optional)</h4>
          <ul className="list-disc pl-9">
            <li>If persistence is required, a backend can be built using:</li>
            <ul className="list-disc pl-10">
              <li>Node.js & Express or Firebase Functions</li>
              <li>Database: MongoDB, PostgreSQL, or Firebase Firestore to store ticket records</li>
            </ul>
          </ul>

          <h4>📌 Payment Integration</h4>
          <ul className="list-disc pl-9">
            <li>For paid events, developers should integrate:</li>
            <ul className="list-disc pl-10">
              <li>Stripe Checkout (for international transactions)</li>
              <li>Paystack or Flutterwave (for African users)</li>
            </ul>
          </ul>

          <h3>What You’ll Learn 🧑‍💻</h3>
          <ul className="list-disc pl-9">
            <li>File handling & validation (profile picture uploads).</li>
            <li>Dynamic UI updates based on ticket selection.</li>
            <li>Persisting bookings using local state or a backend.</li>
            <li>Integrating payment gateways for ticket purchases.</li>
            <li>Generating & validating QR Codes for event check-in (Advanced).</li>
          </ul>

          <p>Need Help? Reach Out! 💬</p>
        </div>
      </div>
    </main>
  );
};

export default About;
