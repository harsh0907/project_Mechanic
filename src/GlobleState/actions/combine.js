export const combine_Change = change => {
  return {
    type: 'change',
    payload: change,
  };
};

export const combine_Buffer_change = buffer => {
  return {
    type: 'buffer_change',
    payload: buffer,
  };
};
