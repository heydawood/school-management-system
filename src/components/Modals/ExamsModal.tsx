import { Fragment, useEffect, useState, type FC } from 'react';
import { Button } from '../ui/button';
import Modalfooter from '../ui/modal/Footer';
import Modal from '../ui/modal/Modal';
import Modalheader from '../ui/modal/Header';
import Modalbody from '../ui/modal/Body';
import Icon from '../ui/svg_icon/SvgIcon';
import { useAppDispatch } from '@/Redux/Hooks';
import Spinner from '../ui/spinner';
import { getExamById } from '@/Redux/Exams/Slice';

interface Props {
  close: () => void;
  examId: string | null;
}

const ExamsModal: FC<Props> = ({ close, examId }) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  const handleGetExam = () => {
    setLoading(true);

    dispatch(getExamById(examId!))
      .unwrap()
      .then((res: any) => {
        setData(res.exam);
      })
      .catch((err) => {
        console.log('Error: ', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (examId) {
      handleGetExam();
    }
  }, [examId]);

  return (
    <Modal
      classNames={`md:max-w-[50%] md:min-w-[50%] h-fit overflow-x-auto`}
      closeModal={close}
    >
      <Fragment>
        {/* Header */}
        <Modalheader
          logoClasses="bg-primary"
          customLogo={<Icon icon="/icons/class-level.svg" className="text-white w-6 h-6" />}
          className="p-4"
          contentLocation="left"
          showCloseButton={true}
          onCloseClick={close}
        >
          <div>
            <h1 className="text-heading font-semibold">Exam Details</h1>
            <p className="text-paragraph text-gray-500">
              View complete details of the selected exam.
            </p>
          </div>
        </Modalheader>

        {/* Body */}
        <Modalbody fixedHeight={false}>
          {!data && !loading && <p>No data found</p>}
          {loading && <Spinner />}

          {data && (
            <div className="space-y-6">

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">

                <div>
                  <span className="text-gray-500 text-xs">Name</span>
                  <p>{data.name}</p>
                </div>

                <div>
                  <span className="text-gray-500 text-xs">Description</span>
                  <p>{data.description}</p>
                </div>

                <div>
                  <span className="text-gray-500 text-xs">Total Marks</span>
                  <p>{data.totalMark}</p>
                </div>

                <div>
                  <span className="text-gray-500 text-xs">Pass Marks</span>
                  <p>{data.passMark}</p>
                </div>

                <div>
                  <span className="text-gray-500 text-xs">Exam Type</span>
                  <p>{data.examType}</p>
                </div>

                <div>
                  <span className="text-gray-500 text-xs">Status</span>
                  <p className="capitalize">{data.examStatus}</p>
                </div>

                <div>
                  <span className="text-gray-500 text-xs">Exam Date</span>
                  <p>{new Date(data.examDate).toLocaleDateString()}</p>
                </div>

                <div>
                  <span className="text-gray-500 text-xs">Duration</span>
                  <p>{data.duration}</p>
                </div>

              </div>

              {/* Questions Section */}
              <div>
                <h3 className="font-semibold text-md mb-3">Questions</h3>

                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {data.questions?.length === 0 && (
                    <p className="text-sm text-gray-500">No questions added.</p>
                  )}

                  {data.questions?.map((q: any, index: number) => (
                    <div
                      key={q._id}
                      className="border rounded-xl p-4 bg-primary-50"
                    >
                      <p className="font-medium mb-2">
                        {index + 1}. {q.question}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <p>A: {q.optionA}</p>
                        <p>B: {q.optionB}</p>
                        <p>C: {q.optionC}</p>
                        <p>D: {q.optionD}</p>
                      </div>

                      <p className="mt-2 text-sm">
                        <span className="text-gray-500">Correct Answer: </span>
                        <span className="font-medium text-green-600">
                          {q.correctAnswer}
                        </span>
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Created by: {q.createdBy?.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </Modalbody>

        {/* Footer */}
        <Modalfooter>
          <Button
            onClick={close}
            type="button"
            variant={'outline'}
            className="w-full rounded-xl hover:bg-primary hover:text-white h-12"
          >
            Close
          </Button>
        </Modalfooter>
      </Fragment>
    </Modal>
  );
};

export default ExamsModal;
