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

A versão é `<major.minor do package.json>.<número do build>` — começa em **2.1.0**. Para abrir uma versão nova
(ex.: 2.2), mude o `version` do `package.json` e ponha em `PRIMEIRO_BUILD`, no workflow, o número do próximo build.

> ⚠️ Cada push na `main` gera uma versão que chega a todos os celulares. Trabalhe numa branch e só leve para a
> `main` o que estiver testado.

### Segredos necessários (uma vez só)

Em **Settings → Secrets and variables → Actions → New repository secret**:

| Segredo | Valor |
|---|---|
| `KEYSTORE_BASE64` | O arquivo `release.keystore` atual em base64 (`base64 -w0 release.keystore`) |
| `KEYSTORE_PASSWORD` | Senha da keystore |
| `KEY_PASSWORD` | Senha da chave (alias `barerp`) |

Tem que ser **a mesma chave** dos APKs já instalados: com outra chave o Android recusa a atualização e o app teria
que ser desinstalado e instalado de novo em cada celular. Sem o segredo o build para com erro, de propósito.
A chave **nunca** vai para o repositório (o `.gitignore` bloqueia `*.keystore` e `*.jks`).

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
