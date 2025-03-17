export function useStyle() {
  return {
    wrapper: {
      width: 400,
      '& input[type="text"]': {
        textAlign: 'center',
        width: '100%',
        flex: 1,
      },
    },
  };
}
