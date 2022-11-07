import { useMenu } from "../../../contexts/MenuContext/useMenu";

const Header = () => {

    const { setIsOpen } = useMenu();

    return <header id="header">
        <div className="overlay" data-close="menu" onClick={() => setIsOpen(false)}></div>
        <a href="index.html#home"
        ><img src="/images/ferrari-logo.svg" className="logo" alt="Logo"
            /></a>
        <button
            type="button"
            id="btn-open"
            aria-label="Abrir Menu"
            onClick={() => setIsOpen(true)}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
            >
                <path d="M0,0H32V32H0Z" fill="none" />
                <path
                    d="M3,18H29V16H3Zm0-5H29V11H3ZM3,6V8H29V6Z"
                    transform="translate(0 4)"
                />
            </svg>
        </button>
        <div className="menu logged">
            <nav>
                <button
                    type="button"
                    id="btn-close"
                    data-close="menu"
                    aria-label="fechar"
                    onClick={() => setIsOpen(false)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z"
                        />
                        <path d="M0,0H24V24H0Z" fill="none" />
                    </svg>
                </button>
                <ul>
                    <li><a href="index.html#home">Home</a></li>
                    <li><a href="index.html#service">Revisão</a></li>
                    <li><a href="index.html#contact">Contato</a></li>
                    <li className="divider"><hr /></li>
                    <li className="hide-guest">
                        <a href="schedules.html">Agendamentos</a>
                    </li>
                    <li className="hide-guest"><a href="profile.html">Editar Dados</a></li>
                    <li className="hide-guest">
                        <a href="change-photo.html">Mudar Foto</a>
                    </li>
                    <li className="hide-guest">
                        <a href="change-password.html">Alterar Senha</a>
                    </li>
                </ul>
            </nav>
            <div className="footer">
                <hr />
                <div>
                    <picture>
                        <a href="#"
                        ><img src="/images/user.png" alt="João Rangel"
                            /></a>
                    </picture>
                    <div>
                        <a href="#">
                            <strong>João Rangel</strong>
                            <small>joao@hcode.com.br</small>
                        </a>
                    </div>
                    <button type="button" aria-label="botao">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path d="M0,0H24V24H0Z" fill="none" />
                            <path
                                d="M10.09,15.59,11.5,17l5-5-5-5L10.09,8.41,12.67,11H3v2h9.67ZM19,3H5A2,2,0,0,0,3,5V9H5V5H19V19H5V15H3v4a2,2,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V5A2.006,2.006,0,0,0,19,3Z"
                                fill="#333"
                            />
                        </svg>
                    </button>
                </div>
                <a href="auth.html" className="btn-register"> Minha Conta </a>
            </div>
        </div>

        <hr className="italy" />
    </header>
}

export default Header;