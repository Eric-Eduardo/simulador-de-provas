import UploadSection from '../components/UploadSection';
import Header from '../components/Header';
import TestQuestion from '../components/TestQuestion';
import SummaryTestQuestions from '../components/SummaryTestQuestions';
import Pagination from '../components/Pagination';
import { memo, useEffect, useRef, useState } from 'react';

export default function VisualizationPage() {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [imageMap, setImageMap] = useState({});
    const [selectedOptions, setSelectedOptions] = useState({});
    const [reviewMode, setReviewMode] = useState(false);


    function loadImages() {
        document.querySelectorAll(".content-question img").forEach((img) => {
            let imageName = img.src.split("/").pop();
            if (imageMap[imageName]) {
                img.src = imageMap[imageName]; // Substitui pelo Blob correto
            }
        })
    }

    useEffect(() => {        
        questions.forEach((question) => {
            let selectedOption = question.alternativas.find(alternativa => alternativa.marked == true);
            if (selectedOption != null) {
                setSelectedOptions((prevOptions) => ({
                    ...prevOptions,
                    [question.id]: selectedOption.id, // ou qualquer valor inicial desejado
                }));
            }
        });
    }, [questions]);


    useEffect(() => {
        // console.log('mudou')
    }, [selectedOptions]);

    useEffect(() => {
        // console.log(reviewMode);
    }, [reviewMode]);


    function handleSelectedOption(idQuestion, idOption) {
        if (selectedOptions[idQuestion] == idOption) {
            console.log('retirando opcao');
            setSelectedOptions({ ...selectedOptions, [idQuestion]: -1 });
        } else {
            console.log('inserindo opcao');
            setSelectedOptions({ ...selectedOptions, [idQuestion]: idOption });
        }
    }


    function handleCurrentQuestion(num) {
        if (num >= 0 && num <= questions.length) {
            setCurrentQuestion(num);

            if (num > 0) {
                setTimeout(() => {
                    loadImages();
                }, 0);
            }
        }
    }

    function handleQuestions(questions_) {
        if (questions_ != null) {
            setQuestions(questions_);
        }
    }

    function handleImageMap(imageMap_) {
        if (imageMap_ != null) {
            setImageMap(imageMap_);
        }
    }


    return (
        <>
            <Header />
            <main>
                {questions && questions.length > 0 ? (
                    <>
                        {currentQuestion === 0 ?
                            <SummaryTestQuestions
                                questionsData={questions}
                                selectedOptions={selectedOptions}
                                reviewMode={reviewMode}
                                setReviewMode={setReviewMode}
                            /> :

                            <TestQuestion
                                questionNumber={currentQuestion}
                                questionData={questions[currentQuestion - 1]}
                                selectedOptions={selectedOptions}
                                handleSelectedOption={handleSelectedOption}
                                reviewMode={reviewMode}
                            />
                        }
                        <Pagination
                            data={questions}
                            currentIndex={currentQuestion}
                            handleClick={handleCurrentQuestion}
                            selectedOptions={selectedOptions}
                            reviewMode={reviewMode}
                        />
                    </>
                ) : (
                    <UploadSection
                        handleQuestions={handleQuestions}
                        handleImage={handleImageMap}
                        handleSelectedOption={setSelectedOptions}
                        selectedOptions={selectedOptions}
                    />
                )}
            </main>
        </>
    )
}