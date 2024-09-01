# StackAI frontend Task

## 🛠️ Technical choices

- I use Next.JS API routes to abstract the backend logic and make the frontend code
cleaner.
- The project skeleton is divided into:
  - `app`: Next:JS folder por pages and API routes
  - `components`: Reusable components
  - `hooks`: Custom hooks
  - `lib`: Utility function for _shadcn_
  - `modules`: App logic. I divide it using [vertical slicing](https://juanoa.medium.com/folder-structure-in-a-react-hexagonal-architecture-f926437c0c1a)
I detect these main entities: _connections, knowledge bases and resources_. Inside each folder, we can find:
    - `domain`: contains types and domain logic
    - `infrastructure`: contains the API clients (App -> Next API, Next API -> Backend)

## 🔝 Future improvements

- Add tests.
- The application could have a better UX in the process of create new knowledge base.
- Add more bonus points features.

## 🚀 Getting Started

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
