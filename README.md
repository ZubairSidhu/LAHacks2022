# 🏋️‍♀️ 🏌️‍♂️ FitLinks
FitLinks is a social fitness app for professionals looking to find new personal connections at any company and in any field by working out with them!

From talking with friends who have graduated college and gone on to start full-time positions, we have learned that it is very difficult as a working professional to:
- Maintain a healthy lifestyle with a 9-to-5 job, with some people working even longer daily schedules.
- Find genuine and meaningful connections within the workplace, especially after moving locations or companies.

FitLinks aims to address the intersection of these two issues by giving people an opportunity to get to know each other outside of the workplace by staying healthy together.

## 🔗 What it does
Currently on FitLinks, users are able to sign up and authenticate themselves for accounts, which will allow us to match them with their People Data Labs data to get their work information for matching. Our main offering is a Tinder-style system where users can search for matches with preferences including age, preferred activity level, company, and professional title. Based on their preferences, our backend will match them with other users using fuzzy searching on data from the People Data Labs API. Although matches aren't guarantees for personal compatibility, they are made with the user's preferences in mind so that the likelihood of making a new connection is higher than it would be with random matching.

Once a user mutually matches with someone, they will receive that person's contact details and be able to schedule a workout to get to know them better while staying fit at the same time! Users can match with multiple people to continue to expand their personal connections if they would prefer to have a lot of friends as opposed to a select few. They will also be able to see their past workouts with details such as location, time, and people worked out with during a given workout.

## ⚙️ Tech Stack
Our frontend is written in **React** with certain components coming from **Chakra UI**! To implement blockchain transactions related to FitLinks' premium subscription, we also utilized **Solidity smart contracts** on the **Avalanche Fuji** Testnet to handle transactions in a decentralized fashion.

Our backend leverages a **MongoDB** instance with an **Express.js** wrapper to fetch, store, and return data. We also incorporated **FuseJS** to help us make better queries for data to the **People Data Labs API**, where we supplemented user-provided personal information with job and company information from the PDL Enrich API to inform our algorithm for finding potential workout matches for users on the FitLinks platform.

## 🚦 Challenges and Learnings
We ran into a lot of bugs involving FuseJS as it was the first time we had used the framework to do fuzzy searching within a large data set. Additionally, implementing our Solidity smart contract took a long time to resolve, especially during deployment and interaction when we were testing our subscription functionality.

With this being said, we're happy that we overcame these challenges to deliver a complex and meaningful project using unfamiliar technology like FuseJS and the People Data Labs API to provide better matches for users and their preferences. We are also proud of how quickly we were able to make our own designs in Figma and turn them from ideas into actual prototypes with tangible functionality on our frontend.

## 📤 What's next
We're committed to maintaining a safe environment for FitLinks users and we understand that there is potential for every encounter to go wrong for anyone - with more time, a next priority for FitLinks development would have been to equip users with safety tools such as blocking a user as well as their immediate network to prevent future encounters, and options to get help in situations requiring assistance from paramedics or other emergency responders.

In future iterations, we'd also like to continue to build out our blockchain offerings with Avalanche to create a more cohesive experience for users who choose to maintain a FitLinks subscription. This would include things such as an active users program with prize rewards, leaderboards for friends with at least one subscribed user in their group, or better stat tracking for subscribed users' workouts such as distance traveled, users worked out with, or calories burned per workout.