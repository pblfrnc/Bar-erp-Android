// Determina qual aplicativo está rodando com base na plataforma ou rota:
// 1. App da Cozinha / KDS: build com target kds, ou rota /kds ou /cozinha
// 2. App do Garçom: build com target waiter, Capacitor nativo ou rota /garcom
// 3. Painel do PC / Gestão: padrão desktop / caixa
const pathname = typeof window !== 'undefined' ? window.location.pathname.toLowerCase() : '';
const isKdsTarget = import.meta.env.VITE_APP_TARGET === 'kds' || import.meta.env.MODE === 'kds';
const isKdsUrl = pathname.startsWith('/kds') || pathname.startsWith('/cozinha');
export const isKdsApp = isKdsTarget || isKdsUrl;

const isWaiterTarget = import.meta.env.VITE_APP_TARGET === 'waiter' || import.meta.env.MODE === 'waiter';
const isGarcomUrl = pathname.startsWith('/garcom') || pathname.startsWith('/waiter');
const isNative = typeof window !== 'undefined' && Boolean((window as any).Capacitor?.isNativePlatform?.());

export const isWaiterApp = !isKdsApp && (isWaiterTarget || isNative || isGarcomUrl);

// O garçom não concede desconto: isso fica só no caixa
export const WAITER_DISCOUNT_BLOCKED = 'Desconto só pode ser concedido no caixa.';
