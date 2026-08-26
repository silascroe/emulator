import { CHIP_8, Chip8 } from "./chip8.js";

const SCALE = 10;
const PROBE_PROGRAM = new Uint8Array([
  0x60, 0x0a, // LD V0, 0x0A
  0x70, 0x01, // ADD V0, 0x01
  0x12, 0x00, // JP 0x200
]);

const screen = document.querySelector("#screen");
const context = screen.getContext("2d");
const status = document.querySelector("#status");
const programCounter = document.querySelector("#program-counter");
const indexRegister = document.querySelector("#index-register");
const lastOpcode = document.querySelector("#last-opcode");
const stackDepth = document.querySelector("#stack-depth");
const registers = document.querySelector("#registers");
const stepButton = document.querySelector("#step-button");
const resetButton = document.querySelector("#reset-button");

const chip8 = new Chip8();

function asHex(value, width = 2) {
  return `0x${value.toString(16).toUpperCase().padStart(width, "0")}`;
}

function resetMachine() {
  chip8.reset();
  chip8.loadProgram(PROBE_PROGRAM);
  status.textContent = "Machine reset. Probe program loaded.";
  draw();
  updateInspector();
}

function drawDisplay() {
  context.fillStyle = "#080d0d";
  context.fillRect(0, 0, screen.width, screen.height);

  context.fillStyle = "#b7ff60";

  for (let y = 0; y < CHIP_8.DISPLAY_HEIGHT; y += 1) {
    for (let x = 0; x < CHIP_8.DISPLAY_WIDTH; x += 1) {
      const pixel = chip8.display[y * CHIP_8.DISPLAY_WIDTH + x];

      if (pixel) {
        context.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
      }
    }
  }
}

function updateInspector() {
  programCounter.textContent = asHex(chip8.pc, 4);
  indexRegister.textContent = asHex(chip8.i, 4);
  lastOpcode.textContent =
    chip8.lastOpcode === null ? "—" : asHex(chip8.lastOpcode, 4);
  stackDepth.textContent = String(chip8.sp);

  registers.textContent = Array.from({ length: 4 }, (_, row) => {
    const firstRegister = row * 4;

    return Array.from({ length: 4 }, (_, offset) => {
      const index = firstRegister + offset;
      return `V${index.toString(16).toUpperCase()}  ${asHex(chip8.v[index])}`;
    }).join("   ");
  }).join("\n");
}

function draw() {
  drawDisplay();
}

stepButton.addEventListener("click", () => {
  const opcode = chip8.step();
  status.textContent =
    `Fetched ${asHex(opcode, 4)}. The CPU is not decoding it yet.`;
  draw();
  updateInspector();
});

resetButton.addEventListener("click", resetMachine);

resetMachine();
