import asyncify from "./utils.js";

const isPrime = (n) => {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};

const primeTask = (() => {
  let number = 1;
  return () => {
    number++;
    if (isPrime(number)) {
      console.log(`Простое число найдено: ${number}`);
    }
  };
})();

(async () => {
  await asyncify(primeTask, {
    minIterations: 5, // min num of iterations
    maxIterations: 10, // max num of iterations
    minDuration: 1000, // min interval between iterations (1 second)
    maxDuration: 60000, // max interval between iterations (60 seconds)
    timeout: 2000, // pause between bloks of iterations (2 seconds)
  });
})();
