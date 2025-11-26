export default async function Sleep(ms: number=1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}