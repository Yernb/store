'use client'

import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/AuthContext'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <WhatsAppButton />
      </CartProvider>
    </AuthProvider>
  )
}

