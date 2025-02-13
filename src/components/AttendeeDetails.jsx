import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import TicketProgress, { ticketProcess } from '../components/TicketProgress';
import DragAndDropInput from './DragAndDropInput';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const regFormSchema = yup.object().shape({
  fullName: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  textarea: yup.string().max(300, "Maximum 300 characters").nullable(),
});

const AttendeeDetails = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [textarea, setTextarea] = useState("");

  const [loading, setLoading] = useState(false);
  const totalSteps = 3;
  const [ currentStep, setCurrentStep] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors, // Extract clearErrors here
  } = useForm({
    resolver: yupResolver(regFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      textarea: "",
    }
  });

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("attendeeDetails", JSON.stringify(data));
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      navigate(ticketProcess[currentStep]?.link);
    }, 2000);
  };

  return (
    <>
    {loading && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400"></div>
        </div>
      )}


    {/* Attendee */}
    <div className={`w-[22rem] md:w-[40rem] md:h-[60rem] h-auto border border-[#0E464F] bg-[#08252B] md:bg-[#041E23] rounded-3xl p-5 md:p-12 mb-5 transition-all duration-200 ${loading ? "blur-md" : ""}`} >

    <TicketProgress currentStep={currentStep} totalSteps={totalSteps} />

      <div className='md:border border-[#0E464F] md:bg-[#08252B] rounded-2xl md:p-5'>

        {/* Profile photo*/}
        <div className='bg-[#052228] flex flex-col items-center border border-[#0E464F] rounded-2xl p-4  md:p-6'>
          <div className='md:w-full p-3 space-y-5 md:space-y-8'>
            <h4 className='text-xs roboto font-extralight'>Upload Profile Photo</h4>
            <div className='relative bg-[#041b20] h-32 w-full hidden md:block'>
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  transform w-40 h-40 border border-[#24A0B5] rounded-2xl bg-[#0E464F] flex overflow-hidden'>
                <DragAndDropInput/>
              </div>
            </div >
            {/* mobile upload */}
            <div className='md:hidden w-48 h-48 border border-[#24A0B5] rounded-2xl bg-[#0E464F] flex overflow-hidden'>
            <DragAndDropInput/>
            </div>
          </div>
      </div>
          <span className='inline-block w-full h-0.5 bg-[#0E464F] rounded-2xl my-5'></span>

          {/* Form */}
          <div>
            <form className='' onSubmit={handleSubmit(onSubmit)}>
              {/* name */}
             <label className='roboto font-extralight text-sm'>
              Enter your name
              <input type="text"
              {...register("fullName")}
              onChange={(event) => {
                setEmail(event.target.value);
                clearErrors("fullName");}}
              className="w-full p-3 h-[55px] text-sm lg:text-[16px] text-white rounded-2xl border-[1px] border-[#07373F] focus:border-[#07373F] focus:ring-0"
              style={{ outline: "none", boxShadow: "none" }}
              />
              <p className="text-green-500 text-xs mb-5">{errors.fullName?.message}</p>
              </label> 

              {/* email */}
             <label className='roboto font-extralight text-sm'>
              Enter your email
              <input type="email"
              {...register("email")}
              placeholder='hello@avioflagos.io'
              onChange={(event) => {
                setEmail(event.target.value);
                clearErrors("email");}}
              className="w-full p-3 h-[55px] text-sm lg:text-[16px] text-white rounded-2xl border-[1px] border-[#07373F] focus:border-[#07373F] focus:ring-0"
              style={{ outline: "none", boxShadow: "none" }}
              />
              <p className="text-green-500 text-xs mb-5">{errors.email?.message}</p>
              </label> 


              {/* textarea */}
             <label className='roboto font-extralight text-sm'>
              Special request?
              <textarea type="text"
              {...register("textarea")}
              placeholder='Textarea'
              onChange={(event) => setTextarea(event.target.value)}
              className="w-full p-3 h-[110px] text-sm lg:text-[16px] text-white rounded-2xl border-[1px] border-[#07373F] focus:border-[#07373F]"
              style={{ outline: "none", boxShadow: "none", resize: "none" }}
              />
              </label> 


          <div className='md:flex justify-between w-full space-y-3 md:space-y-0 md:space-x-5 mt-7'>
            {currentStep > 1 && (
            <button className='border border-[#24A0B5] text-[#24A0B5] p-3 w-full md:w-1/2 rounded-xl' onClick={() => {const newStep = Math.max(currentStep - 1, 1); navigate(ticketProcess[newStep - 1]?.link)}}>Back</button>
            )}

            {currentStep < totalSteps && (
               <button className='bg-[#24A0B5] text-white p-3.5 w-full md:w-1/2 rounded-xl' type='submit' disabled={loading}> {loading ? "Loading..." : "Next"}</button>
            )}
            
          </div>
            </form>
            
          </div>

          
        </div>
    </div>
    
    </>
  )
}

export default AttendeeDetails