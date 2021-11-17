import { ArgsType, Field } from "@nestjs/graphql";
import { AnswerWhereUniqueInput } from "./AnswerWhereUniqueInput";
import { AnswerUpdateInput } from "./AnswerUpdateInput";

@ArgsType()
class UpdateAnswerArgs {
  @Field(() => AnswerWhereUniqueInput, { nullable: false })
  where!: AnswerWhereUniqueInput;
  @Field(() => AnswerUpdateInput, { nullable: false })
  data!: AnswerUpdateInput;
}

export { UpdateAnswerArgs };
