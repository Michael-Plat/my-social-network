import React, { FC } from 'react'
import { InitialStateType } from '../../../redax/sadeBarReducer'
import s from './../Navbar.module.css'

const FriendsBar: FC<PropsType> = ({ sadeBar }) => {
    const friendAvatarName = sadeBar.nameAvatarFriends.map((n) =>
        <div key={n.id}>
            <img className={s.imgName} src={n.avatar} />
            <p className={s.name}>{n.name}</p>
        </div>)
    return (
        <div>
            {friendAvatarName}
        </div>
    )
}

export default FriendsBar

export type PropsType = {
    sadeBar: InitialStateType
}