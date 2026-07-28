import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})



/**
 * se habilita la NUEVA SINTAXIS PARA LA UBICACION DE LOS ARCHIVOS  configura las url. apunta a SRC
 *  
 *        resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  } 
 *  ANTES EL IMPORT ERA import Logo from "../componentes/Logo";  AHORA ES import Logo from "@/componentes/Logo"; CON @
 *  
 * De esta manera VITE SABE que @ = src
 * 
 */