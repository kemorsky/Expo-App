# Dailenge

An app built in Expo with React Native and GraphQL. Its purpose is to allow people with ADD/ADHD and other neurodivergent disorders to complete daily challenges that are accustomed to struggles they may meet in their daily life. Dopamine regulation is important in completing most if not all tasks in our day-to-day life. ADHD affects the release of dopamine and makes completing any task a much more difficult. The app is designed to allow the user to draw a random challenge(or challenges) throughout the day and then stimulate their brain's dopamine release by completing it and marking it as completed in the app without overwhelming the user with visual output, or making them feel mocked, or perhaps even babied.

I built this project for learning purposes, but also to solve specific issues encountered by my fiancee, who struggled finding something that fit her needs. The app is not tested, nor meant to be used on platforms other than iOS as the primary client owns an iPhone. With that said the bare minimum threshhold of care has been put into making sure the app could be run on all platforms.

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
- Account creation and signing in
- Resetting password in the event of forgetting it (feature doesn't work on mobile due to incompatibility between implementation logic and Expo EAS)
- Short onboarding upon signing up with the ability to skip it entirely
- Daily challenge draw from a pool of pre-existing as well as custom challenges (upwards of 3 per day)
- Ability to decline a challenge if it doesn't meet the current mood or setting and picking a different one instead
- Creation of personal challenges
- Editing challenges
- Ability to make challenges repeatable
- Selection of language (English and Swedish)
- Selection of theme (Dark and Light)
- Selection of number of challenges per day (between 1 and 3)

## The Process
I started by composing a list of wants and wishes from my primary client - my fiancee. I then decided to build the foundation of backend first before I move on to the frontend. Once I had basic queries and mutations I created the Expo project and tested my backend there.

During development many things started to feel overwhelming and change, mostly due to my neglegience of features that were either necessary to complete my vision, or improve quality of life. As such I opened up an Obsidian board that allowed me to keep track of everything which helped me pick up the pace and control my code much better.

The board soon proved itself to be a great investment as it helped me track down all the remaining tasks that otherwise would have revealed themselves at the most of inconvenient times. An example of one being forgetting to set up theme coloring on elements in one of the less frequented pages which would be a confusing surprise had someone using light mode found a bright pink (placeholder) button.

Once I connected my frontend to all the backend I then moved on to finalizing the styling and UI/UX elements, as well as code cleanup wherever needed. Then I moved on to user testing, which brought its own share of feedback. I then proceeded to implement said feedback and repeated the process until the app felt solid and truly close to completion.

Once all features were in place and the app fulfilled its purpose without stags and blockers, I then proceeded to apply small adjustments to the UI and UX - mostly in the shape of quality of life changes such as making the border radius of a card match the border radius of the button it contained, as well as maintaining the same features across all buttons. With the app fully operational and functional it was then time to share this project with my network and then move on to the next thing. Now richer in experience, ideas, but most and foremost even greater hunger for learning and growth.

## What I learned
First and foremost just how many tiny steps go into a project that on a quick glance is relatively small and straight-forward. The app doesn't take much to explore in its entirely, perhaps only a couple minutes, but the list of features and functions needed to bring it to life feels endless, at least as of right now, while it is still in development as I am writing this. Let me use the **User** query as an example. What felt like a query that didn't need more than **username, password, email, challenges array, and settings array** has since then doubled in size with values that I didn't even think of at the start. One of these being the **assignmentsToday** value, which tracks how many challenges the user had completed during the day and resets at midnight. These additions placed inside the query over time helped me realize that nothing is truly finalized until the very last commit is pushed and merged.

GraphQL was both exciting and tricky to learn. The ability to grab only what I need from the query or mutation is certainly enticing, but the amount of setup required to get all the schemas, resolvers, and connections certainly makes it an earned feature.

React Native, although familiar at first glance, had soon proven itself to be different enough to take its own chunk of time. The existing components and elements made some tasks much easier, and others a tad harder - I found creating certain custom components tricky to get right. With that being said I grew rather comfortable with it after a while.

I also got to learn a lot about React Native and how apps are truly built and operated by the hardware. The biggest surprise by far was when I first managed to open my app on my phone and noticed that nearly half of my styled UI was broken on iOS. I had been aware of changes in styling between devices, but never to such degree. I nailed it into my head to never assume things will look the same on every screen and to always test on as many devices as possible.

Lastly I find it necessary to note that it has been, most and foremost, a humbling experience. It showed me flaws in my planning, ability to visualise UI on smaller screens, as well as taught me to never let things stay in their placeholder stage longer than necessary - I still find myself stumbling across styling written purely inside an object, rather than a style variable. Once something passes the test it should be instantly improved and corrected, especially as the scale of the project grows with each day. I will do better next time.

## Running The Project
1. Download the Expo Go App to your iOS device (Android should work too, but the app was never tested in its environment)
2. Open up the Camera
3. Scan this QR Code: (cobe TBD)
4. Use the App

## Video Showcase
- tbc
