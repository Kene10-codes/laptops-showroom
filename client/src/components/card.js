export default function Card({
    photos,
    brand,
    processor,
    ram,
    storage,
    price,
}) {
    return (
        <div>
            {photos.map((url, index) => (
                <div key={index}>
                    <img
                        src={url}
                        alt={`Slide ${index + 1}`}
                        className="w-auto h-50"
                    />
                </div>
            ))}
            <div>
                <h2>Specifications</h2>
                <p>Brand: {brand}</p>
                <p>Processor: {processor}</p>
                <p>RAM Size: {ram}</p>
                <p>Storage: {storage}</p>
                <p>Price: {price}</p>
            </div>
        </div>
    )
}
