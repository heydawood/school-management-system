import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/Redux/Hooks';
import { Button } from '@/components/ui/button';
import { customToast } from '@/Common/Components/ShowToast';
import { getExamAttempt, getSaveAnswer, getStartExam, getSubmitExam } from '@/Redux/StudentExam/Slice';

const ExamPage = () => {

    const { examId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<any[]>([]);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    
    const initExam = async () => {
        if (!examId) return;

        try {
            setLoading(true);

            // First, start the exam to create an attempt
            await dispatch(getStartExam(examId)).unwrap();

            // Second, fetch the attempt data which includes the questions
            const res = await dispatch(getExamAttempt(examId)).unwrap();
            console.log("Attempt Data:", res.data.questions);
            setQuestions(res.data.questions || []);
        } catch (err: any) {
            customToast.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initExam();
    }, [examId]);

    // Third, handle answer selection
    const handleSelect = (questionId: string, option: string) => {
        // update UI instantly
        setAnswers((prev) => ({
            ...prev,
            [questionId]: option,
        }));

        // Fourth, save the answer to the backend
        console.log("Saving answer...", { examId, questionId, option });
        dispatch(
            getSaveAnswer({
                examId,
                questionId,
                selectedOption: `option${option}`, // converts B to optionB
            })
        );
    };

    // Fifth, handle exam submission
    const handleSubmit = () => {
        if (!examId) return;

        setLoading(true);

        dispatch(getSubmitExam(examId))
            .unwrap()
            .then(() => {
                customToast.success('Exam submitted successfully');
                navigate(`/dashboard/student/exams/${examId}/result`);
            })
            .catch((err: any) => {
                customToast.error(err);
            })
            .finally(() => setLoading(false));
    };

    if (loading) return <div className="p-6">Loading exam...</div>;

    return (
        <div className="p-6 space-y-6">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Exam Attempt</h1>

                <Button onClick={handleSubmit}>
                    Submit Exam
                </Button>
            </div>

            {/* QUESTIONS */}
            <div className="space-y-6">
                {questions.length === 0 ? (
                    <p>No questions available</p>
                ) : (
                    questions.map((q: any, index: number) => (
                        <div key={q.id} className="p-4 border rounded-xl">

                            <h3 className="font-semibold mb-3">
                                Q{index + 1}: {q.question}
                            </h3>

                            <div className="space-y-2">
                                {['A', 'B', 'C', 'D'].map((key) => {
                                    const optionValue = q[`option${key}`];

                                    if (!optionValue) return null;

                                    return (
                                        <label key={key} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name={q.id}
                                                value={key}
                                                checked={answers[q.id] === key}
                                                onChange={() => handleSelect(q.id, key)}
                                            />
                                            {key}. {optionValue}
                                        </label>
                                    );
                                })}

                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ExamPage;
