export default function wait(seconds) {
  const start = new Date();
  while ((new Date() - start) / 1000 < seconds) {
    // just wait
  }
}
