let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

export const navigate = (path, options = {}) => {
  if (navigator) {
    navigator(path, options);
  } else {
    console.warn("Navigator not set yet");
  }
};
