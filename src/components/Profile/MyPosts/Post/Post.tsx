import React, { FC } from 'react';
import s from './Post.module.css';

type PropsType = {
  message: string
  numberLike: number
}

const Post: FC<PropsType> = ({ message, numberLike }) => {
  return (
    <div className={s.item}>
      <img src='https://proprikol.ru/wp-content/uploads/2020/02/kartinki-na-avatarku-dlya-parnej-i-muzhchin-1-1.jpg' />
      {message}
      <div>
        <button>{numberLike} Like</button>
      </div>
    </div>
  );
}

export default Post;
