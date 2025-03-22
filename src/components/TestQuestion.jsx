import { marked } from "marked";
import { memo, useEffect, useRef, useState } from "react";


const QuestionStatement = memo(({ questionNumber, questionData }) => {
    // console.log("QuestionStatemente");
      
    return (
        <>
            <div className="header-content">
                <h1>Questão {questionNumber}</h1>
                <p className="description" dangerouslySetInnerHTML={{ __html: marked(questionData.conteudo) }} />
            </div>

            <div className="statement-question">
                <div className="text-question" dangerouslySetInnerHTML={{ __html: marked(questionData.enunciado) }} />
                <div className="reference-question" dangerouslySetInnerHTML={{ __html: marked(questionData.informacoes) }} />
            </div>
        </>
    )

});

const OptionsQuestion = memo(({ reviewMode, questionNumber, questionData, selectedOptions, handleSelectedOption }) => {
    return (
        <div className="options">
            <ul>
                {
                    questionData.alternativas.map((alternativa, i) => (
                        <li key={i} className={`${reviewMode && selectedOptions[questionData.id] > -1 ? alternativa.isCorrect ? "agreed" : selectedOptions[questionData.id] == alternativa.id ? "error" : "" : ""}`}>
                            <input
                                disabled={reviewMode}
                                type="radio"
                                name={`option-question-${questionNumber}`}
                                id={`option-question-${questionNumber}-${i}`}
                                data-id-question={`${questionData.id}`}
                                data-id-option={`${alternativa.id}`}
                                checked={Number(selectedOptions[questionData.id]) == Number(alternativa.id)}
                                onChange={(el) => handleSelectedOption(Number(el.target.getAttribute('data-id-question')), Number(el.target.getAttribute('data-id-option')))}
                                onClick={(el) => handleSelectedOption(Number(el.target.getAttribute('data-id-question')), Number(el.target.getAttribute('data-id-option')))}
                            />
                            <label htmlFor={`option-question-${questionNumber}-${i}`} dangerouslySetInnerHTML={{ __html: marked(alternativa.text) }} />
                        </li>

                    ))
                }

            </ul>
        </div>
    )
});

export default function TestQuestion({ reviewMode, questionNumber, questionData, selectedOptions, handleSelectedOption }) {

    return (
        <section className="content-question">
            <QuestionStatement
                questionNumber={questionNumber}
                questionData={questionData}
            />
            <OptionsQuestion
                questionNumber={questionNumber}
                questionData={questionData}
                selectedOptions={selectedOptions}
                handleSelectedOption={handleSelectedOption}
                reviewMode={reviewMode}
            />
        </section>
    );
}