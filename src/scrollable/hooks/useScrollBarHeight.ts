export const useScrollBarHeight = (
  clientHeight: number,
  scrollHeight: number,
) => {
  return Math.max(44, (clientHeight / scrollHeight) * clientHeight);
};
