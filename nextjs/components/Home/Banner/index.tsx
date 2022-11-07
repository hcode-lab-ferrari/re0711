const Banner = () => {
    return <section id="home">
        <header>
            <h1>SF90 Stradale</h1>
            <a href="#home">Detalhes</a>
        </header>

        <section className="gallery">
            <figure>
                <picture>
                    <source
                        srcSet="/images/ferrari-amarela.webp"
                        type="image/webp"
                    />
                    <source
                        srcSet="/images/ferrari-amarela.jpg"
                        type="image/jpeg"
                    />
                    <img
                        src="/images/ferrari-amarela.png"
                        alt="Ferrari Amarela"
                    />
                </picture>
                <figcaption>
                    <h2>Esportivas</h2>
                    <p>Ferrari F1000</p>
                </figcaption>
            </figure>

            <figure>
                <picture>
                    <source
                        srcSet="/images/ferrari-interior.webp"
                        type="image/webp"
                    />
                    <source
                        srcSet="/images/ferrari-interior.jpg"
                        type="image/jpeg"
                    />
                    <img
                        src="/images/ferrari-interior.jpg"
                        alt="Ferrari Interior"
                    />
                </picture>
                <figcaption>
                    <h2>Esportivas</h2>
                    <p>Ferrari F1000</p>
                </figcaption>
            </figure>

            <figure>
                <picture>
                    <source
                        srcSet="/images/ferrari-azul.webp"
                        type="image/webp"
                    />
                    <source srcSet="/images/ferrari-azul.jpg" type="image/jpeg" />
                    <img src="/images/ferrari-azul.jpg" alt="Ferrari Azul" />
                </picture>
                <figcaption>
                    <h2>Esportivas</h2>
                    <p>Ferrari F1000</p>
                </figcaption>
            </figure>
        </section>
    </section>
}

export default Banner;