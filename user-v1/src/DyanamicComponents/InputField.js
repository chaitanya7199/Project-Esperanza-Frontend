import React from "react";

const InputField = ({ label, ...props }) => (
    <div>
        {label ? <label htmlFor={props.id}>{label}</label> : null}
        <input {...props} />
    </div>
);

export default InputField;