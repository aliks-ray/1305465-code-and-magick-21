'use strict';

const  CANVAS_HEIGHT = 270;
const  CANVAS_WIDTH = 420;
const  CANVAS_X = 100;
const  CANVAS_Y = 10;
const  CANVAS_Y_BOTTOM = CANVAS_Y + CANVAS_HEIGHT;
const  CANVAS_GAP = 10;
const  CONTENT_GAP = 20;
const  CANVAS_FONT = 16;
const  BAR_HEIGHT = 150;
const  BAR_WIDTH = 40;
const  BAR_GAP = 50;


let renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CANVAS_WIDTH, CANVAS_HEIGHT);
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
    let currentX = CANVAS_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    let currentY = CANVAS_Y_BOTTOM - CONTENT_GAP;
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
        currentY - CANVAS_FONT - currentBarHeight - CANVAS_GAP
    );

    ctx.fillStyle = (names[i] === `Вы`) ? `rgba(255, 0, 0, 1)` : `hsl(230, 50%, ${randomInt(100)}%)`;

    ctx.fillRect(
        currentX,
        currentY - CANVAS_FONT,
        BAR_WIDTH,
        currentBarHeight * (-1)
    );
  }
};


window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CANVAS_X + CANVAS_GAP,
      CANVAS_Y + CANVAS_GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  renderCloud(
      ctx,
      CANVAS_X,
      CANVAS_Y,
      `#ffffff`
  );

  ctx.fillStyle = `#000000`;
  ctx.font = `16px PT Mono`;
  ctx.fillText(
      `Ура вы победили!`,
      CANVAS_X + CONTENT_GAP,
      CANVAS_Y + CONTENT_GAP + CANVAS_FONT
  );
  ctx.fillText(
      `Список результатов: `,
      CANVAS_X + CONTENT_GAP,
      CANVAS_Y + CONTENT_GAP + CANVAS_FONT * 2
  );

  renderPlayersResults(ctx, names, times);
};
