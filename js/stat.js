'use strict';

const CLOUD_HEIGHT = 270;
const CLOUD_WIDTH = 420;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_Y_BOTTOM = CLOUD_Y + CLOUD_HEIGHT;
const CLOUD_GAP = 10;
const CONTENT_GAP = 20;
const CLOUD_FONT = 16;
const BAR_HEIGHT = 150;
const BAR_WIDTH = 40;
const BAR_GAP = 50;


const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (maxElement < arr[i]) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

const randomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};


const renderPlayersResults = function (ctx, names, times) {
  let maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    let currentBarHeight = (BAR_HEIGHT * times[i]) / maxTime;
    let currentX = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    let currentY = CLOUD_Y_BOTTOM - CONTENT_GAP;
    let currentTime = Math.round(times[i]);

    ctx.fillStyle = `#000000`;
    ctx.fillText(
        names[i],
        currentX,
        currentY
    );
    ctx.fillText(
        currentTime,
        currentX,
        currentY - CLOUD_FONT - currentBarHeight - CONTENT_GAP
    );

    ctx.fillStyle = (names[i] === `Вы`) ? `rgba(255, 0, 0, 1)` : `hsl(230, ${randomInt(100)}%, 50%)`;

    ctx.fillRect(
        currentX,
        currentY - CLOUD_FONT,
        BAR_WIDTH,
        currentBarHeight * (-1)
    );
  }
};

function renderText(canv, x, y, text) {
  const strs = text.split(`\n`);
  let currentY = y;

  canv.fillStyle = `#000000`;
  canv.font = `16px PT Mono`;
  canv.textBaseline = `hanging`;

  strs.forEach((str) => {
    canv.fillText(str, x, currentY);
    currentY += CLOUD_FONT + CLOUD_GAP;
  });
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CLOUD_X + CLOUD_GAP,
      CLOUD_Y + CLOUD_GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#ffffff`
  );

  renderText(ctx, CLOUD_X + CONTENT_GAP, CLOUD_Y + CONTENT_GAP, `Ура вы победили! \nСписок результатов:`);
  renderPlayersResults(ctx, names, times);
};
