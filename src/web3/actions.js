export const WEB3_INITIALIZED = "WEB3_INITIALIZED";
export function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results
  };
}
