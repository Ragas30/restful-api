import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { publicRoute } from "../routes/publicRoute.js";
import { errorMiddleware } from "../middlewares/errorMiddleware.js";

export const web = express();
web.use(cors());
web.use(express.json());

const getRoutes = (app) => {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      routes.push(middleware.route);
    } else if (middleware.name === "router") {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push(handler.route);
        }
      });
    }
  });
  return routes;
};

web.use("/api", publicRoute);

const routes = getRoutes(web);

const generateSwaggerPaths = (routes) => {
  const paths = {};
  routes.forEach((route) => {
    const methods = Object.keys(route.methods);
    methods.forEach((method) => {
      if (!paths[route.path]) {
        paths[route.path] = {};
      }
      paths[route.path][method] = {
        summary: `Endpoint for ${route.path}`,
        description: `Automatically generated for ${route.path}`,
        responses: {
          200: {
            description: "Success",
          },
        },
      };
    });
  });
  return paths;
};

const swaggerPaths = generateSwaggerPaths(routes);

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Dynamic API Documentation",
    version: "1.0.0",
    description: "This is the dynamically generated API documentation.",
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Local server",
    },
  ],
  paths: swaggerPaths,
};

web.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

web.use(errorMiddleware);
