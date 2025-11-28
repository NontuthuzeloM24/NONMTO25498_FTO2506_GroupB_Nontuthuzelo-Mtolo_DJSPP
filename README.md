## 🎧 DJS Podcast App – Portfolio Project (React)
📋 Overview

This is a React podcast app built as part of my DJS portfolio. The app lets users discover, browse, and listen to podcasts with a clean and responsive interface. It supports searching, filtering by genre, favouriting episodes, and smooth navigation between shows and episodes.

The app also features a global audio player that stays fixed at the bottom, enabling continuous playback across pages. On mobile, the layout adapts to ensure usability with stacked filters, vertical season lists, and clear navigation.

## 🔥 Features Implemented
🎧 Discover & Browse Podcasts

Displayed podcasts in a grid layout, with cards showing image, title, and genres.

Added search, sort, and filter functionality to help users find shows quickly.

Recommended shows carousel added to the landing page, scrollable horizontally, highlighting featured podcasts.

## 📑 Show Details

Clicking a podcast opens a detail page.

Shows the cover image on top, description below, and seasons stacked vertically.

Episodes include title, thumbnail, and actions, such as play and favourite.

## 🔊 Global Audio Player

Persistent playback across pages.

Supports play, pause, seek, and progress tracking.

Stays fixed at the bottom of the viewport, even on mobile.

Layout adapts on small screens for easy usability.

## ❤️ Favourites

Users can favourite episodes, stored in localStorage.

Favourites are displayed on a dedicated page.

Shows associated show, season, and date added.

Sorting options available: A–Z / Z–A and newest/oldest.

## 🌗 Light & Dark Theme

Toggle between light and dark modes.

Theme selection persists across sessions via localStorage.

Smooth transition and consistent styling throughout the app.

## 📱 Mobile Optimisations

Filters stack vertically, with equal widths for search and select controls.

Header includes Home 🏠, Favourites ❤️, main title, and theme toggle.

Podcast cards, carousel, and audio player adapt to smaller screens.

Seasons and episodes on the show detail page are stacked vertically for easy scrolling.

## ✅ Deployment & Meta

App [deployed(https://nonmto-25498-fto-2506-group-b-nontu.vercel.app/)] on Vercel with SPA routing support.

Added meta tags for SEO and social sharing previews.

Includes custom favicon for brand consistency.

## 🛠️ Technical Details

Built with React using functional components and hooks.

State management uses useState and useEffect.

LocalStorage for persisting favourites and theme preference.

Fully responsive CSS designed for desktop, tablet, and mobile screens.

Audio player implemented with native HTML5 audio and React controls.

## 🎯 What This Project Shows

Ability to build a full-featured, responsive React application.

Integration of persistent state and localStorage for user preferences.

Mobile-first design and user-friendly UI/UX.

Knowledge of deployment, routing, and SEO-friendly metadata.

## 🚀 Next Steps / Stretch Goals

Track listening progress and resume episodes where left off.

Add social sharing features for shows or episodes.

Include progress indicators on episode lists.
