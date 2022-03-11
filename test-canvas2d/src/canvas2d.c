#include "canvas.h"

int main() {
  HTMLCanvasElement* canvas = createCanvas("canvas");
  CanvasRenderingContext2D *ctx = canvas->getContext(canvas, "2d"); // only 2d is supported currently
  ctx->setFillStyle(ctx, "#FF0000");
  /* printf("I set the fill style to %s\n", ctx->getFillStyle(ctx)); */
  ctx->fillRect(ctx, 5, 5, 100, 100);
  freeCanvas(canvas);
  return 0;
}
