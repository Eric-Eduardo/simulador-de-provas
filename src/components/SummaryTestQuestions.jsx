import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';

export default function SummaryTestQuestions({ setReviewMode, reviewMode, questionsData, selectedOptions }) {


    const conteudos = questionsData.reduce((acc, question) => {
        const conteudo = question.conteudo;
        acc[conteudo] = (acc[conteudo] || 0) + 1;
        return acc;
    }, {});

    const totalCompletedQuestions = Object.keys(selectedOptions).filter(key => selectedOptions[key] > -1);

    let totalCorrectQuestions = totalCompletedQuestions.reduce((acc, idQuestion) => {
        const question = questionsData.find((question) => question.id == Number(idQuestion));
        const correctOption = question.alternativas.find((alternativa) => alternativa.isCorrect == true);
        if (selectedOptions[idQuestion] == correctOption.id) acc += 1;
        return acc;
    }, 0);

    function downloadQuestions() {

        Object.keys(selectedOptions).forEach(id => {
            let optionMarked = questionsData.find(el => el.id == id).alternativas.find(al => al.id == selectedOptions[id]);
            if (optionMarked != null) {
                optionMarked.marked = true;
            }
        })

        const jsonString = JSON.stringify(questionsData, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "questions.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <section>
            <h1>Resumo das Questões</h1>

            <div className="summary-questions">
                <div className="content-info-questions summary-all-questions">
                    <p className="number-questions-completed">{totalCompletedQuestions.length}/{questionsData.length}</p>
                    <p className="description">Questões feitas</p>
                    <ProgressBar
                        total={questionsData.length}
                        errors={reviewMode ? totalCompletedQuestions.length - totalCorrectQuestions : 0}
                        success={reviewMode ? totalCorrectQuestions : 0}
                        asked={Object.values(selectedOptions).filter(value => value > -1).length}
                    />
                </div>

                {
                    Object.keys(conteudos).map((key) => {
                        const idCompletedQuestions = [];

                        for (let question of questionsData) {
                            if (question.conteudo == key) {
                                if (selectedOptions[question.id] > -1) {
                                    idCompletedQuestions.push(question.id);
                                }
                            }
                        }

                        const numSuccessQuestions = idCompletedQuestions.length > 0 && reviewMode ? idCompletedQuestions.reduce((acc, idQuestion) => {
                            const question = questionsData.find((question) => question.id == idQuestion);
                            const correctOption = question.alternativas.find((alternativa) => alternativa.isCorrect == true);
                            if (selectedOptions[idQuestion] == correctOption.id) acc += 1;
                            return acc;
                        }, 0) : 0;

                        return (
                            <div key={key} className="content-info-questions ">
                                <p className="number-questions-completed">{idCompletedQuestions.length}/{conteudos[key]}</p>
                                <p className="description">{key}</p>
                                <ProgressBar
                                    total={conteudos[key]}
                                    errors={reviewMode ? idCompletedQuestions.length - numSuccessQuestions : 0}
                                    success={reviewMode ? numSuccessQuestions : 0}
                                    asked={idCompletedQuestions.length}
                                />
                            </div>
                        )
                    })
                }

            </div>

            <div className="content-buttons">
                {reviewMode ? (
                    <button onClick={() => setReviewMode(false)} className='bg-blue'>
                        <i className='bx bx-play bx-sm'></i>
                        Continuar Prova
                    </button>
                ) : (
                    <button onClick={() => setReviewMode(true)} className='bg-green'>
                        <i className='bx bxs-check-circle bx-sm'></i>
                        Corrigir Prova
                    </button>
                )}
            </div>

            <div className="content-buttons">

                <button onClick={downloadQuestions}>
                    <i className='bx bx-download bx-sm'></i>
                    Baixar resultado
                </button>
            </div>
        </section>
    );
}