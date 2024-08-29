export default function patientvalidation(user) {
    const errors = {};


    if (!user.name.trim()) {
        errors.name = "Name is required";
    }


    if (!user.gender) {
        errors.gender = "Gender is required";
    }


    if (!user.address.trim()) {
        errors.address = "Address is required";
    }


    if (!user.age || user.age <= 0 || user.age > 120) {
        errors.age = "Please enter a valid age (1-120)";
    }


    const phonePattern = /^[789]\d{9}$/;
    if (!user.phone || !phonePattern.test(user.phone)) {
        errors.phone = "Please enter a valid 10-digit mobile number";
    }

    return errors;
}


// const patientvalidation=(values)=>{
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
//     if(!values?.age){
//         errors.age="Age is required"
//     }
//     if(!values?.phone){
//         errors.phone="Phone no is required"
//     }
//     return errors;
// }

// export default patientvalidation;