import React, { useEffect, useState } from 'react'

type ToastProps = {
    type?: 'success' | 'danger';
    open?: boolean;
    onClose?: Function;
    children?: React.ReactNode;
}
const Toast: React.FC<ToastProps> = ({ 
    children,
    type = 'success',
    open=true,
    onClose,
}) => {
    const [opened, setOpened] = useState(open);

    const close = () =>{
        if(typeof onClose === 'function'){
            onClose();
        }
        setOpened(false);
    };

    useEffect(()=> setOpened(open), [open]);
  return (
    <div className={['toast', opened ? 'open':'',type].join(' ')}>
        {children}
        <button type="button" className="close" onClick={()=>close()}>
            <span>x</span>
        </button>
    </div>
  )
}

export default Toast