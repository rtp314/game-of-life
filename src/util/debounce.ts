let timeout: number | null = null;

export default function debounce(func: (x: any) => any, delay: number = 600) {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(func, delay);
}
