export default function Card({
    photos,
    brand,
    processor,
    ram,
    storage,
    price,
}) {
    console.log(photos + '>>>>photos')
    return (
        <div>
            <div>{/* <img src={url} /> */}PHOTO WILL BE HERE</div>
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
