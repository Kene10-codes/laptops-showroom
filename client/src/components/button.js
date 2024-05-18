export default function ReusableButton({ value, handleSubmit }) {
    return (
        <div>
            <button onClick={handleSubmit}>{value}</button>
        </div>
    )
}
