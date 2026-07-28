import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router/>
  </StrictMode>,
)

/**
 * FIjate que la APP COMIENZA en ROUTER.. aca arranca todo y el distribuye como zidane todo el juego
 * 
 * 
 * 
 * 
 */