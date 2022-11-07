const Service = () => {
    return <section id="service">
        <h2>Agende seu Serviço<small>Como funciona?</small></h2>

        <div>
            <div className="icons">
                <figure>
                    <img src="/images/calendar.svg" alt="Escolha a Data e Hora" />
                    <figcaption>Escolha a Data e Hora</figcaption>
                </figure>

                <figure>
                    <img src="/images/tools.svg" alt="Escolha o Serviço" />
                    <figcaption>Escolha o Serviço</figcaption>
                </figure>

                <figure>
                    <img src="/images/payments.svg" alt="Pague Online" />
                    <figcaption>Pague Online</figcaption>
                </figure>
            </div>

            <a href="schedules-new.html" className="btn">Agendar Serviço</a>
        </div>

        <img src="/images/services.svg" alt="Serviços" />
    </section>

}

export default Service;