import { useMenu } from "../../../contexts/MenuContext/useMenu";
import Menu from "../../Menu";

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
        <Menu/>

        <hr className="italy" />
    </header>
}

export default Header;