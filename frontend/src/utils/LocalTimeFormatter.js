export default function LocalTimeFormatter(time) {
  const localTime = new Date(time).toUTCString().slice(0, -13);
  return localTime;
}
