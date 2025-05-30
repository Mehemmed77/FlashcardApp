import Flashcard from "../components/Flashcard";
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from "@mui/material";
import { useQuiz } from "../hooks/QuizContext";

export default function FlashcardList() {
    const {flashcards, series} = useQuiz();

    if (flashcards.length === 0) return <p>No Flashcards in this category</p>

    const progressValue = ((series) / flashcards.length) * 100;

    const currentFlashcard = flashcards[series];

    const flashcardObject = {
        id: currentFlashcard.id,
        place: currentFlashcard.place,
        answer: currentFlashcard.answer,
        flipped: currentFlashcard.flipped,
        question: currentFlashcard.question,
    }

    return <>
        <Box maxWidth="800px" margin="0 auto">
            <LinearProgress variant="determinate" value={progressValue} sx={{marginBlockEnd: 2}} />
            {<Flashcard flashcardObject={flashcardObject}/>}
        </Box>
    </>
}