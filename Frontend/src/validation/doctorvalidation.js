const doctorvalidation = (values) => {
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

    if (!values?.qualification) {
        errors.qualification = "Qualification is required";
    }

    if (!values?.speciality) {
        errors.speciality = "Speciality is required";
    }

    if (!values?.age) {
        errors.age = "Age is required";
    } else if (values.age <= 0 || values.age > 120) {
        errors.age = "Please enter a valid age (1-120)";
    }

    if (!values?.phone) {
        errors.phone = "Phone no is required";
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
};

export default doctorvalidation;



// const doctorvalidation=(values)=>{
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
//     if(!values?.qualification){
//         errors.qualification="Qualification is required"
//     }
//     if(!values?.speciality){
//         errors.speciality="Speciality is required"
//     }
//     if(!values?.age){
//         errors.age="Age is required"
//     }
//     if(!values?.phone){
//         errors.phone="Phone no is required"
//     }
//     if(!values?.pwd){
//         errors.pwd="Password is required"
//     }

//     return errors;
// }

// export default doctorvalidation;