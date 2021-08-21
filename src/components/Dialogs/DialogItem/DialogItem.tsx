import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import s from './../Dialogs.module.css'

const DialogItem: FC<PropsType> = (props) => {
    let path = "/Dialogs/" + props.id;
    return (
        <div className={s.dialog}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    );
}

export default DialogItem

type PropsType = {
    id: number
    name: string
}