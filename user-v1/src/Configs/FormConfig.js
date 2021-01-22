import InputField from '../DyanamicComponents/InputField'

export const getFormConfig = (/* { state, onChange } */) => {
    return [
        {
            name: "fullName",
            id: "fullName",
            type: "text",
            label: "Full Name",
            placeholder : "Enter your Full Name",
            Component: InputField,
            /* value: state["fullName"],
            onChange: onChange("fullName"), */
        },
        {
            name: "email",
            id: "email",
            type: "text",
            component: InputField,
            label: "Email Address",
            placeholder : "Enter your email"
            /* value: state["email"],
            onChange: onChange("email"), */
        },
        {
            name: "phoneNumber",
            id: "email",
            type: "number",
            component: InputField,
            label: "Phone Number",
            placeholder : "Enter your Phone Number"
            /* value: state["phoneNumber"],
            onChange: onChange("phoneNumber"), */
        }
    ]
}