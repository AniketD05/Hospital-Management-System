const receptionvalidation = (values) => {
    let errors = {};

    if (!values?.name) {
        errors.name = "Name is required";
    }

    if (!values?.gender) {
        errors.gender = "Gender is required";
    }

    if (!values?.address) {
        errors.address = "Address is required";
    }

    if (!values?.phone) {
        errors.phone = "Phone number is required";
    } else {
        const phonePattern = /^[789]\d{9}$/; 
        if (!phonePattern.test(values.phone)) {
            errors.phone = "Please enter a valid 10-digit mobile number";
        }
    }

    if ('pwd' in values) {
        if (!values.pwd) {
            errors.pwd = "Password is required";
        } else {
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordPattern.test(values.pwd)) {
                errors.pwd = "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character.";
            }
        }
    }

    return errors;
}

export default receptionvalidation;



// const receptionvalidation=(values)=>{
//     let errors={}
//     if(!values?.name){
//         errors.name="Name is required"
//     }
//     if(!values?.gender){
//         errors.gender="Gender is required"
//     }
//     if(!values?.address){
//         errors.address="Address is required"
//     }    
//     if(!values?.phone){
//         errors.phone="Phone no is required"
//     }
//     if(!values?.pwd){
//         errors.pwd="Password is required"
//     }

//     return errors;
// }

// export default receptionvalidation;