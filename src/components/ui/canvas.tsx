interface NodeType {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface LineType {
  spring: number;
  friction: number;
  nodes: NodeType[];
  init(e: { spring: number }): void;
  update(): void;
  draw(): void;
}

interface AnimatorType {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
  init(e: { phase?: number; offset?: number; frequency?: number; amplitude?: number }): void;
  update(): number;
  value(): number;
}

interface CanvasContextExtended extends CanvasRenderingContext2D {
  running?: boolean;
  frame?: number;
}

interface TouchEventWithClient extends TouchEvent {
  clientX?: number;
  clientY?: number;
}

let ctx: CanvasContextExtended,
  f: AnimatorType,
  e = 0,
  pos: { x: number; y: number } = { x: 0, y: 0 },
  lines: LineType[] = [],
  E = {
    debug: false,
    friction: 0.5,
    trails: 45,
    size: 35,
    dampening: 0.025,
    tension: 0.98,
  };

function Node(this: NodeType) {
  this.x = 0;
  this.y = 0;
  this.vy = 0;
  this.vx = 0;
}

function n(this: AnimatorType, e: { phase?: number; offset?: number; frequency?: number; amplitude?: number }) {
  this.init(e || {});
}

n.prototype = {
  init: function (e: { phase?: number; offset?: number; frequency?: number; amplitude?: number }) {
    this.phase = e.phase || 0;
    this.offset = e.offset || 0;
    this.frequency = e.frequency || 0.001;
    this.amplitude = e.amplitude || 1;
  },
  update: function () {
    this.phase += this.frequency;
    e = this.offset + Math.sin(this.phase) * this.amplitude;
    return e;
  },
  value: function () {
    return e;
  },
};

function Line(this: LineType, e: { spring: number }) {
  this.init(e || {});
}

Line.prototype = {
  init: function (e: { spring: number }) {
    this.spring = e.spring + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (let n = 0; n < E.size; n++) {
      const node = new (Node as any)() as NodeType;
      node.x = pos.x;
      node.y = pos.y;
      this.nodes.push(node);
    }
  },
  update: function () {
    let e = this.spring,
      t = this.nodes[0];
    t.vx += (pos.x - t.x) * e;
    t.vy += (pos.y - t.y) * e;
    for (var n, i = 0, a = this.nodes.length; i < a; i++)
      (t = this.nodes[i]),
        0 < i &&
          ((n = this.nodes[i - 1]),
          (t.vx += (n.x - t.x) * e),
          (t.vy += (n.y - t.y) * e),
          (t.vx += n.vx * E.dampening),
          (t.vy += n.vy * E.dampening)),
        (t.vx *= this.friction),
        (t.vy *= this.friction),
        (t.x += t.vx),
        (t.y += t.vy),
        (e *= E.tension);
  },
  draw: function () {
    let e,
      t,
      n = this.nodes[0].x,
      i = this.nodes[0].y;
    ctx.beginPath();
    ctx.moveTo(n, i);
    for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
      e = this.nodes[a];
      t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    e = this.nodes[a];
    t = this.nodes[a + 1];
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    ctx.stroke();
    ctx.closePath();
  },
};

function onMousemove(e: MouseEvent | TouchEvent) {
  function o() {
    lines = [];
    for (let e = 0; e < E.trails; e++)
      lines.push(new (Line as any)({ spring: 0.45 + (e / E.trails) * 0.025 }));
  }

  function c(e: MouseEvent | TouchEvent) {
    if ('touches' in e) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    } else {
      pos.x = (e as MouseEvent).clientX;
      pos.y = (e as MouseEvent).clientY;
    }
    e.preventDefault();
  }

  function l(e: TouchEvent) {
    if (e.touches.length === 1) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    }
  }

  document.removeEventListener("mousemove", onMousemove as EventListener);
  document.removeEventListener("touchstart", onMousemove as EventListener);
  document.addEventListener("mousemove", c as EventListener);
  document.addEventListener("touchmove", c as EventListener);
  document.addEventListener("touchstart", l);
  c(e);
  o();
  render();
}

function render() {
  if (ctx?.running) {
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ",100%,50%,0.02)";
    ctx.lineWidth = 6;
    for (var e, t = 0; t < E.trails; t++) {
      (e = lines[t]).update();
      e.draw();
    }
    ctx.frame = (ctx.frame || 0) + 1;
    window.requestAnimationFrame(render);
  }
}

function resizeCanvas() {
  ctx.canvas.width = window.innerWidth - 20;
  ctx.canvas.height = window.innerHeight;
}

export const renderCanvas = function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) return;
  
  ctx = canvas.getContext("2d") as CanvasContextExtended;
  if (!ctx) return;

  ctx.running = true;
  ctx.frame = 1;
  f = new (n as any)({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });
  document.addEventListener("mousemove", onMousemove);
  document.addEventListener("touchstart", onMousemove);
  document.body.addEventListener("orientationchange", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("focus", () => {
    if (!ctx.running) {
      ctx.running = true;
      render();
    }
  });
  window.addEventListener("blur", () => {
    ctx.running = true;
  });
  resizeCanvas();
};

export { onMousemove, resizeCanvas }; 