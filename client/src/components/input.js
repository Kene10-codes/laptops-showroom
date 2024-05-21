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
        <div className="flex flex-col my-2">
            <label
                htmlFor={otherProps.id}
                className="text-sm font-bold text-slate-400"
            >
                {label}
            </label>
            <input
                className="rounded-sm border-2 border-inherit pr-4 pl-2 w-full h-10 outline-slate-50"
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
