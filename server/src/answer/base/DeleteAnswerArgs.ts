import { ArgsType, Field } from "@nestjs/graphql";
import { AnswerWhereUniqueInput } from "./AnswerWhereUniqueInput";

@ArgsType()
class DeleteAnswerArgs {
  @Field(() => AnswerWhereUniqueInput, { nullable: false })
  where!: AnswerWhereUniqueInput;
}

export { DeleteAnswerArgs };
