# Daily Challenge App (Name TBD)

A React Native app built in Expo with React Native and GraphQL. I built this project for learning purposes, but also to solve specific issues encountered by my fiancee, who struggled finding something that fit her needs. The app is not tested, nor meant to be used on platforms other than iOS or by the public. With that said, the bare minimum threshhold of care has been put into making sure the app could be run by all platforms.

**For how to run the project and a video showcase please scroll down to the bottom of this page. Thanks!**

## Technologies
- Expo
- React Native
- TypeScript
- CSS
- Apollo
- GraphQL
- Codegen

## Features
- Daily challenge draw from a pool of pre-existing as well as custom challenges (upwards of 3 per day)
- Ability to decline a challenge if it doesn't meet the current mood or setting and picking another one
- Creation of personal challenges
- Selection of language (English and Swedish)
- Selection of theme (Dark and Light)
- Selection of number of challenges per day (between 1 and 3)

## The Process
I started by composing a list of wants and wishes from my primary client - my fiancee. I then decided to build the foundation of backend first before I move on to the frontend. Once I had basic queries and mutations I created the Expo project and tested my backend there.

During development many things started to feel overwhelming and change, mostly due to my neglegience of features that were either necessary to complete my vision, or improve quality of life. As such I opened up an Obsidian board that allowed me to keep track of everything which helped me pick up the pace and control my code much better.

tbc

## What I learned
First and foremost just how many tiny steps go into a project that on a quick glance is relatively small and straight-forward. The app doesn't take much to explore in its entirely, perhaps only a couple minutes, but the list to bring it to life feels endless, at least as of right now, while it is still in development as I am writing this. Let me use the **User** query as an example. What felt like a query that didn't need more than **username, password, email, challenges array, and settings array** has since then doubled in size with values that I didn't even think of at the start. One of these being the **assignmentsToday** value, which tracks how many challenges the user had completed during the day and resets at midnight. These additions placed inside the query over time helped me realize that nothing is truly finalized until the very last commit is pushed and merged.

I also got to learn a lot about React Native and how apps are truly built and operated by the hardware. The biggest surprise by far was when I first managed to open my app on my phone and noticed that nearly half of my styled UI was broken on iOS. I had been aware of changes in styling between devices, but never to such degree. I nailed it into my head to never assume things will look the same on every screen and to always test on as many devices as possible

## Running The Project
1. Download Expo Go App
2. Open up the Camera
3. Scan this QR Code: (cobe TBD)
4. Use the App

## Video Showcase
- tbc
