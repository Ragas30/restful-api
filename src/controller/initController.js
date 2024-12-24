import init from "../services/initService.js";

export const initController = async (req, res, next) => {
  try {
    const result = await init();
    res.status(201).json({
      success: true,
      message: "Init successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
