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
