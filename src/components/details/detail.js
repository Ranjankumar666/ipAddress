import React from 'react';

const Detail = props =>
( <div className={props.style}>
    <p className="heading-sm color-grey uppercase">{props.name}</p>
    <h3 className="heading-md">{props.detail}</h3>
  </div>
  )

export default Detail;
