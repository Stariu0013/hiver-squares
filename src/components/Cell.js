import React, {useState} from 'react';

import '../App.scss';

const Cell = (props) => {
    const [classes, setClasses] = useState('cell');
    const {
        x,
        y,
        onCellHover,
    } = props;

    function onHover(event) {
        const { x, y } = event.target.dataset;

        setClasses(prevState => {
            if (classes.includes('cell__hover')) {
                return 'cell';
            } else {
                return [prevState, 'cell__hover'].join(' ')
            }
        });

        onCellHover({
            x: Number(x),
            y: Number(y),
        });
    }

    return (
        <div className={classes} onMouseOver={onHover} data-x={x} data-y={y}/>
    );
};

export default Cell;
