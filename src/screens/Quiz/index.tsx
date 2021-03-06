import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import AlternativesForm from '@components/AlternativesForm';
import QuizBackground from '@components/QuizBackground';
import QuizContainer from '@components/QuizContainer';
import QuizLogo from '@components/QuizLogo';
import Button from '@components/Button';
import Widget from '@components/Widget';
import BackLinkArrow from '@components/BackLinkArrow';
import baseDatabase from '../../../db.json';

interface ResultProps {
  results: boolean[];
  player: string;
}
const ResultWidget: FC<ResultProps> = ({ results, player }) => {
  return (
    <Widget>
      <Widget.Header>Tela de Resultado:</Widget.Header>

      <Widget.Content>
        <p>
          {player}, você acertou {results.filter((x) => x).length} perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${index}`}>
              #{index + 1} Resultado:
              {result ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
};

const LoadingWidget = () => {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>
        <i className='fa fa-cog fa-spin' />
      </Widget.Content>
    </Widget>
  );
};

interface QuestionProps {
  player: string;
  question: {
    image: string;
    title: string;
    description: string;
    answer: number;
    alternatives: string[];
  };
  questionIndex: number;
  totalQuestions: number;
  onSubmit: any;
  addResult: any;
}

const QuestionWidget: FC<QuestionProps> = ({
  player,
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) => {
  const [selectedAlternative, setSelectedAlternative] = useState<number>();
  const [isQuestionSubmited, setIsQuestionSubmited] = useState<boolean>(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href='/' />
        <h3>{`${player} - Pergunta ${
          questionIndex + 1
        } de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img
        alt='Descrição'
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const isSelected = selectedAlternative === alternativeIndex;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            return (
              <Widget.Topic
                as='label'
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  // style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type='radio'
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type='submit' disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Você Acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você Errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
};

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export interface QuizProps {
  externalDatabase?: {
    bg: string;
    title: string;
    description: string;
    questions: [
      {
        image: string;
        title: string;
        description: string;
        answer: number;
        alternatives: string[];
      }
    ];
    external: string[];
    theme: {
      colors: {
        primary: string;
        secondary: string;
        mainBg: string;
        contrastText: string;
        wrong: string;
        success: string;
      };
      borderRadius: string;
    };
  };
}
const QuizPage: FC<QuizProps> = ({ externalDatabase }) => {
  const db = externalDatabase || baseDatabase;
  const router = useRouter();
  const player = router.query.name as string;
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result: boolean) {
    // results.push(result);
    setResults([...results, result]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            player={player}
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} player={player} />
        )}
      </QuizContainer>
    </QuizBackground>
  );
};

export default QuizPage;
