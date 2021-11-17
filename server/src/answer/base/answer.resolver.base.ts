import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateAnswerArgs } from "./CreateAnswerArgs";
import { UpdateAnswerArgs } from "./UpdateAnswerArgs";
import { DeleteAnswerArgs } from "./DeleteAnswerArgs";
import { AnswerFindManyArgs } from "./AnswerFindManyArgs";
import { AnswerFindUniqueArgs } from "./AnswerFindUniqueArgs";
import { Answer } from "./Answer";
import { AnswerService } from "../answer.service";

@graphql.Resolver(() => Answer)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class AnswerResolverBase {
  constructor(
    protected readonly service: AnswerService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Answer",
    action: "read",
    possession: "any",
  })
  async _answersMeta(
    @graphql.Args() args: AnswerFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Answer])
  @nestAccessControl.UseRoles({
    resource: "Answer",
    action: "read",
    possession: "any",
  })
  async answers(
    @graphql.Args() args: AnswerFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Answer[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Answer",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Answer, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Answer",
    action: "read",
    possession: "own",
  })
  async answer(
    @graphql.Args() args: AnswerFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Answer | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Answer",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Answer)
  @nestAccessControl.UseRoles({
    resource: "Answer",
    action: "create",
    possession: "any",
  })
  async createAnswer(
    @graphql.Args() args: CreateAnswerArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Answer> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Answer",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Answer"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Answer)
  @nestAccessControl.UseRoles({
    resource: "Answer",
    action: "update",
    possession: "any",
  })
  async updateAnswer(
    @graphql.Args() args: UpdateAnswerArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Answer | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Answer",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Answer"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Answer)
  @nestAccessControl.UseRoles({
    resource: "Answer",
    action: "delete",
    possession: "any",
  })
  async deleteAnswer(
    @graphql.Args() args: DeleteAnswerArgs
  ): Promise<Answer | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
