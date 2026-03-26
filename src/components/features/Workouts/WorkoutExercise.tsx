import React from 'react';
import { Badge } from '@/components/ui/badge';
import { truncateText } from '@/Utils/Helpers';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { useCustomAlert } from '@/Common/Components/CustomAlert';

interface WorkoutExerciseProps {
  image: string;
  title: string;
  duration: string;
  description: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const WorkoutExercise: React.FC<WorkoutExerciseProps> = ({ image, title, duration, description, onEdit, onDelete }) => {
  const showAlert = useCustomAlert();
  const handleDelete = () => {
    showAlert({
      title: 'Delete Exercise',
      description: 'Are you sure you want to delete this exercise? Deleted exercise will no longer be able to access again.',
      confirmText: 'Yes',
      cancelText: 'No',
      customLogo: <Icon icon="/icons/trash.svg" />,
      logoClasses: 'bg-error-100 text-error',
      onConfirm: () => {
        onDelete?.();
      },
      classNames: {
        confirmButton: 'hover:bg-error bg-error-25 text-error-800 hover:text-white rounded-xl',
        cancelButton: 'border border-neutral-975 bg-transparent hover:bg-primary hover:border-primary hover:text-white rounded-xl',
      },
    });
  };
  return (
    <div className="flex items-center overflow-hidden gap-4 border rounded-2xl min-h-32 shadow-sm bg-white mb-4">
      {/* Thumbnail */}
      <video id="myVideo" key={image} className="w-32 h-32 object-cover object-center bg-neutral-975">
        <source src={image} type="video/mp4" />
        <source src={image} type="video/ogg" />
        Your browser does not support HTML5 video.
      </video>

      {/* Content */}
      <div className="flex-1 py-3">
        <div className="flex items-center gap-2">
          <h3 className="text-subheading">{title}</h3>
          {duration && <Badge className="bg-neutral-600 text-gray-975 hover:bg-neutral-800 rounded-full py-1">{duration} Min</Badge>}
        </div>
        <p className="mt-1 break-all text-paragraph">{truncateText(description, 100)}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 px-4">
        <button onClick={onEdit} className="w-8 h-8 flex items-center justify-center rounded-full bg-warning-50 text-warning-600 hover:bg-warning-100">
          <Icon icon="/icons/pencil.svg" />
        </button>
        <button onClick={handleDelete} className="w-8 h-8 flex items-center justify-center rounded-full bg-error-50 text-error hover:bg-error-100">
          <Icon icon="/icons/trash.svg" />
        </button>
      </div>
    </div>
  );
};

export default WorkoutExercise;
