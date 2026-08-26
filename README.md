# CHIP-8 Emulator

A deliberately small, from-scratch CHIP-8 emulator that runs in a browser.

The point is not to produce the world's 800th emulator and pretend that was useful. The point is to make each piece of a tiny computer understandable: memory, registers, a program counter, an instruction loop, a screen, timers, and input.

## Run it in a Codespace

No dependencies are required.

1. Open this repository in a GitHub Codespace.
2. In its terminal, run `python3 -m http.server 8000`.
3. Open the forwarded port in the browser.

You can also open `index.html` directly for the initial screen, but use a local server once modules are involved.

## Project shape

- `src/chip8.js` — the emulated machine: memory, registers, CPU cycle, timers.
- `src/main.js` — browser controls and drawing the 64×32 CHIP-8 display.
- `index.html` and `styles.css` — a plain browser interface; no framework smuggled in under a trench coat.

## Learning path

- [x] Make a browser shell with a correctly sized pixel display.
- [x] Create the basic machine state.
- [ ] Write a tiny program directly into memory and inspect the opcode fetch.
- [ ] Decode and implement a few instructions: `CLS`, `JP`, `LD`, and `ADD`.
- [ ] Load a ROM file at address `0x200`.
- [ ] Implement drawing, keypad input, stack calls, and timers.
- [ ] Run a public CHIP-8 test ROM, then a game.

Each checkpoint should be committed separately. When something breaks, a small commit gives us a crime scene instead of a landfill.

## CHIP-8 facts worth keeping nearby

| Part | Value |
| --- | --- |
| Memory | 4 KB (4096 bytes) |
| Display | 64 × 32 monochrome pixels |
| General registers | 16, named V0–VF |
| Program start | `0x200` |
| Opcode width | 2 bytes |
| Keypad | 16 hexadecimal keys |

The classic reference is [Cowgod's CHIP-8 Technical Reference](http://devernay.free.fr/hacks/chip8/C8TECH10.HTM). It is useful, but CHIP-8 has a few historical quirks; we will choose and document one behaviour where implementations disagree.
