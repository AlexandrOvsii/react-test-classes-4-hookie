import React from 'react';
import css from './Button.module.css';

function Button({ loadMore }) {
  return (
    <div className={css.btnWrapper}>
      <button className={css.Button} type="button" onClick={() => loadMore()}>
        Load More
      </button>
    </div>
  );
}

export default Button;
