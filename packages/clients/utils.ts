export async function fetch_retry(
  url: string,
  options: RequestInit<RequestInitCfProperties>,
  n: number
): Promise<Response> {
  try {
    return await fetch(url, options);
  } catch (error) {
    console.log('Error fetching data, retrying...', error);
    if (n === 1) throw error;
    return await fetch_retry(url, options, n - 1);
  }
}
