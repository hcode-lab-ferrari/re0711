import React from 'react'
import styled from '@emotion/styled';


type DividerProps = {
    logged?: boolean;
    children?: React.ReactNode;
}
export default function Divider(props:DividerProps) {
const LiDivider = styled.li`
  display: ${props.logged? 'flex' : 'none'};
  padding: 5px 0;
 & > hr {
    margin: 15px 0;
 }
`
  return (
    <LiDivider>
        <hr />
        {props.children? props.children : null}
    </LiDivider>
  )
}
