const asyncify = async (task, options = {}) => {
  const {
    minIterations = 1,
    maxIterations = Infinity,
    minDuration = 0,
    maxDuration = Infinity,
    timeout = 0,
  } = options;

  const startTime = Date.now();
  let totalIterations = 0;

  const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
};
