<!-- @format -->

# Pokemon gallery - Take-home assignment

In this take-home assignment, you'll build a **Pokemon gallery using React.js**.

## 💻 Application requirements

### 🎯 Goal

In simple terms, you are required to build a gallery of Pokemon. There will be **2 views**:

- View 1: Home on `/`
  - Shows a list of Pokemon
  - Only show 6 Pokemon at a time
  - Show pagination, which includes previous and next buttons
  - When a Pokemon is clicked, user navigates to Pokemon details page
- View 2: Pokemon details on `/pokemon/:pokemonId`
  - Shows a single Pokemon profile
    - Stats
    - Moves
    - Abilities
    - Name
    - Types
    - Photo

👉 Make use of the attached [UI Design - Pokemon Gallery PDF file](https://mega.nz/file/eD5BQAYR#SoSN3NKLRBoxjIS3HqRLD8T4LcEMBoUlBqSO8AdqMfQ).

### 🛠 Project setup

The application should be build using **React.js (v18+)** and an **external API**.

1. You should scaffold a new React project using [Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
2. You should use a UI kit (like [Material UI](https://mui.com/) or [Ant Design](https://ant.design/)) for your components
3. You should fetch data from the following external API: [PokeAPI](https://pokeapi.co/)
4. You should use a **routing solution** like [React Router v6+](https://reactrouter.com/en/main)

### 📖 User stories

- As a user I can see a list of Pokemon
- As a user I can search for an individual Pokemon based on its name
- As a user I can go to an individual Pokemon's page by clicking on its card or searching for it directly

### 🔧 Key features

- Fetch data from PokeAPI
- Search for a pokemon
- Pagination (when there are more than 6 pokemon on the screen)

### ⭐️ Tips

- Before making your custom components, check the UI kit if there are pre-made components you can reuse
- If you're reusing state logic, consider making a custom hook

### ❗️ Edge cases

Make sure your application is able to handle the following edge cases:

- What if the API doesn't work?
- What if a user's query results in 0 search results?
- What if a user submits an empty search query?
- What if a user goes to a non-existent page?

### ✅ Evaluation criteria

You will have successfully passed the assignment if your project:

- [ ] Demonstrates a correct usage of React (i.e. hooks, Context API)
- [ ] Correctly utilizes a UI kit
- [ ] Has all features working without fault
- [ ] It's responsive
- [ ] Code is cleanly written

## 📋 Deliverables

You are required to deliver the following:

- [ ] Code hosted on GitHub
- [ ] README, including project setup instructions
- [ ] Deployed application + demo link
