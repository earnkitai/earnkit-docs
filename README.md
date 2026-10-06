# docs.earnkit.com

Build: `pnpm install && pnpm build` (pnpm 9, Next 15 + Nextra 4; the build also runs pagefind into `public/_pagefind`, which is gitignored).
Local: `pnpm dev`, or `pnpm start -p 3210` after a build.
Deploy: Vercel deploys `main` to docs.earnkit.com; every other branch gets a preview.
