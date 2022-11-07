import { ReactNode } from "react";

type AlertProps = {
    children: ReactNode;
    type: "danger" | "success";
}

const Alert = ({ children, type }: AlertProps) => {
    return <div className={["alert", type].join(" ")}>{children}</div>
}

export default Alert;