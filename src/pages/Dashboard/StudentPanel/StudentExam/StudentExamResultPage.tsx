import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/Redux/Hooks';
import StatChartCard from '@/components/features/Dashboard/StatChartCard';
import { getStudentExamResult } from '@/Redux/StudentExam/Slice';

const StudentExamResultPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const fetchResult = () => {
    setLoading(true);

    dispatch(getStudentExamResult(examId!))
      .unwrap()
      .then((res) => {
        setResult(res.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchResult();
  }, []);

  return (
    <div className="space-y-4">
      <StatChartCard
        title="Exam Result"
        icon="/icons/chart.svg"
        withDate={false}
        date=""
      >
        {!result ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* SCORE */}
            <div className="bg-white p-6 rounded-xl border mb-4 text-center">
              <h2 className="text-xl font-semibold mb-2">Your Score</h2>
              <p className="text-4xl font-bold text-primary">
                {result.score}%
              </p>

              <p
                className={`mt-2 font-semibold ${
                  result.passed ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {result.passed ? 'Passed' : 'Failed'}
              </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl border">
              <div>
                <p className="text-gray-500 text-sm">Correct</p>
                <p className="font-medium">{result.correct}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Incorrect</p>
                <p className="font-medium">{result.incorrect}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Total Questions</p>
                <p className="font-medium">{result.totalQuestions}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Pass Mark</p>
                <p className="font-medium">{result.passMark}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Submitted At</p>
                <p className="font-medium">
                  {new Date(result.submittedAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-4">
              <Button
                className="bg-primary text-white"
                onClick={() =>
                  navigate(`/dashboard/student/exams/${examId}/review`)
                }
              >
                Review Answers
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate('/dashboard/student')}
              >
                Back to Exams
              </Button>
            </div>
          </>
        )}
      </StatChartCard>
    </div>
  );
};

export default StudentExamResultPage;