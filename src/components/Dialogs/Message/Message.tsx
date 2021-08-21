import React, { FC } from 'react'
import s from './../Dialogs.module.css'

const Message: FC<PropsType> = (props) => {

    return (
        <div className={s.message}>{props.message}</div>
    );
}

export default Message

type PropsType = {
    message: string
}