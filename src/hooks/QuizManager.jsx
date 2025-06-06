import setLastPracticedAt from "../utils/setLastPracticedAt";
import { useQuiz } from "./QuizContext";
import { useNavigate } from "react-router";


export function useQuizManager() {
    const {flashcards,decksIndex,score, dispatch} = useQuiz();
    const navigate = useNavigate();

    const showAnswer = (id) => dispatch({type:"FLIP", payload: {id}});

    const handleNext = (place, id) => {
        if (place < flashcards.length) dispatch({type:"NEXT", payload: {id}});
    }

    const handlePrevious = (place, id) => {
        if (place > 1) dispatch({type:"PREVIOUS", payload: {id}})
    }

    const handleScore = (score, place, id) => {
        if (score === 1) dispatch({type:"RECORD_REMEMBERED", payload: {id}});
        dispatch({type: "RECORD_SCORE", payload: {score}});

        if(place === flashcards.length) endQuiz();

        else handleNext(place, id);
    }

    const endQuiz = () => {
        setLastPracticedAt(decksIndex);
        navigate("/result");
    };

    return {showAnswer, handleNext, handlePrevious, handleScore, endQuiz}
}

