import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/Redux/Hooks';
import { Button } from '@/components/ui/button';
import { customToast } from '@/Common/Components/ShowToast';
import {
  getExamAttempt,
  getSaveAnswer,
  getStartExam,
  getSubmitExam,
} from '@/Redux/StudentExam/Slice';
import { useExamAttempt, useSaveAnswer, useStartExam, useSubmitExam } from './Hooks';

const ExamPage = () => {
//   const { examId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const [loading, setLoading] = useState(false);
//   const [questions, setQuestions] = useState<any[]>([]);
//   const [answers, setAnswers] = useState<Record<string, string>>({});
//   const [savedAnswers, setSavedAnswers] = useState<Record<string, boolean>>({});
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const currentQuestion = questions[currentIndex];

//   // INIT EXAM
//   // First, start the exam to create an attempt, then fetch the questions for that attempt
//   const initExam = async () => {
//     if (!examId) return;

//     try {
//       setLoading(true);

//       await dispatch(getStartExam(examId)).unwrap();
//       const res = await dispatch(getExamAttempt(examId)).unwrap();

//       setQuestions(res.data.questions || []);
//     } catch (err: any) {
//       customToast.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     initExam();
//   }, [examId]);

//   // SELECT OPTION (UI ONLY)
//   // Second, handle answer selection
//   const handleSelect = (questionId: string, option: string) => {
//     console.log("Selected option:", { questionId, option });
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: option,
//     }));
//   };

//   // SAVE ANSWER API
//   //Third, save the answer to the backend
//   const handleSave = () => {
//     if (!examId || !currentQuestion) return;

//     const selected = answers[currentQuestion.id];

//     console.log("Saving answer:", { examId, questionId: currentQuestion.id, selectedOption: `option${selected}` });

//     if (!selected) {
//       customToast.error('Please select an option');
//       return;
//     }

//     dispatch(
//       getSaveAnswer({
//         examId,
//         questionId: currentQuestion.id,
//         selectedOption: `option${selected}`,
//       })
//     )
//       .unwrap()
//       .then(() => {
//         customToast.success('Answer saved');

//         setSavedAnswers((prev) => ({
//           ...prev,
//           [currentQuestion.id]: true,
//         }));
//       })
//       .catch((err: any) => {
//         customToast.error(err);
//       });
//   };

//   //HANDLEING QUESTIONS NAVIGATION

//   // NEXT QUESTION Button
//   const handleNext = () => {
//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex((prev) => prev + 1);
//     }
//   };

//   // PREVIOUS Button
//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prev) => prev - 1);
//     }
//   };

//   // SUBMIT EXAM
//   // Fourth, handle exam submission
//   const handleSubmit = () => {
//     if (!examId) return;

//     setLoading(true);

//     dispatch(getSubmitExam(examId))
//       .unwrap()
//       .then(() => {
//         customToast.success('Exam submitted successfully');
//         navigate(`/dashboard/student/exams/${examId}/result`);
//       })
//       .catch((err: any) => {
//         customToast.error(err);
//       })
//       .finally(() => setLoading(false));
//   };

const { examId } = useParams();
  const navigate = useNavigate();

  const startExam = useStartExam();
  const saveAnswer = useSaveAnswer();
  const submitExam = useSubmitExam();

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [savedAnswers, setSavedAnswers] = useState<Record<string, boolean>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch attempt AFTER start
  const { data: attemptData, refetch } = useExamAttempt(examId);

  const questions = attemptData?.questions || [];
  const currentQuestion = questions[currentIndex];

  // INIT
  useEffect(() => {
    if (!examId) return;

    startExam.mutate(examId, {
      onSuccess: () => {
        refetch();
      },
      onError: (err: any) => customToast.error(err),
    });
  }, [examId]);

  // SELECT
  const handleSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  // SAVE
  const handleSave = () => {
    if (!examId || !currentQuestion) return;

    const selected = answers[currentQuestion.id];

    if (!selected) {
      customToast.error('Please select an option');
      return;
    }

    saveAnswer.mutate(
      {
        examId,
        questionId: currentQuestion.id,
        selectedOption: `option${selected}`,
      },
      {
        onSuccess: () => {
          customToast.success('Answer saved');
          setSavedAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: true,
          }));
        },
      }
    );
  };

  // SUBMIT
  const handleSubmit = () => {
    if (!examId) return;

    submitExam.mutate(examId, {
      onSuccess: () => {
        customToast.success('Exam submitted');
        navigate(`/dashboard/student/exams/${examId}/result`);
      },
    });
  };


  if (!currentQuestion) return <div className="p-6">Loading exam...</div>;

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Question {currentIndex + 1} / {questions.length}
        </h1>
      </div>

      {/* QUESTION */}
      <div className="p-4 border rounded-xl">
        <h3 className="font-semibold mb-3">
          {currentQuestion.question}
        </h3>

        <div className="space-y-2">
          {['A', 'B', 'C', 'D'].map((key) => {
            const optionValue = currentQuestion[`option${key}`];
            if (!optionValue) return null;

            return (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={key}
                  checked={answers[currentQuestion.id] === key}
                  onChange={() => handleSelect(currentQuestion.id, key)}
                />
                {key}. {optionValue}
              </label>
            );
          })}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-between">

        <Button
          onClick={() => setCurrentIndex((p) => p - 1)}
          disabled={currentIndex === 0}
          variant="outline"
        >
          Previous
        </Button>

        <div className="flex gap-2">

          {/* SAVE BUTTON */}
          <Button onClick={handleSave}>
            Save Answer
          </Button>

          {/* NEXT OR SUBMIT */}
          {currentIndex === questions.length - 1 ? (
            <Button onClick={handleSubmit}>
              Submit Exam
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentIndex((p) => p + 1)}
              disabled={!savedAnswers[currentQuestion.id]}
            >
              Next
            </Button>
          )}

        </div>
      </div>

    </div>
  );
};

export default ExamPage;