import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { getIsFetching } from '../../redax/usersSelectors'
import Preloader from '../common/Preloader/Preloader'

import { Users } from './Users'


type getPageSizeType = {
    pageTitle: string
}

export const UsersPage: FC<getPageSizeType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return <>
        <h2>{props.pageTitle}</h2>

        {isFetching ? <Preloader /> : null}

        <Users />
    </>
}
