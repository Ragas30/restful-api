import { getPenyakitService } from "../services/penyakitService.js";

export const getPenyakit = async (req, res, next) => {
  try {
    const result = await getPenyakitService();
    res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
