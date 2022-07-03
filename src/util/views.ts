const parseViews = (viewCount: string) => {
  const viewInNumber = parseInt(viewCount);
  if (viewCount.length === 6) {
    return `${viewCount.substring(0, 3)}.${viewCount.substring(4, 5)}K`;
  } else {
    return `${viewCount.substring(0, 1)}.${viewCount.substring(1, 2)}M`;
  }
};

export { parseViews };
