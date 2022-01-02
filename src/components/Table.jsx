import styles from './Table.module.css';
import SudokuToolCollection from "sudokutoolcollection";

export default function Table(){
    const sudoku = SudokuToolCollection();

    let temp = sudoku.generator.generate("easy");

    temp = temp.split("")

    console.log(temp);
    return (
        <div className={styles.table}>
            Table
        </div>
    )
}