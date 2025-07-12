import { defineConfig } from 'rolldown';

export default defineConfig({
  input: './src/bot.ts',
  output: {
    dir: "./api",
  },
});