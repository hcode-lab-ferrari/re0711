const Contact = () => {
    return <section id="contact">
        <h2>Entre em Contato</h2>

        <section>
            <form>
                <header className="page-title">
                    <h1>Formulário</h1>
                    <hr />
                </header>

                <p>Envie o formulário abaixo para entrar em contato conosco.</p>

                <div className="alert danger">Preencha todos os campos</div>

                <div className="fields">
                    <div className="field">
                        <input type="text" name="name" id="name" />
                        <label htmlFor="name">Nome Completo</label>
                    </div>
                    <div className="field">
                        <input type="email" name="email" id="email" />
                        <label htmlFor="email">E-mail</label>
                    </div>
                </div>
                <div className="field">
                    <textarea name="message" id="message"></textarea>
                    <label htmlFor="message">Mensagem</label>
                </div>
                <div className="actions">
                    <button type="submit">Enviar</button>
                </div>
            </form>
            <div id="map"></div>
        </section>
        <hr className="divider" />
        <ul className="contacts">
            <li>
                <img src="/images/icon-google-place.svg" alt="Icon" />
                <p className="title">OUR HEADQUARTERS</p>
                <p>Modena, Itália</p>
            </li>
            <li>
                <img src="/images/icon-phone.svg" alt="Icon" />
                <p className="title">SPEAK TO US</p>
                <p>(123) 456 7890</p>
            </li>
            <li>
                <img src="/images/icon-skype.svg" alt="Icon" />
                <p className="title">MAKE A VIDEO CALL</p>
                <p>FerrariOnSkype</p>
            </li>
            <li>
                <img src="/images/icon-google-place.svg" alt="Icon" />
                <p className="title">FOLLOW ON TWITTER</p>
                <p>2.3M Followers</p>
            </li>
        </ul>
    </section>
}

export default Contact;