import { useEffect } from "react";

import { useKanjiDetails } from "./useKanjiDetails";

export function useGradeKanjis(grade: string, limit = 30) {
  const api = useKanjiDetails();

  useEffect(() => {
    api.loadByList(grade, limit);
  }, [grade, limit, api]);

  return api;
}
