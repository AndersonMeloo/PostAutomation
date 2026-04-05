# 🚀 GUIA COMPLETO DE TESTE - Publicação Automática no YouTube

## PRÉ-REQUISITOS
- ✅ Backend rodando: `npm run start:dev`
- ✅ PostgreSQL rodando
- ✅ POSTMAN instalado
- ✅ Um vídeo .mp4 (mínimo 1MB)
- ✅ Conta Google com YouTube ativado

## MODO AUTOMÁTICO

Agora o backend também consegue importar vídeos sozinho a partir da pasta `uploads/inbox`.

- Coloque o vídeo nessa pasta
- O cron de posts transforma o arquivo em um post PENDING
- O scheduler de publicação envia o vídeo para o YouTube no horário agendado
- Se quiser fixar usuário/nicho padrão, use as variáveis opcionais:
  - `AUTO_POST_USER_ID`
  - `AUTO_POST_NICHE_ID`
  - `LOCAL_VIDEO_INBOX_DIR`

---

## PASSO 1: CRIAR USUÁRIO

**Endpoint:** POST http://localhost:3000/users

**Body (JSON):**
```json
{
  "email": "seu_email@gmail.com",
  "name": "Seu Nome",
  "password": "senha123"
}
```

**Copia o `id` (UUID) retornado** ← IMPORTANTE!

---

## PASSO 2: FAZER LOGIN

**Endpoint:** POST http://localhost:3000/auth/login

**Body:**
```json
{
  "email": "seu_email@gmail.com",
  "password": "senha123"
}
```

**Copia o `accessToken`** ← Vai usar em todas as rotas protegidas

**Adiciona no Header de todas as requisições:**
```
Authorization: Bearer SEU_ACCESS_TOKEN
```

---

## PASSO 3: CONECTAR CONTA YOUTUBE (Google OAuth)

**Passo 3.1 - Teste sem Frontend (pega tokens JSON):**

**Endpoint:** GET http://localhost:3000/auth/google/test

**Resposta:**
```json
{
  "accessToken": "seu_access_token_google",
  "refreshToken": "seu_refresh_token",
  "provider": "google"
}
```

**Copia esses tokens** ← Vai usar no próximo passo

---

**Passo 3.2 - Registrar a conta YouTube no banco:**

Você precisa adicionar manualmente em SocialAccount (via Prisma Studio ou direto no banco).

**OPÇÃO A - Via Prisma Studio (visual):**
```bash
npm run prisma:studio
```

Clique em `SocialAccount` → Add Record:
```
platform: YOUTUBE
accessToken: [token do passo 3.1]
refreshToken: [refresh token do passo 3.1]
tokenExpiry: [data futura, tipo 2027-01-01]
userId: [ID do usuário do passo 1]
```

**OPÇÃO B - Via SQL direto (command line):**
```sql
INSERT INTO "SocialAccount" (id, platform, "accessToken", "refreshToken", "tokenExpiry", "userId")
VALUES (
  'uuid_aleatorio_aqui',
  'YOUTUBE',
  'seu_access_token_google',
  'seu_refresh_token',
  '2027-01-01T00:00:00Z',
  'seu_user_id_aqui'
);
```

---

## PASSO 4: CRIAR UM NICHE

**Endpoint:** POST http://localhost:3000/niches

**Headers:**
```
Authorization: Bearer SEU_ACCESS_TOKEN
```

**Body:**
```json
{
  "name": "Gaming",
  "description": "Vídeos sobre games e streaming",
  "active": true
}
```

**Copia o `id` (nicheId)** ← Vai usar no upload

---

## PASSO 5: FAZER UPLOAD DO VÍDEO (O IMPORTANTE!)

Se quiser continuar com o fluxo manual, este passo ainda funciona.

Se quiser o fluxo 100% automático, basta salvar o vídeo em `uploads/inbox` e deixar o backend rodando.

**Endpoint:** POST http://localhost:3000/posts/upload-video

**Headers:**
```
Authorization: Bearer SEU_ACCESS_TOKEN
```

**Body:** Tab `form-data` (não JSON!)

| Key | Type | Value |
|-----|------|-------|
| `video` | File | [Selecione seu arquivo .mp4] |
| `userId` | Text | SEU_USER_ID (do passo 1) |
| `nicheId` | Text | SEU_NICHE_ID (do passo 4) |
| `title` | Text | Meu Vídeo Incrível |
| `description` | Text | Uma descrição maneira |
| `scheduledAt` | Text | `2026-04-03T14:30:00Z` |

**⚠️ IMPORTANTE - Horário do scheduledAt:**
- Se colocar data/hora **PASSADA**: Publica quase imediatamente (1 minuto)
- Se colocar data/hora **FUTURA**: Aguarda até chegar a hora
- Recomendo: Coloque +2 minutos do horário atual para testar

**EXEMPLO DE scheduledAt:**
```
Horário agora: 14:28
Coloque: 2026-04-03T14:30:00Z
(Aguarda 2 minutos, scheduler publica)
```

---

## PASSO 6: MONITORAR O AGENDAMENTO

**Após fazer upload, vídeo fica PENDING:**

**Endpoint:** GET http://localhost:3000/posts

**Headers:**
```
Authorization: Bearer SEU_ACCESS_TOKEN
```

**Procure pelo seu post:**
```json
{
  "id": "uuid-do-seu-post",
  "title": "Meu Vídeo Incrível",
  "status": "PENDING",
  "scheduledAt": "2026-04-03T14:30:00Z",
  "videoUrl": "uploads/queue/1712152200000_seu_user.mp4"
}
```

---

## PASSO 7: AGUARDAR PUBLICAÇÃO (Scheduler)

**Como funciona:**
1. ⏰ Scheduler roda a cada 1 minuto
2. 🔍 Detecta posts PENDING com `scheduledAt <= agora`
3. 📂 Move arquivo para `uploads/processing/`
4. 🚀 Faz UPLOAD REAL no YouTube (Google API)
5. 📌 Recebe link do YouTube
6. ✅ Marca como POSTED
7. 📦 Move arquivo para `uploads/published/`

---

## PASSO 8: VERIFICAR POST PUBLICADO

**Endpoint:** GET http://localhost:3000/posts

**Status mudou para POSTED:**
```json
{
  "id": "uuid-do-seu-post",
  "title": "Meu Vídeo Incrível",
  "status": "POSTED",
  "postedAt": "2026-04-03T14:31:00Z",
  "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

**Verifique no seu canal YouTube** ✅

---

## PASSO 9: VERIFICAR RESUMO DO DIA

**Endpoint:** GET http://localhost:3000/posts/overview

**Headers:**
```
Authorization: Bearer SEU_ACCESS_TOKEN
```

**Vê estatísticas:**
```json
{
  "date": "2026-04-03",
  "totalsForDay": {
    "views": 0,
    "likes": 0,
    "comments": 0
  },
  "totalViewsAllVideos": 1200,
  "postedToday": [
    {
      "id": "uuid",
      "title": "Meu Vídeo Incrível",
      "platform": "YOUTUBE",
      "status": "POSTED",
      "videoUrl": "https://www.youtube.com/watch?v=...",
      "postedAt": "2026-04-03T14:31:00Z"
    }
  ]
}
```

---

## 🐛 TROUBLESHOOTING

### Problema: "Conta YouTube nao conectada"
**Solução:** Verificar se SocialAccount foi criado corretamente:
```sql
SELECT * FROM "SocialAccount" WHERE "userId" = 'seu_user_id';
```

### Problema: "Arquivo de vídeo nao encontrado"
**Solução:** Certifique-se que selecionou o arquivo no campo `video`

### Problema: "scheduledAt invalido"
**Solução:** Use format ISO8601: `2026-04-03T14:30:00Z`

### Problema: Post fica PENDING e não publica
**Solução:** 
1. Verifique logs do backend (console do `npm run start:dev`)
2. Confirme que `scheduledAt <= agora`
3. Verifique se accessToken do YouTube é válido

### Problema: "Extensão invalida"
**Solução:** Use apenas: .mp4, .mov, .webm ou .mkv

---

## 📋 CHECKLIST FINAL

- [ ] Usuário criado
- [ ] Login feito (pegou accessToken)
- [ ] Conta YouTube conectada (SocialAccount criado)
- [ ] Niche criado
- [ ] Vídeo feito upload (status PENDING)
- [ ] Aguardou scheduler (1 minuto)
- [ ] Post está POSTED
- [ ] Link do YouTube aparece no banco
- [ ] Vídeo aparece no canal do YouTube

---


**Dúvidas? Consulte o arquivo `Routes` para mais exemplos!**
