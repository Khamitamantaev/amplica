import { ArgsType, Field } from "@nestjs/graphql";
import { AnswerWhereUniqueInput } from "./AnswerWhereUniqueInput";

@ArgsType()
class AnswerFindUniqueArgs {
  @Field(() => AnswerWhereUniqueInput, { nullable: false })
  where!: AnswerWhereUniqueInput;
}

export { AnswerFindUniqueArgs };
