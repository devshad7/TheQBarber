export const formatWaitTime = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} mins wait`;
  }

  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (mins === 0) {
    return `${hrs} hr${hrs > 1 ? "s" : ""} wait`;
  }

  return `${hrs} hr${hrs > 1 ? "s" : ""} ${mins} mins wait`;
};
