## Getting Started

Run the development server (With Nodemon)

```bash
npm run dev
```
(open localhost port 8000)

To Start Database
```bash
docker compose up -d
```
View Table
```
npx prisma studio
```
Database Migration
```
npx prisma migrate dev
```

To Stop Database
```bash
docker compose down
```


