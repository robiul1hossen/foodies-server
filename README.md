# Foodies Server

Foodies Server is a backend server built with **Node.js**, **Express**, **MongoDB**, and **Firebase Admin** for managing food reviews. This server provides APIs to post, get, update, delete, and search food reviews, along with features for favorites, top-rated reviews, related reviews, and more.

## Base URL
https://foodies-server-beryl.vercel.app


---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/all-reviews` | Add a new review |
| GET    | `/all-reviews` | Get all reviews |
| GET    | `/review-derails/:id` | Get a review by its ID |
| GET    | `/search-reviews` | Search reviews by query |
| GET    | `/top-rated-reviews` | Get top-rated reviews |
| GET    | `/my-review` | Get all reviews by logged-in user |
| GET    | `/my-review/:id` | Get a specific review by ID for the user |
| PATCH  | `/my-review/:id` | Update a review by ID for the user |
| GET    | `/related-category` | Get reviews from a related category |
| GET    | `/latest-review` | Get the latest reviews |
| POST   | `/favorite` | Add a review to favorites |
| GET    | `/favorite/:email` | Get all favorite reviews by user email |
| DELETE | `/favorite/:id` | Delete a favorite review by ID |

---

## Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/<your-username>/foodies-server.git
cd foodies-server
npm install

PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
FIREBASE_SERVICE_ACCOUNT=<your-firebase-service-account-json>

npm start 
```
## Dependencies
express
 – Web framework

mongodb
 – MongoDB driver

cors
 – Cross-Origin Resource Sharing

dotenv
 – Environment variables

firebase-admin
 – Firebase Admin SDK

Author

Mohammad Robiul Hossen
Email: robiul99hossen@gmail.com
