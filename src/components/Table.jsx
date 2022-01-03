import React from 'react';
import styles from './Table.module.css';
import SudokuToolCollection from "sudokutoolcollection";

export default function Table(){
    const sudoku = SudokuToolCollection();
    const [data, setData] = React.useState(new Array(9).fill(new Array(9).fill("")));

    const handleGenerate = ()=>{
        let arr_medium = sudoku.generator.generate("medium");
        let temp = [];
        let arr = [];
        arr_medium = arr_medium.split("");

        for(let i=0; i<arr_medium.length; i++){
            if(arr_medium[i] !== "."){
                arr.push(Number(arr_medium[i]));
            } else {
                arr.push("");
            }
            if(arr.length === 9){
                temp.push(arr);
                arr = [];
            }
        }

        setData(temp);
    }

    const handleClear = ()=>{
        setData(new Array(9).fill(new Array(9).fill("")));
    }

    const handleSolve = ()=>{
        solveSudoku(data, 9);
        // setData(data)
    }


    function isSafe(row, col, num, sudoku) {
        //row and col
        for (let i = 0; i < 9; i++) {
          if (sudoku[row][i] === num) {
            return false;
          }
      
          if (sudoku[i][col] === num) {
            return false;
          }
        }
      
        //in 3x3 matrix
        let rowStart = row - (row % 3);
        let colStart = col - (col % 3);
      
        for (let i = rowStart; i < rowStart + 3; i++) {
          for (let j = colStart; j < colStart + 3; j++) {
            if (sudoku[i][j] === num) {
              return false;
            }
          }
        }
      
        return true;
    }
      
    async function solveSudoku(sudoku, n) {
        let row = -1;
        let col = -1;
        let isEmpty = false;
        
        //checking for empty fields
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
            if (sudoku[i][j] === "") {
                row = i;
                col = j;
                isEmpty = true;
                break;
            }
            }
            if (isEmpty) {
             break;
            }
        }
        
        //base condition
        if (!isEmpty) {
            return true;
        }
        
        //checking for every num
        for (let num = 1; num <= n; num++) {
            if (isSafe(row, col, num, sudoku)) {
                try {
                    await delay(10);
                    sudoku[row][col] = num;
                    setData(sudoku);

                    if (await solveSudoku(sudoku, n)) {
                        return true;
                    }
                    sudoku[row][col] = "";
                } catch (error) {
                    console.log(error);
                }
            }
        }
        
        return false;
    }

    function delay(time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }
    
    return (
        <>
            <div className={styles.table}>
                <table>
                    {data.map((e)=><tr>{e.map((el)=><td>{el}</td>)}</tr>)}
                </table>
            </div>
            <div>
                <button onClick={handleGenerate} >Generate</button>
                <button onClick={handleSolve}>Solve</button>
                <button onClick={handleClear}>Clear</button>
            </div>
        </>
    )
}