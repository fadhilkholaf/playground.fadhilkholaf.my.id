"use server";

import prisma from "@/lib/prisma";

export const createMessage = async (content: string) =>
  await prisma.message.create({ data: { content } });

export const findManyMessage = async () =>
  await prisma.message.findMany({
    select: { content: true, createdAt: true },
    orderBy: { createdAt: "asc" },
    take: 100,
  });
