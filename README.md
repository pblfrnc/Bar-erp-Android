# 📱 BarERP Pro — Android

Apps Android do **BarERP Pro** para usar com o programa do caixa (computador):

| App | Para quem | O que faz |
|---|---|---|
| **BarERP Garçom** (`com.barerp.app`) | Garçons | Abre mesas, lança pedidos e pede a conta direto do celular |
| **BarERP Cozinha** (`com.barerp.kds`) | Cozinha e bar | Mostra a fila de pedidos (KDS) e marca os pratos prontos |

Os celulares se conectam ao computador do caixa pelo Wi-Fi do bar, lendo o QR Code da tela
**Conectar celular** do BarERP Pro. Não precisa de internet para trabalhar.

---

## 🔄 Canal de atualização

Este repositório é o canal oficial dos APKs:

1. Cada push na `main` roda o `.github/workflows/release.yml`: compila os dois APKs e publica na release
   **`latest`** com um `version.json`.
2. Os apps instalados consultam esse `version.json` a cada 30 minutos (e ao voltar para o app). Quando há versão
   nova aparece um aviso; o app baixa o APK e abre o instalador do Android.

A versão começa em **2.1.0** e cada publicação soma 1 no último número (builds que falham não contam). Para abrir
uma versão nova (ex.: 2.2), mude o `version` do `package.json` para `2.2.0`: a contagem volta a `.0`.

> ⚠️ Cada push na `main` gera uma versão que chega a todos os celulares. Trabalhe numa branch e só leve para a
> `main` o que estiver testado.

### Chave de assinatura

Os APKs são assinados com o `android/app/release.keystore` (alias `barerp`, senha `barerp123`), **a mesma chave**
dos APKs já instalados: com outra chave o Android recusa a atualização e o app teria que ser desinstalado e
instalado de novo em cada celular. Sem a chave o build para com erro, de propósito.

Para não deixar a chave no código público, dá para usar segredos em **Settings → Secrets and variables → Actions**:
`KEYSTORE_BASE64` (o arquivo em base64), `KEYSTORE_PASSWORD` e `KEY_PASSWORD`. Com o segredo cadastrado, ele vale
no lugar do arquivo.

### Celulares que já têm o app

Os APKs até a versão 1.9.1 procuram atualização no repositório antigo. Na primeira vez, baixe o APK da release
`latest` deste repositório e instale por cima do app atual (os dados e a conexão continuam). Daí em diante as
atualizações chegam sozinhas por aqui.

---

## 🛠️ Desenvolvimento

```bash
npm ci
npm run dev                # navegador, com proxy para o servidor do caixa em localhost:3001
npm run build:waiter       # build web do Garçom
npm run build:kds          # build web da Cozinha
npm run cap:build:waiter   # build + copia para o projeto Android (abra com npm run cap:open)
```

- `src/WaiterApp.tsx` e `src/KdsApp.tsx` são as telas de cada app; o modo sai do `vite --mode`.
- `src/services/appUpdate.ts` + `android/app/src/main/java/com/barerp/app/AppUpdaterPlugin.java`: atualização.
- O servidor do caixa (projeto [Bar-ERP-RUST](https://github.com/pblfrnc/Bar-ERP-RUST)) mantém a mesma API REST e
  o mesmo Socket.IO; mudanças de API precisam acontecer nos dois projetos juntos.

Código vindo da pasta `client/` do projeto `pblfrnc/bar-erp` (commit `1bc4622`, versão 1.9.1).
