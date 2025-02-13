import * as yup from "yup"




// For Validation
export const regFormSchema = yup
.object({
  email: yup.string().required("Email is required").email("Invalid email format"),
  fullName: yup.string().required("Username is required"),
  specialRequest: yup.string().required("Username is required"),

})
.required()

