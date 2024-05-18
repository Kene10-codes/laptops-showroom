import { Button } from '../styles/style'

export default function ReusableButton({ value, handleSubmit }) {
    return (
        <div>
            <Button onClick={handleSubmit}>{value}</Button>
        </div>
    )
}
