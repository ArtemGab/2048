import ReactDOM from "react-dom";
import React, { useEffect, useRef, useState } from "react";
import "./Game.css";
import "./Cells.css";
import { randomNumber, randomCell, getStyled } from "../Utils";

export default function Game() {
    const [cells, setCells] = useState([
        [0, 0, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]);
    //0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    //2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [startTime, setStartTime] = useState(new Date().getTime());
    const threshold = 50;
    const allowedTime = 1000;

    useEffect(() => {
        redrawingCells();
    }, [cells]);

    const board = useRef<HTMLDivElement>(null);

    const redrawingCells = () => {
        cells.forEach((row, i) =>
            row.forEach((num: number, j: number) => {
                const cell = board.current?.children[i].children[j];
                if (cell) {
                    const style = getStyled(num);
                    const div = React.createElement(
                        "div",
                        { className: style },
                        num
                    );
                    ReactDOM.render(div, cell);
                }
            })
        );
    };

    const eventActive = (e: React.MouseEvent) => {
        e.preventDefault();
    };

    const eventStart = (e: React.MouseEvent) => {
        setStartX(e.pageX);
        setStartY(e.pageY);
        setStartTime(new Date().getTime());
        e.preventDefault();
    };

    const touchRight = () => {
        const newCells = JSON.parse(JSON.stringify(cells));

        cells.forEach((row, i) => {
            for (let j = row.length - 1; j >= 0; j--) {
                if (row[j] !== 0) {
                    const value = row[j];
                    row[j] = 0;

                    if (row[3] === 0) row[3] = value;
                    else if (
                        (row[3] !== 0 && row[3] === value && j === 2) ||
                        (row[3] !== 0 &&
                            row[3] === value &&
                            j === 1 &&
                            row[2] === 0) ||
                        (row[3] !== 0 &&
                            row[3] === value &&
                            j === 0 &&
                            row[1] === 0 &&
                            row[2] === 0)
                    )
                        row[3] = value * 2;
                    else if (row[2] === 0) row[2] = value;
                    else if (
                        (row[2] !== 0 && row[2] === value && j === 1) ||
                        (row[2] !== 0 &&
                            row[2] === value &&
                            j === 0 &&
                            row[1] === 0)
                    )
                        row[2] = value * 2;
                    else if (row[1] === 0) row[1] = value;
                    else if (row[1] !== 0 && row[1] === value)
                        row[1] = value * 2;
                    else if (row[0] === 0) row[0] = value;
                }
            }
        });

        let status = false;
        
        for (let i = 0; i <= 3; i++) {
            if (status) {
                status = false;
                break;
            }

            for (let j = 0; j <= 3; j++) {
                if (newCells[i][j] !== cells[i][j]) {
                    addCell();
                    status = true;
                    break;
                }
            }
        }
        // 0,  1,  2, -,
        // 4,  5,  6, -,
        // 8,  9,  10, -,
        // 12, 13, 14, -
    };

    const touchLeft = () => {
        const newCells = JSON.parse(JSON.stringify(cells));

        cells.forEach((row, i) => {
            for (let j = 0; j <= 3; j++) {
                if (row[j] !== 0) {
                    const value = row[j];
                    row[j] = 0;

                    if (row[0] === 0) row[0] = value;
                    else if (row[1] === 0) row[1] = value;
                    else if (row[2] === 0) row[2] = value;
                    else if (row[3] === 0) row[3] = value;
                    // if (row[3] === 0) row[3] = value;
                    // else if (
                    //     (row[3] !== 0 && row[3] === value && j === 2) ||
                    //     (row[3] !== 0 &&
                    //         row[3] === value &&
                    //         j === 1 &&
                    //         row[2] === 0) ||
                    //     (row[3] !== 0 &&
                    //         row[3] === value &&
                    //         j === 0 &&
                    //         row[1] === 0 &&
                    //         row[2] === 0)
                    // )
                    //     row[3] = value * 2;
                    // else if (row[2] === 0) row[2] = value;
                    // else if (
                    //     (row[2] !== 0 && row[2] === value && j === 1) ||
                    //     (row[2] !== 0 &&
                    //         row[2] === value &&
                    //         j === 0 &&
                    //         row[1] === 0)
                    // )
                    //     row[2] = value * 2;
                    // else if (row[1] === 0) row[1] = value;
                    // else if (row[1] !== 0 && row[1] === value)
                    //     row[1] = value * 2;
                    // else if (row[0] === 0) row[0] = value;
                }
            }
        });
        
        let status = false;
        
        for (let i = 0; i <= 3; i++) {
            if (status) {
                status = false;
                break;
            }

            for (let j = 0; j <= 3; j++) {
                if (newCells[i][j] !== cells[i][j]) {
                    addCell();
                    status = true;
                    break;
                }
            }
        }
        
        console.log("left");
        // -,  1,  2,  3,
        // -,  5,  6,  7,
        // -,  9,  10, 11,
        // -, 13,  14, 15
    };
    


    const touchUp = () => {
        console.log("up");
    };

    const touchDown = () => {
        console.log("down");
    };

    const addCell = () => {
        console.log(cells);
        
        const [one, two] = randomCell();
        if (cells[one][two]) {
            addCell();
        } else {
            setCells((cells) =>
                cells.map((row, i) =>
                    row.map((cell, j) =>
                        i === one && j === two ? randomNumber() : cell
                    )
                )
            );
        }
    };

    const eventEnd = (e: React.MouseEvent) => {
        const timeEnd = new Date().getTime() - startTime;

        if (timeEnd <= allowedTime) {
            const right =
                e.pageX - startX >= threshold &&
                Math.abs(e.pageY - startY) <= 100;
            const left =
                startX - e.pageX >= threshold &&
                Math.abs(e.pageY - startY) <= 100;
            const up =
                startY - e.pageY >= threshold &&
                Math.abs(e.pageX - startX) <= 100;
            const down =
                e.pageY - startY >= threshold &&
                Math.abs(e.pageX - startX) <= 100;

            if (right) touchRight();
            else if (left) touchLeft();
            else if (up) touchUp();
            else if (down) touchDown();
        }

        e.preventDefault();
    };

    const controls = (e: any) => {
        e.preventDefault();
        switch (e.keyCode) {
            case 37:
                touchLeft();
                break;
            case 38:
                touchUp();
                break;
            case 39:
                touchRight();
                break;
            case 40:
                touchDown();
                break;
        }
    };

    return (
        <div className="game" onKeyDown={controls} tabIndex={10}>
            <div className="game-header">
                <div className="game-header-logo">2048</div>
                <div className="game-header-results">
                    <div className="result-score">
                        <div>SCORE</div>
                        <div>0</div>
                    </div>
                    <div className="result-best">
                        <div>BEST</div>
                        <div>0</div>
                    </div>
                </div>
            </div>
            <div className="game-content">
                <div
                    className="game-content-table"
                    ref={board}
                    onMouseDown={eventStart}
                    onMouseUp={eventEnd}
                    onMouseMove={eventActive}
                >
                    <div className="game-content-table-column">
                        <div className="table-value-one" />
                        <div className="table-value-two" />
                        <div className="table-value-three" />
                        <div className="table-value-four" />
                    </div>
                    <div className="game-content-table-column">
                        <div className="table-value-five" />
                        <div className="table-value-six" />
                        <div className="table-value-seven" />
                        <div className="table-value-eight" />
                    </div>
                    <div className="game-content-table-column">
                        <div className="table-value-nine" />
                        <div className="table-value-ten" />
                        <div className="table-value-eleven" />
                        <div className="table-value-twelve" />
                    </div>
                    <div className="game-content-table-column">
                        <div className="table-value-thirteen" />
                        <div className="table-value-fourteen" />
                        <div className="table-value-fifteen" />
                        <div className="table-value-sixteen" />
                    </div>
                </div>
            </div>
        </div>
    );
}
