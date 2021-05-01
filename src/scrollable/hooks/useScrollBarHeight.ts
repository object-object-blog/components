export const useScrollBarHeight = (
  clientHeight: number,
  scrollHeight: number,
) => {
  return (clientHeight / scrollHeight) * clientHeight;
};
