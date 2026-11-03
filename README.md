# BookNook

BookNook is a small online library where users can browse books, add new books to the shelf, and borrow them for a few days. Built with a custom "Ink & Porcelain" editorial design.

## Live Website
**[(https://booknook-letsgomate.vercel.app)]**

## Features
- **Swiper.js Hero Slider**: A dynamic, animated hero section featuring 3 slides with a "Browse Books" call-to-action.
- **Secure Authentication**: Fully integrated BetterAuth with MongoDB Adapter, supporting Email/Password login and Google OAuth, secured by JWT.
- **Dynamic Book Grid**: A fully responsive editorial layout that loads the latest 6 books dynamically from MongoDB, sorted by the newest.
- **Complete CRUD Operations**: Users can Add new books (with secure ImgBB image uploading), Edit their own books, and Delete them using a custom confirmation modal.
- **Borrowing System**: A fully functional borrow system that checks availability, prevents double-borrowing, and uses MongoDB `$inc` to safely decrement and increment the "Total Copies" when books are borrowed and returned.
- **Custom UI/UX**: Built with Tailwind CSS and Shadcn UI, featuring custom Toast notifications, route protection, and a fully responsive Navbar with a user profile dropdown.

## Tech Stack
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Shadcn UI, Swiper.js
- **Backend**: Node.js, Express JS
- **Database**: MongoDB (Atlas)
- **Authentication**: BetterAuth (JWT + Google OAuth)