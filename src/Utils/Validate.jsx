export const checkValidData=(email,password)=>{
  
    const isEmailValid = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const ispasswordValid= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    // const isfullnameValid=/^[A-Za-z]+(?: [A-Za-z]+)+$/.test(name)

   

   if(!isEmailValid) return "Email ID is not valid!!"
   if(!ispasswordValid) return "Password is not valid!!"
//    if(!isfullnameValid) return "Name  is not valid!!"


   return null;
}

