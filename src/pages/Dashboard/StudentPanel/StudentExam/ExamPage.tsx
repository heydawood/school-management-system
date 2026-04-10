import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { customToast } from '@/Common/Components/ShowToast';
import { useStudentExamManager } from './StudentExamManager';

const ExamPage = () => {

  const { examId } = useParams();
  const navigate = useNavigate();


  const {startExamMutation, saveAnswerMutation, submitExamMutation, getExamAttemptQuery} = useStudentExamManager()


  // const startExam = useStartExam();
  // const saveAnswer = useSaveAnswer();
  // const submitExam = useSubmitExam();

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [savedAnswers, setSavedAnswers] = useState<Record<string, boolean>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch attempt AFTER start
  //const { data: attemptData, refetch } = useExamAttempt(examId);
  const { data: attemptData, refetch } = getExamAttemptQuery(examId);

  const questions = attemptData?.questions || [];
  const currentQuestion = questions[currentIndex];

  // INIT
  useEffect(() => {
    if (!examId) return;

    startExamMutation.mutate(examId, {
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

    saveAnswerMutation.mutate(
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

    submitExamMutation.mutate(examId, {
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