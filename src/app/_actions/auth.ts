"use server";
import { lucia, validateRequest } from "@/auth";
import db from "@/lib/db";
import {
  SignUpInput,
  signUpSchema,
  loginSchema,
  LoginInput,
} from "@/lib/validation";
import bcrypt from "bcrypt";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpAction(
  credentials: SignUpInput
): Promise<{ error: string }> {
  try {
    const { email, password, username } = signUpSchema.parse(credentials);

    const passwordHash = await bcrypt.hash(password, 10);

    const userId = generateIdFromEntropySize(10);

    const existingUsername = await db.user.findFirst({
      where: {
        userName: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (existingUsername) {
      return { error: "Username already taken" };
    }

    const existingEmail = await db.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (existingEmail) {
      return { error: "Email already taken" };
    }

    await db.user.create({
      data: {
        id: userId,
        email,
        userName: username,
        displayName: username,
        passwordHash,
      },
    });

    const session = await lucia.createSession(userId, {});

    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
    return { error: "An error occurred" };
  }
}

export async function loginAction(
  credentials: LoginInput
): Promise<{ error: string }> {
  try {
    const { username, password } = loginSchema.parse(credentials);

    const user = await db.user.findFirst({
      where: {
        userName: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (!user || !user.passwordHash) {
      return { error: "Invalid username or password" };
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return { error: "Invalid username or password" };
    }

    const session = await lucia.createSession(user.id, {});

    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
    return { error: "An error occurred" };
  }
}

export async function logoutAction() {
  const { session } = await validateRequest();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/login");
}
