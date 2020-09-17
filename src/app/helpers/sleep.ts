export default function(time): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });
}
