const retry = async (
  fn,
  retries = 5,
  delay = 1000
) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }

    console.log(
      `Retrying... Attempts Left: ${retries}`
    );

    await new Promise((resolve) =>
      setTimeout(resolve, delay)
    );

    return retry(
      fn,
      retries - 1,
      delay * 2
    );
  }
};

module.exports = retry;