import { Input, InputContainer } from '../styles/style'

export default function ReusableInput({
    label,
    error,
    type,
    value,
    placeholder,
    handleChange,
    ...otherProps
}) {
    return (
        <InputContainer>
            <div>
                <label htmlFor={otherProps.id}>{label}</label>
                <Input
                    type={type}
                    id={otherProps.id}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    {...otherProps}
                />
                {error && <div>{error}</div>}
            </div>
        </InputContainer>
    )
}
