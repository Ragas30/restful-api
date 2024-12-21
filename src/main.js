import dotenv from "dotenv";
import { web } from "./app/web.js";
import { logger } from "./app/logging.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

web.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
