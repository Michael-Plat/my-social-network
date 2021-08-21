import React, { FC } from 'react'
import { InitialStateType } from '../../../redax/sadeBarReducer'
import s from './../Navbar.module.css'

const FriendsBar: FC<PropsType> = ({ sadeBar }) => {
    return (
        <div>
            <div>
                {/* <img className={s.imgName} src={avatar} />
                {name} */}
            </div>
        </div>
    )
}

export default FriendsBar

type PropsType = {
    sadeBar: InitialStateType
}