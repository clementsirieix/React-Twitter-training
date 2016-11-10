//@flow
import React from 'react';

const Button = ({handle}: {handle: Function}) => (
    <button onClick={handle}>locate me!</button>
);

export default Button
