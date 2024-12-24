import { prismaClient } from "../app/database.js";

async function init() {
  const penyakitData = [
    {
      namaPenyakit: "Diabetes",
      penyebab: "Gula darah tinggi",
      solusi: "Diet sehat, olahraga, dan insulin jika diperlukan",
    },
    {
      namaPenyakit: "Hipertensi",
      penyebab: "Tekanan darah tinggi",
      solusi: "Kurangi konsumsi garam, olahraga, dan minum obat sesuai resep",
    },
    {
      namaPenyakit: "Flu",
      penyebab: "Infeksi virus influenza",
      solusi: "Istirahat, minum banyak cairan, dan obat pereda gejala",
    },
    {
      namaPenyakit: "Asma",
      penyebab: "Penyempitan saluran napas",
      solusi: "Hindari pemicu, gunakan inhaler, dan konsultasi ke dokter",
    },
  ];

  const statusData = [
    {
      name: "AKTIF",
      code: "AKT",
    },
    {
      name: "REMOVED",
      code: "REM",
    },
  ];

  try {
    const statusResult = await prismaClient.status.createMany({
      data: statusData,
      skipDuplicates: false,
    });

    const activeStatus = await prismaClient.status.findUnique({
      where: {
        code: "AKT",
      },
    });

    if (!activeStatus) {
      throw new Error("Status with code 'AKT' not found");
    }

    const penyakitDataWithStatus = penyakitData.map((penyakit) => ({
      ...penyakit,
      statusId: activeStatus.id,
    }));

    const penyakitResult = await prismaClient.penyakit.createMany({
      data: penyakitDataWithStatus,
      skipDuplicates: false,
    });

    console.log("Data inserted successfully");

    return {
      penyakit: penyakitResult,
      status: statusResult,
    };
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  } finally {
    await prismaClient.$disconnect();
  }
}

export default init;
