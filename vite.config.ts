import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  publicDir: "public",
  build: { 
    outDir: "dist", 
    sourcemap: true,
    rollupOptions: {
      input: {
        main: './index.html',
        menu: './menu.html',
        cart: './cart.html',
        signin: './signin.html',
        register: './register.html'
      }
    }
  }
});