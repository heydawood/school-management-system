import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/Redux/Hooks';
import StatChartCard from '@/components/features/Dashboard/StatChartCard';
import { getStudentExamReview } from '@/Redux/StudentExam/Slice';

const StudentExamReviewPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<any>(null);

  const fetchReview = () => {
    setLoading(true);

    dispatch(getStudentExamReview(examId!))
      .unwrap()
      .then((res) => {
        console.log("Review Data:", res.data);
        setReview(res.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReview();
  }, []);

  if (loading || !review) return <div className="p-6">Loading review...</div>;

  const { summary, questions } = review;

  return (
    <div className="space-y-4">
      <StatChartCard
        title="Exam Review"
        icon="/icons/chart.svg"
        withDate={false}
        date=""
      >
        {/* SUMMARY */}
        <div className="bg-white p-6 rounded-xl border mb-4 text-center">
          <h2 className="text-xl font-semibold mb-2">Result Summary</h2>

          <p className="text-3xl font-bold text-primary">
            {summary.score}%
          </p>

          <p
            className={`mt-2 font-semibold ${
              summary.passed ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {summary.passed ? 'Passed' : 'Failed'}
          </p>

          <div className="flex justify-center gap-6 mt-4 text-sm">
            <span> Correct: {summary.correct}</span>
            <span> Incorrect: {summary.incorrect}</span>
            <span> Total: {summary.totalQuestions}</span>
             <span> Pass Mark: {summary.passMark}%</span>
          </div>
        </div>

        {/* QUESTIONS */}
        <div className="space-y-6">
          {questions.map((q: any, index: number) => {
            const getOptionStyle = (key: string) => {
              const optionKey = `option${key}`;

              // correct options
              if (q.correctOption === optionKey) {
                return 'bg-green-100 border-green-500';
              }

              // wrong option
              if (
                q.selectedOption === optionKey &&
                q.correctOption !== optionKey
              ) {
                return 'bg-red-100 border-red-500';
              }

              return 'bg-white';
            };

            return (
              <div key={q.questionId} className="p-4 border rounded-xl">
                <h3 className="font-semibold mb-3">
                  Q{index + 1}: {q.prompt}
                </h3>

                <div className="space-y-2">
                  {['A', 'B', 'C', 'D'].map((key) => {
                    const optionKey = `option${key}`;
                    const value = q[optionKey];

                    if (!value) return null;

                    return (
                      <div
                        key={key}
                        className={`p-2 border rounded ${getOptionStyle(
                          key
                        )}`}
                      >
                        <span className="font-medium mr-2">{key}.</span>
                        {value}

                        {/* LABELS */}
                        <div className="text-xs mt-1">
                          {q.selectedOption === optionKey && (
                            <span className="text-blue-600 mr-2">
                              Your Answer
                            </span>
                          )}

                          {q.correctOption === optionKey && (
                            <span className="text-green-600">
                              Correct Answer
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* RESULT */}
                <div className="mt-3 text-sm font-semibold">
                  {q.isCorrect ? (
                    <span className="text-green-600">Correct </span>
                  ) : (
                    <span className="text-red-500">Incorrect </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ACTION */}
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard/student')}
          >
            Back to Exams
          </Button>
        </div>
      </StatChartCard>
    </div>
  );
};

export default StudentExamReviewPage;
