import Card from "./Cards";

export default function Trending(){
    return(
        <section className="trending-sec">
            <h1>Trending Right Now</h1>
            <div className="trending-cards">
                <Card />
                <Card />
                <Card />
            </div>
        </section>
    )
}