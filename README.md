# AuraAI Frontend

Clean minimalist frontend (white / black) with **dummy data only**.

## Workspaces

| Role | Path | Demo entry |
|------|------|------------|
| Landing | `/` | — |
| Login | `/login` | Pick Super Admin or Affiliate |
| Super Admin | `/admin` | Overview, Affiliators, Analytics, Settings |
| Affiliate / Referral | `/affiliate` | Overview, Link, Products, Leads, Analytics, Profile |

## Run

```bash
cd auraai-frontend
npm install
npm run dev
```

Open http://localhost:3001

## Notes

- No Express/API integration yet — all dashboards use `src/constants/dummy.ts`
- Auth is localStorage-only demo login
