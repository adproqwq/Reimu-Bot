import { defineConfig } from 'rolldown';

export default defineConfig({
  input: './api/bot.ts',
  output: {
    dir: "./api",
  },
});