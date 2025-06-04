# Next.js Auth0 Authentication System

Bu proje, Next.js ve Auth0 kullanarak güvenli bir kimlik doğrulama sistemi içerir.

## Özellikler

- Auth0 ile OAuth entegrasyonu
- JWT tabanlı oturum yönetimi
- Rol bazlı yetkilendirme (admin, user)
- Docker desteği
- TypeScript ve TailwindCSS entegrasyonu

## Kurulum

1. Auth0 hesabı oluşturun ve gerekli bilgileri alın
2. `.env.example` dosyasını `.env` olarak kopyalayın ve değerleri güncelleyin
3. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## Docker ile Çalıştırma

```bash
docker-compose up --build
```

## Ortam Değişkenleri

- `AUTH0_SECRET`: Auth0 secret key
- `AUTH0_BASE_URL`: Uygulama URL'i
- `AUTH0_ISSUER_BASE_URL`: Auth0 domain
- `AUTH0_CLIENT_ID`: Auth0 client ID
- `AUTH0_CLIENT_SECRET`: Auth0 client secret
- `NEXTAUTH_URL`: NextAuth URL
- `NEXTAUTH_SECRET`: NextAuth secret
- `JWT_SECRET`: JWT secret

## Lisans

MIT

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
