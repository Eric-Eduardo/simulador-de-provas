import { isDisabled } from "@testing-library/user-event/dist/utils"
import { useState } from "react"

export default function Pagination({ data, currentIndex, handleClick, selectedOptions, reviewMode }) {
    return (
        <div className="pagination">
            <button
                onClick={() => handleClick(currentIndex - 1)}
                disabled={currentIndex == 0}
                className="previous-item"
            >
                <i className='bx bx-chevron-left'></i>
            </button>
            <div className="pagination-items">
                <button
                    onClick={() => handleClick(0)}
                    className={`item w-fit ${currentIndex == 0 ? "current" : ""}`}
                >
                    Início
                </button>

                {data.map((element, num) => {
                    
                    let isCorrect = reviewMode ? (element.alternativas.find(option => option.isCorrect == true).id == selectedOptions[element.id]) : false

                    return (
                        <button
                            onClick={() => handleClick(num + 1)}
                            key={num + 1}
                            className={`item ${currentIndex == num + 1 ? "current" : ""} 
                                             ${selectedOptions[element.id] > -1 ? "selected" : "default"}
                                             ${reviewMode && selectedOptions[element.id] > -1 ? isCorrect ? "agreed" : "error": ""}
                                        `}
                        >
                            {num + 1}
                        </button>
                    )
                })}
            </div>
            <button
                onClick={() => handleClick(currentIndex + 1)}
                disabled={currentIndex == data.length}
                className="next-item"
            >
                <i className='bx bx-chevron-right'></i>
            </button>
        </div>
    )
}