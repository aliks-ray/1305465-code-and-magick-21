'use strict';

let wizards = [];

const getRank = (wizard) => {
  let rank = 0;

  if (wizard.colorCoat === window.wizard.state.coatColor) {
    rank += 2;
  }

  if (wizard.colorEyes === window.wizard.state.eyesColor) {
    rank += 1;
  }
  return rank;
};

const namesComparator = function (left, right) {
  if (left > right) {
    return 1;
  } else if (left < right) {
    return -1;
  } else {
    return 0;
  }
};

const updateWizards = () => {
  window.render.createSimilarWizards(wizards.sort((a, b) => {
    let rankDiff = getRank(b) - getRank(a);
    if (rankDiff === 0) {
      rankDiff = namesComparator(a.name, b.name);
    }
    return rankDiff;
  }));
};

const successLoding = (data) => {
  wizards = data;
  updateWizards();
};

window.backend.load(successLoding, window.util.onError);

window.setup = {
  updateWizards
};
