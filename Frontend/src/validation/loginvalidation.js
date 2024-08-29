const loginvalidation=(values)=>{
    console.log(values)
    let errors={}
    if(!values.userid){
        errors.userid="User id is required"
    }
    if(!values.pwd){
        errors.pwd="Password is required"
    }     
    return errors;
}

export default loginvalidation;