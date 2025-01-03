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

  const logIterationStats = (iterations, duration) => {
    console.log(`Выполнено ${iterations} итераций за ${duration} мс.`);
  };

  try {
    while (Date.now() - startTime < maxDuration) {
      const blockStartTime = Date.now();
      let blockIterations = 0;

      while (blockIterations < maxIterations) {
        task();
        blockIterations++;
        totalIterations++;

        const elapsedTimeBlock = Date.now() - blockStartTime;
        const hasCompletedMinIterations = totalIterations >= minIterations;
        const hasCompletedMinDuration = elapsedTimeBlock >= minDuration;

        if (hasCompletedMinIterations && hasCompletedMinDuration) {
          break;
        }
      }

      const blockDuration = Date.now() - blockStartTime;
      const isMaxIterationsReached = blockIterations >= maxIterations;
      const isMaxDurationReached = blockDuration >= maxDuration;

      if (isMaxIterationsReached || isMaxDurationReached) {
        logIterationStats(blockIterations, blockDuration);
        await pause(timeout);
      }
    }

    console.log(`Задача завершена. Всего итераций: ${totalIterations}`);
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
};

export default asyncify;
