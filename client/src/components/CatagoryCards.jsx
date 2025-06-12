export default function CatagoryCards({title,subtitle,bookImages}){
    return(
        <div className="catagory-card-container">
            <div className="catagory-img-container">
                {bookImages.map((image, index) => (
                <img 
                    key={index}
                    src={image} 
                    alt={`${title} book ${index + 1}`}
                />
                ))}
            </div>
            <div className="title-container">
                <h3>{title}</h3>
                <p>Explore</p>
            </div>
        </div>
    )
}