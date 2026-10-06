# docs.earnkit.com

Build: `pnpm install && pnpm build` (Next 15 + Nextra 4; `postbuild` regenerates `public/_pagefind`, which is committed).
Local: `pnpm dev`, or `pnpm start -p 3210` after a build.
Deploy: Vercel deploys `main` to docs.earnkit.com; every other branch gets a preview.
