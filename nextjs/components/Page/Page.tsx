import React, { ReactNode } from 'react'
export type PageColor = 'blue' | 'green' | 'yellow' | 'red';

type PageProps = {
    title: string | ReactNode;
    pageColor?: PageColor;
    children?: ReactNode;
    panel?: ReactNode;
    id: string;
}
export default function Page({pageColor, id, title, children, panel}:PageProps) {

  return (
    <section className={[pageColor, 'page', panel? 'with-panel':''].join(' ')} id={id}>
        <header>
            <h1>{title}</h1>
        </header>
        <main>{children}</main>
        {panel && <aside>{panel}</aside>}
    </section>
  )
}

