import p5 from 'p5';

export class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: p5.Color; //
  glowSize: number; // 光暈大小
  alpha: number; // 光暈透明度
  ay: number; // 加速度（模擬重力）

  constructor(sketch: p5) {
    const startColor = sketch.color(255, 215, 0); // 金色
    const endColor = sketch.color(255, 105, 0); // 橙色
    this.color = sketch.lerpColor(startColor, endColor, sketch.random(1)); // 根據隨機值設置漸層位置
    this.glowSize = 0; // 光暈大小
    this.alpha = 50; // 初始光暈透明度
    const edge = Math.floor(sketch.random(4));
    this.ay = sketch.random(0.02, 0.05); // 模擬下墜加速度
    if (edge === 0) {
      // 左邊
      this.x = -10;
      this.y = sketch.random(sketch.height);
      this.vx = sketch.random(1, 2);
      this.vy = sketch.random(-1, 1);
    } else if (edge === 1) {
      // 右邊
      this.x = sketch.width + 10;
      this.y = sketch.random(sketch.height);
      this.vx = sketch.random(-2, -1);
      this.vy = sketch.random(-1, 1);
    } else if (edge === 2) {
      // 上方
      this.x = sketch.random(sketch.width);
      this.y = -10;
      this.vx = sketch.random(-1, 1);
      this.vy = sketch.random(1, 2);
    } else {
      // 下方
      this.x = sketch.random(sketch.width);
      this.y = sketch.height + 10;
      this.vx = sketch.random(-1, 1);
      this.vy = sketch.random(-2, -1);
    }
    this.size = sketch.random(10, 500); // 修正：粒子大小範圍設置為 10 到 30
  }

  // 更新粒子的狀態
  update(sketch: p5, volume: number) {
    this.size = sketch.map(volume, 0, 255, 8, 20);
    // 重力往下
    this.vy += this.ay;

    // 左右輕微擺動（類似浮動的水感）
    this.vx += sketch.random(-0.05, 0.05);
    this.glowSize = sketch.map(volume, 0, 255, 0, 50);
    this.alpha = sketch.map(
      sketch.noise(this.x * 0.01, this.y * 0.01),
      0,
      1,
      20,
      50
    );
    this.x += this.vx;
    this.y += this.vy;
  }

  // 顯示粒子
  show(sketch: p5) {
    // 光暈（模糊外圈）
    sketch.noStroke();
    sketch.fill(
      sketch.red(this.color),
      sketch.green(this.color),
      sketch.blue(this.color),
      this.alpha
    );
    sketch.ellipse(
      this.x,
      this.y,
      this.glowSize + this.size,
      this.glowSize + this.size
    );

    // 陰影層（金幣底部暗）
    const shadowColor = sketch.color(120, 90, 20); // 深金色
    sketch.fill(shadowColor);
    sketch.ellipse(this.x + 2, this.y + 2, this.size, this.size);

    // 主體層（金幣主色）
    sketch.fill(this.color);
    sketch.ellipse(this.x, this.y, this.size, this.size);

    // 高光層（金幣上方亮）
    sketch.fill(255, 255, 255, 100); // 半透明白
    sketch.ellipse(
      this.x - this.size * 0.15,
      this.y - this.size * 0.15,
      this.size * 0.3,
      this.size * 0.3
    );
  }

  // 檢查粒子是否超出邊界
  isOutOfBounds(sketch: p5): boolean {
    return (
      this.x < -50 ||
      this.x > sketch.width + 50 ||
      this.y < -50 ||
      this.y > sketch.height + 50
    );
  }
}
