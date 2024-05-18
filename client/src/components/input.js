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
        <div>
            <label htmlFor={otherProps.id}>{label}</label>
            <input
                type={type}
                id={otherProps.id}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                {...otherProps}
            />
            {error && <div>{error}</div>}
        </div>
    )
}
