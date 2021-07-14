
import React from 'react';
import styles from './Paginator.module.css';

const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanget}) => {
    
    const pageCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return <div>
        {pages.map(p => {
            return <span key={p.id} className={currentPage === p && styles.selectedPage}
                onClick={() => { onPageChanget(p); }}>{p}</span>
        })}
    </div>
}

export default Paginator;