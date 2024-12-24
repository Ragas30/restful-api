import { prismaClient } from "../app/database.js";

export const getPenyakitService = async () => {
  const status = await prismaClient.status.findUnique({
    where: {
      code: "AKT",
    },
    select: {
      id: true,
    },
  });
  console.log(status)

  const penyakit = await prismaClient.penyakit.findMany({
    where: {
      statusId: status.id,
    },
    select: {
      id: true,
      namaPenyakit: true,
      penyebab: true,
      solusi: true,
    },
  });

  return penyakit;
};
