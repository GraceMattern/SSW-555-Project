const utils = {
  withGrid(n) {
    return n * 16;
  },
  //
  emitEvent(name, detail) {
    const event = new CustomEvent(name, {
      detail,
    });
    document.dispatchEvent(event);
  },
};
