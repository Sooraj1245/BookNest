import { useParams } from "react-router-dom"

export default function Details(){
    const {id}=useParams();

    return (
        <section className="book-details-section">
            <div className="details-main-container">
                <div className="details-img-container">
                <img src="../src/assets/fiction.jpg" alt="Book" />
                </div>
                <div className="details-text-container">
                    <div className="details-text-inner-container">
                        <div className="details-main-title-container">
                            <h1>Title</h1>
                            <h2>By: Author</h2>
                            <h3>Published By: Publisher</h3>
                        </div>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque cum soluta aliquid necessitatibus repellendus nisi fugiat possimus, voluptas at doloribus officiis porro culpa quas, omnis minima tempora facilis incidunt in.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt illum asperiores officia eos dicta iure nam corrupti dolor odio consectetur consequuntur, rem tempore blanditiis minus laborum repudiandae fuga. Harum, repudiandae?

                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis at provident quidem temporibus ipsa nesciunt, quo corrupti facilis facere cupiditate reprehenderit laborum, odio sapiente maxime sequi mollitia quod architecto? Necessitatibus!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}