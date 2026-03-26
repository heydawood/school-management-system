import React from "react";

interface Props {
  image: string;
  imageWidth?: string;
  width?: number;
  height?: number;
  classNames?: string;
}

const NextImage: React.FC<Props> = ({
  image,
  imageWidth,
  width = 400,
  height = 400,
  classNames,
}) => {
  const resolvedImage =
    image && (image.startsWith("http") || image.startsWith("/"))
      ? image
      : `${image}`;

  return (
    <img
      src={resolvedImage}
      alt="image"
      width={width}
      height={height}
      className={
        classNames
          ? classNames
          : `${imageWidth ?? ""} ${
              imageWidth ? "" : "min-h-full w-full"
            } object-cover`
      }
    />
  );
};

export default NextImage;
