import Link from 'next/link';
import React, { useState } from 'react'
import { useMenu } from '../../contexts/MenuContext/useMenu';
import Divider from '../Home/Header/Divider';
import MenuData from './MenuData';
type PropsMenu = {
    logged?: boolean;
    children?:React.ReactNode;
}

export default function Menu(props:PropsMenu) {
    const [logged, setLogged] = useState<boolean>(props.logged?true:false);
    const { setIsOpen } = useMenu();
  return (
    <div className="menu">
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
                    {MenuData.map((itemMenu)=> (
        !itemMenu.logged &&  <li key={itemMenu.id}>
                        <Link href={itemMenu.link}>
                            <a onClick={()=> setIsOpen(itemMenu.open)} >{itemMenu.title}</a>
                        </Link>
                    </li>
                    ))}
                   
                    <Divider logged={true}/>
           
                {MenuData.map((itemMenu)=> (
        itemMenu.logged &&  <li key={itemMenu.id}>
                        <Link href={itemMenu.link}>
                            <a onClick={()=> setIsOpen(itemMenu.open)} >{itemMenu.title}</a>
                        </Link>
                    </li>
                    ))}
                   
      
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
                <Link href="/auth">
                <a className="btn-register"> Minha Conta </a>
                </Link>
            </div>
        </div>
  )
}
