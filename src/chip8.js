export const CHIP_8 = Object.freeze({
  MEMORY_SIZE: 4096,
  PROGRAM_START: 0x200,
  DISPLAY_WIDTH: 64,
  DISPLAY_HEIGHT: 32,
  REGISTER_COUNT: 16,
  STACK_SIZE: 16,
});

/**
 * The machine state. Keep this file stubbornly boring: no DOM, no canvas,
 * and no browser event listeners. That separation makes the CPU testable.
 */
export class Chip8 {
  constructor() {
    this.reset();
  }

  reset() {
    this.memory = new Uint8Array(CHIP_8.MEMORY_SIZE);
    this.v = new Uint8Array(CHIP_8.REGISTER_COUNT);
    this.display = new Uint8Array(
      CHIP_8.DISPLAY_WIDTH * CHIP_8.DISPLAY_HEIGHT,
    );
    this.keys = new Uint8Array(CHIP_8.REGISTER_COUNT);
    this.stack = new Uint16Array(CHIP_8.STACK_SIZE);

    this.i = 0;
    this.pc = CHIP_8.PROGRAM_START;
    this.sp = 0;
    this.delayTimer = 0;
    this.soundTimer = 0;
    this.lastOpcode = null;
  }

  loadProgram(bytes) {
    const availableMemory = CHIP_8.MEMORY_SIZE - CHIP_8.PROGRAM_START;

    if (bytes.length > availableMemory) {
      throw new RangeError("The program does not fit in CHIP-8 memory.");
    }

    this.memory.set(bytes, CHIP_8.PROGRAM_START);
    this.pc = CHIP_8.PROGRAM_START;
  }

  fetchOpcode() {
    if (this.pc < 0 || this.pc + 1 >= CHIP_8.MEMORY_SIZE) {
      throw new RangeError(`Program counter escaped memory: 0x${this.pc.toString(16)}`);
    }

    // CHIP-8 opcodes are two bytes, with the high byte first.
    return (this.memory[this.pc] << 8) | this.memory[this.pc + 1];
  }

  step() {
    const opcode = this.fetchOpcode();
    this.lastOpcode = opcode;

    /*
     * Checkpoint 2:
     *
     * Decode opcode here. Start with:
     *
     *   6XNN  ->  VX = NN
     *
     * Hint:
     *   const firstNibble = opcode & 0xF000;
     *   const x = (opcode & 0x0F00) >> 8;
     *   const nn = opcode & 0x00FF;
     *
     * For this temporary fetch-only checkpoint, advance to the next
     * instruction. Once execution begins, each instruction should own
     * its program-counter behaviour.
     */
    this.pc += 2;

    return opcode;
  }
}
