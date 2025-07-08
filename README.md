# Modak Technical Challenge

Please complete the challenge within the next 4 days and feel free to reach out if you have any questions or need clarification on any aspects. We look forward to reviewing your submission and discussing it further during our upcoming interview.


-----------------------------------------------------------------------------------

steps to install

- yarn install
- npx expo prebuild --platform android
- yarn android

-----------------------------------------------------------------------------------
Products App

We want to build a mobile application that allows a user to navigate a catalog of products by integrating with a mock API.

API to use: DummyJSON - Products API

The user should be able to:

    View a list of products on the main screen, including the product title, price, and thumbnail.
    Filter products by category (e.g., electronics, clothing, groceries.
    Sort the products by price or rating.
    Click on a product to view detailed information, such as product description, brand, and stock availability.

Requirements:
UI Expectations:

A polished and visually elaborate UI is not required. The app should be responsive, tidy, and easy to navigate. Focus on creating a functional, user-friendly interface that provides a smooth experience rather than on advanced styling or animations.
Mandatory:

    Fetch the categories list from the API endpoint https://dummyjson.com/products/categories to populate the filter options in the product list screen.
    The app does not require user authentication. The application should open directly to the home screen, displaying the list of products.
    Use React Native CLI and TypeScript (Expo (CNG) and Prebuild are allowed).
    Implement data fetching and mapping from the selected API.
    Decouple the UI from API calls by using mappers and clean architecture patterns.
    Use error handling and loading states during API calls.

Bonus Points:

    Implement a deep link that opens the app to a specific category or product by its ID.
    Create a Native Module (using the Bridge or Fabric) to add a product purchase reminder into the user's calendar. You can choose to implement this for either iOS or Android, based on your preference. It is not required to implement the native integration for both platforms.
    Additional bonus if you implement some kind of push notifications.

Evaluation Criteria:

Your solution will be evaluated on:

    Code quality: Is the code well-structured, maintainable, and following best practices?
    Clarity: Are the code and logic easy to understand?
    Use of patterns: Are mappers and patterns used to decouple UI from data fetching?
    Error handling: Are potential errors accounted for, and is the app user-friendly during errors?
    Creativity: Have you added any cool features or optimizations to enhance the app?

Deliverables:

    Share a link to the GitHub Public repository containing your application source code.
    Ensure the project includes a README with setup instructions.
    Be prepared to run your app and explain your code during the technical interview.

Feel free to ping us with any questions you have about this technical assessment.

Good luck! We look forward to seeing your solution!



