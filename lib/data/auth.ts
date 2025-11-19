import {prisma} from '@/lib/prisma';
import type {CreateUserInput} from "@/lib/definitions/application";
import {EmailAlreadyExistsError} from "@/lib/definitions/errors";

export async function createUser(input: CreateUserInput) {
  try {
    return await prisma.user.create({
      data: {
        email: input.email,
        password: input.passwordHash,
        firstName: input.firstName,
        lastName: input.lastName
      },
    });
  } catch (err: any) {
    if (err && typeof err === 'object' && 'code' in err && err.code === 'P2002') {
      throw new EmailAlreadyExistsError();
    }
    throw err;
  }
}