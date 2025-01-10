export function useStyle() {
  return {
    wrapper: {
      width: 320,
      '& input[type="text"]': {
        textAlign: 'center',
        width: '100%',
        flex: 1,
      },
    },
  };
}
