export default function ReusableButton({ value, handleSubmit }) {
    return (
        <div className="text-center bg-gray-900 text-white font-semibold font-md py-2 my-4 rounded-sm">
            <button onClick={handleSubmit}>{value}</button>
        </div>
    )
}
