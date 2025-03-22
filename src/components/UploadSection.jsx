import { marked } from "marked";
import { useEffect, useState } from "react";

export default function UploadSection({ handleQuestions, handleImage, handleSelectedOption, selectedOptions }) {
    let index = 0;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Escolhe um índice aleatório
            [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
        }
        return array;
    }

    function organizeQuestions(questions) {
        for (let i in questions) {
            questions[i].alternativas = shuffleArray(questions[i].alternativas);
        }

        return questions;
    }

    
    function setSelectedOptions(questions) {
        // let objectOptions = {}
        for (let question of questions) {
            let selectedOption = question.alternativas.find(alternativa => alternativa.marked == true);
            if (selectedOption != null) {
                // objectOptions[Number(question.id)] = Number(selectedOption.id);
                // handleSelectedOption(Number(question.id), Number(selectedOption.id));
                handleSelectedOption({...selectedOptions, [Number(question.id)]:Number(selectedOption.id)});
            } else {
                
                handleSelectedOption({...selectedOptions, [Number(question.id)]:-1});
                // handleSelectedOption(Number(question.id), -1);
                // objectOptions[Number(question.id)] = -1;
            }
        }

        // console.log(objectOptions);
    }

    function getFiles(event) {
        const files = event.target.files;
        let jsonFile = null;
        let imageMap = {};
        let questions = [];

        for (let file of files) {
            if (file.name.endsWith(".json")) {
                jsonFile = file; // Define o arquivo Markdown
            } else if (file.type.startsWith("image/")) {
                imageMap[file.name] = URL.createObjectURL(file); // Cria URL Blob para a imagem
            }
        }


        if (!jsonFile) {
            alert("Nenhum arquivo Markdown (.md) encontrado na pasta!");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                questions = JSON.parse(e.target.result); // Converte JSON para array
                // setSelectedOptions(questions);
                handleQuestions(organizeQuestions(questions));
                handleImage(imageMap);
            } catch (error) {
                console.error("Erro ao processar o JSON:", error);
            }
        };

        reader.readAsText(jsonFile);
    }

    return (

        <section className="upload-section" >
            <div className="upload-content">
                <input onChange={getFiles} className="hidden" type="file" id="folderInput" webkitdirectory="true" multiple />
                <label htmlFor="folderInput" className="button">
                    <i className='bx bx-upload bx-sm'></i>
                    Carregar arquivo
                </label>
                <p>
                    Carregue um arquivo JSON do seu computador contendo as questões. Caso ainda não possua um arquivo você pode criar na aba <a href="">criação</a>
                </p>
            </div>
        </section>
    )
}