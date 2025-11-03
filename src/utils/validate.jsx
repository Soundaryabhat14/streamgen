export const validateData = (email, password,name) =>{
    const isEmailValid  = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    const isNameValid = /^[a-zA-Z][a-zA-Z]{0,30}[a-zA-Z]$/.test(name)

    if(!isEmailValid) return "Invalid Email Address";

    if(!isPasswordValid) return "Invalid Password";

    if(!isNameValid) return "Invalid Name";

    return null;
}