module.exports = {
  SERVER_ERROR: {
    success: false,
    message: "Something went wrong",
    status: 500,
  },

  NOT_FOUND: {
    success: false,
    message: "Not found",
    status: 404,
  },

  PARAMS_MISSING: {
    success: false,
    message: "Params missing",
    status: 400,
  },

  INVALID_PARAMS: {
    success: false,
    message: "Invalid params",
    status: 400,
  },

  TOKEN_NOT_FOUND: {
    success: false,
    message: "Tokken missing",
    status: 401,
  },

  INVALID_TOKEN: {
    success: false,
    message: "Invalid token",
    status: 403,
  },

  TOKEN_EXPIRED: {
    success: false,
    message: "Token expired",
    status: 403,
  },

  USER_NOT_FOUND: {
    success: false,
    message: "User not found",
    status: 403,
  },
};
