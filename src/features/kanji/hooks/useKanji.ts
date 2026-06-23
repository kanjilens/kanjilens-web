import { useContext } from "react";
import { KanjiContext } from "@features/kanji/context/kanjiContext";

export function useKanji() {
  return useContext(KanjiContext);
}
