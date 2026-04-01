import { Fragment, useEffect, useState, type FC } from 'react';
import { Button } from '../ui/button';
import Modalfooter from '../ui/modal/Footer';
import Modal from '../ui/modal/Modal';
import Modalheader from '../ui/modal/Header';
import Modalbody from '../ui/modal/Body';
import Icon from '../ui/svg_icon/SvgIcon';
import { useAppDispatch } from '@/Redux/Hooks';
import Spinner from '../ui/spinner';
import { getQuestionById } from '@/Redux/Questions/Slice';

interface Props {
  close: () => void;
  questionsId: string | null;
}

const QuestionsModal: FC<Props> = ({ close, questionsId }) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  const handleGetQuestion = () => {
    setLoading(true);

    dispatch(getQuestionById(questionsId!))
      .unwrap()
      .then((res: any) => {
        console.log('modal:', res.question)
        setData(res.question);
      })
      .catch((err) => {
        console.log('Error: ', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (questionsId) {
      handleGetQuestion();
    }
  }, [questionsId]);

  return (
    <Modal
      classNames="md:max-w-[45%] md:min-w-[45%] h-fit"
      closeModal={close}
    >
      <Fragment>
        {/* Header */}
        <Modalheader
          logoClasses="bg-primary"
          customLogo={<Icon icon="/icons/academic-term.svg" className="text-white w-6 h-6" />}
          className="p-4"
          contentLocation="left"
          showCloseButton
          onCloseClick={close}
        >
          <div>
            <h1 className="text-heading font-semibold">Question Details</h1>
            <p className="text-paragraph text-gray-500">
              View details of the selected question.
            </p>
          </div>
        </Modalheader>

        {/* Body */}
        <Modalbody>
          {!data && !loading && <p>No data found</p>}
          {loading && <Spinner />}

          {data && (
            <div className="space-y-6">

              {/* Question */}
              <div className="p-4 bg-primary-50 rounded-xl border">
                <p className="text-sm text-gray-500 mb-1">Question</p>
                <h3 className="font-semibold text-lg">{data.question}</h3>
              </div>

              {/* Options */}
              <div>
                <h4 className="font-semibold mb-3">Options</h4>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  {['A', 'B', 'C', 'D'].map((opt) => {
                    const key = `option${opt}` as keyof typeof data;
                    const isCorrect = data.correctAnswer === key;

                    return (
                      <div
                        key={opt}
                        className={`p-3 rounded-lg border ${
                          isCorrect
                            ? 'bg-green-50 border-green-400'
                            : 'bg-primary-50'
                        }`}
                      >
                        <span className="font-medium">{opt}:</span>{' '}
                        {data[key]}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Correct Answer */}
              <div className="p-3 rounded-lg bg-green-100 border border-green-400">
                <span className="text-sm text-gray-600">Correct Answer: </span>
                <span className="font-semibold text-green-700">
                  {data.correctAnswer}
                </span>
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 text-xs">Created At</span>
                  <p>{new Date(data.createdAt).toLocaleDateString()}</p>
                </div>

                <div>
                  <span className="text-gray-500 text-xs">Status</span>
                  <p>{data.isCorrect ? 'Correct' : 'Not Evaluated'}</p>
                </div>

                <div>
                  <span className="text-gray-500 text-xs">Question ID</span>
                  <p>{data._id}</p>
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
            variant="outline"
            className="w-full rounded-xl hover:bg-primary hover:text-white h-12"
          >
            Close
          </Button>
        </Modalfooter>
      </Fragment>
    </Modal>
  );

};

export default QuestionsModal;