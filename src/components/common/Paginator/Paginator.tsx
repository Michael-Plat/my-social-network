import React, { FC, useState } from 'react'
import styles from './Paginator.module.css'
import cn from 'classnames'

const Paginator: FC<PropsType> = ({ totalItemsCount, pageSize, currentPage = 1,
    onPageChanget = x => x, portionSize = 10 }) => {

    const pageCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pageCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rigthPortionPageNumber = portionNumber * portionSize;

    return <div className={styles.paginator}>
        {portionNumber > 1 &&
            <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rigthPortionPageNumber)
            .map((p) => {
                return <span className={cn({ [styles.selectedPage]: currentPage === p }, styles.pageNumber)}
                    key={p}
                    onClick={() => { onPageChanget(p); }}>{p}</span>
            })}
        {portionCount > portionNumber &&
            <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
    </div>
}

export default Paginator

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage?: number
    portionSize?: number
    onPageChanget?: (pageNumber: number) => void
}