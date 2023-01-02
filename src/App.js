import {Fragment, useCallback, useEffect, useState} from "react";

import {fetchData} from "./api/fetchData";

import Cell from "./components/Cell";
import Loader from "./common/Loader/Loader";

import './App.scss';

const App = () => {
    const [description, setDescription] = useState([]);
    const [cells, setCells] = useState([]);
    const [selectedCells, setSelectedCells] = useState([]);

    const [dimension, setDimension] = useState(5);
    const [mode, setMode] = useState('Pick mode');

    const [isStartGame, setIsStartGame] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetchData().then(res => {
            setDescription(res);
            setIsLoading(false);
        });
    }, []);

    const makeBoard = useCallback(() => {
        const arr = [];

        for(let i = 1 ; i <= dimension ; i++) {
            for(let j = 1 ; j <= dimension ; j++) {
                arr.push(<Cell onCellHover={onCellHover} x={i} y={j}/>)
            }
        }

        setCells(arr);
    }, [dimension]);

    useEffect(() => {
        makeBoard();
    }, [dimension, makeBoard]);

    const onCellHover = ({x, y}) => {
        setSelectedCells(prevState => {
            const isExist = prevState.find(el => el.x === x && el.y === y);

            if (isExist) {
                return prevState.filter(el => el.x !== x || el.y !== y);
            } else {
                return [...prevState, {x, y}];
            }
        });
    };

    const handleChangeSelect = (event) => {
        const name = event.target.value;

        setMode(name);
        setSelectedCells([]);
        setIsStartGame(false);
    };

    const handleStartGameClick = () => {
        for (let i = 0 ; i < description.length ; i++) {
            const curDataDesc = description[i];

            if (curDataDesc.name === mode) {
                setDimension(curDataDesc.field);
            }
        }

        setIsStartGame(true);
        mode === 'Pick mode' && setMode('Easy');
    };

    const boardStyles =
        dimension === 15
            ? "board board__md"
            : dimension === 25
                ? "board board__lg"
                : "board"
    ;

    return isLoading ? <div className="loader">
        <Loader />
    </div> : (
        <div className="container">

            <div>
                <div className="selectWrapper">
                    <select onChange={handleChangeSelect} value={mode} className="select">
                        <option disabled value="Pick mode">Pick mode</option>
                        <option value="Easy">Easy mode</option>
                        <option value="Normal">Normal mode</option>
                        <option value="Hard">Hard mode</option>
                    </select>
                    <button className="startBtn" onClick={handleStartGameClick}>Start</button>
                </div>

                {
                    isStartGame
                        ?
                        <div className={boardStyles}>
                            {
                                cells.map((el, index) => {
                                    return <Fragment key={index}>{el}</Fragment>;
                                })
                            }
                        </div>
                        : <h2>To start game set mode and click Start</h2>
                }
            </div>
            <div className="selectedCells">
                <h1 className="selectedCells__title">Hover squares</h1>
                {
                    selectedCells.length  ?
                            selectedCells.map((el, index) => {
                                const { x, y } = el;

                                return <p className="selectedCells__item" key={index}>row {x} cell {y}</p>
                            })
                        : <p>There are no hovered cells</p>
                }
            </div></div>
    );
};

export default App;
