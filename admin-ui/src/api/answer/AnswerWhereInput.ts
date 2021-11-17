import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type AnswerWhereInput = {
  id?: StringFilter;
  userId?: StringNullableFilter;
};
