import { ArgsType, Field } from "@nestjs/graphql";
import { AnswerCreateInput } from "./AnswerCreateInput";

@ArgsType()
class CreateAnswerArgs {
  @Field(() => AnswerCreateInput, { nullable: false })
  data!: AnswerCreateInput;
}

export { CreateAnswerArgs };
