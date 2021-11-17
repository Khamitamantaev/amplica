import { Answer as TAnswer } from "../api/answer/Answer";

export const ANSWER_TITLE_FIELD = "userId";

export const AnswerTitle = (record: TAnswer): string => {
  return record.userId || record.id;
};
