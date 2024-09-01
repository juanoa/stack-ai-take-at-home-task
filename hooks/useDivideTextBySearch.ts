export const useDivideTextBySearch = (text: string, search: string): Array<string> => {
  if (search === "") {
    return [text];
  }

  const searchIndex = text.toLowerCase().indexOf(search.toLowerCase());
  if (searchIndex === -1) {
    return [text];
  }

  const beforeSearch = text.slice(0, searchIndex);
  const afterSearch = text.slice(searchIndex + search.length);

  return [beforeSearch, search, afterSearch];
};
