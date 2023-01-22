import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Input from '../components/Input';

const Quiz = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    correctAnswers: 0,
    showResults: false,
    timeRemaining: 60, // time limit in seconds
  });

  const abortController = new AbortController();

  const fetchQuiz = async () => {
    setIsLoading(true);
    const url =
      'https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple';
    try {
      const response = await axios.get(url, { signal: abortController.signal });
      const questions = response.data.results;
      setState((prevState) => ({ ...prevState, questions }));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('quiz'));
    if (storedData) {
      setState(storedData);
    } else {
      fetchQuiz();
    }

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (state.timeRemaining > 0) {
      const timer = setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          timeRemaining: prevState.timeRemaining - 1,
        }));
      }, 1000);
      return () => clearInterval(timer);
    } else if (state.timeRemaining === 0) {
      handleSubmit();
    }
  }, [state.timeRemaining]);

  useEffect(() => {
    if (state.questions.length === 0) {
      return;
    }
    localStorage.setItem('quiz', JSON.stringify(state));
  }, [state]);

  const handleAnswerSelection = (answer) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    const isCorrectAnswer = answer === currentQuestion.correct_answer;

    setState((prevState) => {
      return {
        ...prevState,
        userAnswers: [...prevState.userAnswers, answer],
        correctAnswers: isCorrectAnswer
          ? prevState.correctAnswers + 1
          : prevState.correctAnswers,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
      };
    });
  };

  const handleSubmit = () => {
    setState((prevState) => ({ ...prevState, showResults: true }));
  };

  const handleReset = () => {
    localStorage.removeItem('quiz');
    setState({
      questions: [],
      currentQuestionIndex: 0,
      userAnswers: [],
      correctAnswers: 0,
      showResults: false,
      timeRemaining: 60,
    });
    fetchQuiz();
  };

  if (state.showResults) {
    return (
      <div className='w-2/5 h-2/5 bg-gray-200 rounded-lg mx-auto p-6 border-2 border-[#094067] text-[#094067] font-semibold'>
        <div className='w-full h-52 flex flex-col justify-center items-center gap-4'>
          <p className='text-lg'>
            You answered {state.userAnswers.length} questions
          </p>
          <p className='text-lg'>
            You scored {state.correctAnswers} out of {state.questions.length}
          </p>
          <button
            onClick={handleReset}
            className='px-4 py-2 font-semibold transition-colors bg-[#ef4565] text-[#fffffe] rounded-lg hover:bg-[#eb3355] '
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  if (state.questions.length === 0 || isLoading) {
    return <Loading />;
  }

  if (state.currentQuestionIndex === state.questions.length) {
    return (
      <div className='w-2/5 h-2/5 bg-gray-200 rounded-lg mx-auto p-6 border-2 border-[#094067]'>
        <div className='w-full h-52 flex flex-col justify-center items-center gap-4'>
          <p className='text-lg font-semibold text-[#094067]'>
            Quiz is completed!
          </p>
          <button
            onClick={handleSubmit}
            className='px-4 py-2 transition-colors bg-[#3da9fc] text-white rounded-lg hover:bg-[#1d9cfd] '
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentQuestionIndex];
  const answers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ];

  const parsedQuestion = new DOMParser().parseFromString(
    currentQuestion.question,
    'text/html'
  );

  return (
    <div className='flex flex-col justify-center items-center '>
      <div className='flex justify-between p-6 bg-[#3da9fc] rounded-t-md text-[#fffffe] w-2/3 border-2 border-[#094067] font-semibold'>
        <p>{`Question ${state.currentQuestionIndex + 1} of ${
          state.questions.length
        }`}</p>
        <p>Time Remaining: {state.timeRemaining} seconds</p>
      </div>
      <div className='p-6 bg-gray-200 rounded-b-md w-2/3 border-2 border-t-0 border-[#094067]'>
        <p className='text-[#094067] font-semibold text-lg'>
          {parsedQuestion.body.firstChild.textContent}
        </p>
        <form className='flex flex-col gap-6 mt-4'>
          {answers.map((answer, index) => {
            const parsedAnswer = new DOMParser().parseFromString(
              answer,
              'text/html'
            );
            return (
              <>
                <label
                  key={answer}
                  className='inline-flex items-center justify-between w-full p-5 font-semibold text-[#094067] bg-[#fffffe] border-2 border-[#094067] rounded-lg cursor-pointe transition-colors hover:bg-blue-200'
                >
                  <input
                    type='radio'
                    name={`question${index}`}
                    value={answer}
                    className='hidden peer'
                    onChange={() => handleAnswerSelection(answer)}
                  />
                  <div className='block'>
                    <div className='w-full'>
                      {parsedAnswer.body.firstChild.textContent}
                    </div>
                  </div>
                </label>
              </>
            );
          })}
        </form>
      </div>
    </div>
  );
};

export default Quiz;
