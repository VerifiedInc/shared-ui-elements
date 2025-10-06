export function useTTSMagicLink(domain: string, hash: string) {
  return `${domain}/tts/${hash}`;
}
