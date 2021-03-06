import { PrismaService } from "nestjs-prisma";
import { Prisma, Answer } from "@prisma/client";

export class AnswerServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.AnswerFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.AnswerFindManyArgs>
  ): Promise<number> {
    return this.prisma.answer.count(args);
  }

  async findMany<T extends Prisma.AnswerFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.AnswerFindManyArgs>
  ): Promise<Answer[]> {
    return this.prisma.answer.findMany(args);
  }
  async findOne<T extends Prisma.AnswerFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.AnswerFindUniqueArgs>
  ): Promise<Answer | null> {
    return this.prisma.answer.findUnique(args);
  }
  async create<T extends Prisma.AnswerCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AnswerCreateArgs>
  ): Promise<Answer> {
    return this.prisma.answer.create<T>(args);
  }
  async update<T extends Prisma.AnswerUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AnswerUpdateArgs>
  ): Promise<Answer> {
    return this.prisma.answer.update<T>(args);
  }
  async delete<T extends Prisma.AnswerDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.AnswerDeleteArgs>
  ): Promise<Answer> {
    return this.prisma.answer.delete(args);
  }
}
