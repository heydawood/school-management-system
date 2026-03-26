export interface LearningHubFormTypes {
  titleEn: string;
  image?: string;
  video?: string;
  description?: string;
}

export interface SingleLearningHubType {
  dietPlanId: number;
  titleEn: string;
  titleAr: string;
  titleUr: string;
  imageShortUrl: string;
  imageFullUrl: string;
  videoShortUrl: string;
  videoFullUrl: string;
  description: string;
  isActive: boolean;
}

export const LearningHubFormDefaultValues: LearningHubFormTypes = {
  titleEn: '',
  image: '',
  video: '',
  description: '',
};

export const SetLearningHubFormDefaultValues = (learningHub: SingleLearningHubType) => {
  return {
    titleEn: learningHub.titleEn,
    description: learningHub.description,
    video: learningHub?.videoShortUrl ?? '',
    image: learningHub?.imageShortUrl ?? '',
  };
};
