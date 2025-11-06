import Challenge from "./../models/challengeSchema.js";
import User from "./../models/userSchema.js";
import type { Resolvers } from "./__generated__/types";

import { generateToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";

const resolvers: Resolvers = {
    Query: {
        user: async (_, { id }) => await User.findById(id),
        me: async (_, __, context) => {
            if (!context.user) {
                throw new Error("context is not present");
            };
            try {
                const user = await User.findById(context.user._id || context.user.id)
                .populate("challenges")
                .populate("settings");

                if (!user) throw new Error("Not authenticated");
                console.log(user);

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    settings: user.settings
                }
            } catch (error) {
                console.log(error)
                throw new Error (`Error getting user: ${error}`)
            }
            
        },
        challenge: async (_, { id } ) => await Challenge.findById(id),
        getChallenges: async (_, { isPredefined }, context ) => {
            const user = await User.findById(context.user.id || context.user._id).populate("challenges");
            if (!user) throw new Error("Not authenticated");
            console.log(context.user.challenges);

            return Challenge.find({ author: user._id.toString(), isPredefined: false });
        },
        getUsers: async () => User.find()
    },

    Mutation: {
        createUser: async (_, { input }) => {
            const existingUser = await User.findOne({email: input!.email})
            if (existingUser) { throw new Error ("User already exists. Log in or recover your password.") }
            const user = new User(input)
            await user.save();

            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
            }
        },
        login: async (_, { input }) => {
            const { email, password } = input;
            const user = await User.findOne({ email })
            if (!user) throw new Error(`User not found`);

            const isMatch = await user.comparePassword(password);
            
            if (!user.email) {
                throw new Error (`Invalid email`)
            } else if (!isMatch) {
                throw new Error (`Invalid password`)
            }

            const accessToken = generateToken({ _id: user._id.toString() });
            const refreshToken = generateRefreshToken({ _id: user._id.toString() });

            console.log(accessToken);
            console.log(refreshToken);

            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                token: accessToken,
                refreshToken: refreshToken
            }
        },
        refreshToken: async (_, { refreshToken }) => {
            try {
                const decoded = verifyRefreshToken(refreshToken);
                if (typeof decoded === "string" || !decoded.id) throw new Error("Invalid refresh token");

                const user = await User.findById(decoded.id);
                if (!user) throw new Error ("User not found");

                const newAccessToken = generateToken({ _id: user._id.toString() });
                const newRefreshToken = generateRefreshToken({ _id: user._id.toString() });

                await User.findByIdAndUpdate(user.id, { refreshToken: newRefreshToken})

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    token: newAccessToken,
                    refreshToken: newRefreshToken
                } 
            } catch (error) {
                throw new Error (`Error refreshing token: ${error}`)
            }
        },
        createChallenge: async (_, { input }, context) => {
            console.log(context.user)
            const user = await User.findById(context.user.id || context.user._id);
            if (!user) throw new Error("Not authenticated");

            try {
                const challenge = new Challenge({
                    title: input.title,
                    author: user._id.toString(),
                    done: false,
                    isPredefined: false
                })
                await challenge.save()
                console.log(challenge)
                return {
                    id: challenge._id.toString(),
                    title: challenge.title,
                    author: { 
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email
                    },
                    currentChallenge: challenge.currentChallenge,
                    done: challenge.done,
                    isPredefined: challenge.isPredefined
                }
            } catch (error) {
                throw new Error (`Error creating new challenge: ${error}`)
            }
        },
        assignRandomChallenge: async (_, __, context) => {
            const user = await User.findById(context.user.id || context.user._id).populate("challenges");
            if (!user) throw new Error("Not authenticated");

            const challenges = await Challenge.find({ currentChallenge: false, done: false })
            if (challenges.length === 0) throw new Error ("No challenges available");

            const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
            
            await Challenge.updateMany(
                { author: user._id },
                { $set: { currentChallenge: false } }
            )

            const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

            const updatedChallenge = await Challenge.findByIdAndUpdate(
                randomChallenge._id,
                { currentChallenge: true,
                  currentChallengeExpiresAt: expirationDate
                },
                { new: true, runValidators: true }
            )

            if (!updatedChallenge) {
                    throw new Error(`Challenge with id ${randomChallenge._id} not found`);
                }

            return {
                id: updatedChallenge._id.toString(),
                author: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email
                },
                title: updatedChallenge.title,
                currentChallenge: updatedChallenge.currentChallenge,
                currentChallengeExpiresAt: updatedChallenge.currentChallengeExpiresAt,
                done: updatedChallenge.done,
                isPredefined: updatedChallenge.isPredefined
            }
        },
        markChallengeAsCurrent: async (_, { id, input }, context) => {
            const user = await User.findById(context.user.id || context.user._id);
            if (!user) throw new Error("Not authenticated");
            const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

            try {
                const currentChallenge = await Challenge.findByIdAndUpdate(
                    id,
                    { currentChallenge: input.currentChallenge,
                      currentChallengeExpiresAt: expirationDate
                    },
                    { new: true, runValidators: true }
                );
                console.log(currentChallenge)
                if (!currentChallenge) {
                    throw new Error(`Challenge with id ${id} not found`);
                }
                return {
                    id: currentChallenge.id,
                    title: currentChallenge.title,
                    author: {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email
                    },
                    currentChallenge: currentChallenge.currentChallenge,
                    done: currentChallenge.done,
                    isPredefined: currentChallenge.isPredefined,
                    createdAt: currentChallenge.createdAt,
                    updatedAt: currentChallenge.updatedAt
                }
            } catch (error) {
                throw new Error (`Error marking challenge as current: ${error}`)
            }
            
        },
        markChallengeAsDone: async (_, { id, input }, context) => {
            const user = await User.findById(context.user.id || context.user_id)
            if (!user) throw new Error("Not authenticated");

            try {
                const doneChallenge = await Challenge.findByIdAndUpdate(
                    id,
                    { done: input.done },
                    { new: true, runValidators: true }
                );
                console.log(doneChallenge)
                if (!doneChallenge) {
                    throw new Error(`Challenge with id ${id} not found`);
                }
                return {
                    id: doneChallenge.id,
                    title: doneChallenge.title,
                    author: {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email
                    },
                    currentChallenge: doneChallenge.currentChallenge,
                    done: doneChallenge.done,
                    isPredefined: doneChallenge.isPredefined,
                    createdAt: doneChallenge.createdAt,
                    updatedAt: doneChallenge.updatedAt
                }
            } catch (error) {
                throw new Error (`Error marking challenge as done: ${error}`)
            }
        },
        updateChallenge: async (_, { id, input }, context) => {
            const user = await User.findById(context.user.id || context.user._id);
            if (!user) throw new Error("Not authenticated");

            try {
                const updatedChallenge = await Challenge.findByIdAndUpdate(
                    id,
                    { title: input.title },
                    { new: true, runValidators: true }
                );
                console.log(updatedChallenge)
                if (!updatedChallenge) {
                    throw new Error(`Challenge with id ${id} not found`);
                }
                return {
                    id: updatedChallenge.id,
                    title: updatedChallenge.title,
                    author: {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email
                    },
                    currentChallenge: updatedChallenge.currentChallenge,
                    done: updatedChallenge.done,
                    isPredefined: updatedChallenge.isPredefined,
                }
            } catch (error) {
                throw new Error (`Error updating challenge: ${error}`)
            }
        },
        deleteChallenge: async (_, { id }) => { await Challenge.findByIdAndDelete(id); return true },
        updateUserSettings: async (_, { input }, context) => {
            const user = await User.findById(context.user.id || context.user._id);
            if (!user) throw new Error("Not authenticated");

            try {
                const updateSettings = await User.findByIdAndUpdate(
                    user.id, 
                    { settings: input },
                    { new: true, runValidators: true }
                );
                console.log(updateSettings)
                if (!updateSettings) {
                    throw new Error(`User with id ${user.id} not found`);
                }
                return {
                    numberOfChallengesPerDay: updateSettings.settings?.numberOfChallengesPerDay,
                    language: updateSettings.settings?.language,
                    theme: updateSettings.settings?.theme
                }
            } catch (error) {
                throw new Error (`Error updating user settings: ${error}`)
            }
        }
    },
    User: {
        challenges: async (parent) => {
            return Challenge.find({ author: parent.id });
        }
    },
    // User: {
    //     challenges: async (parent) => {
    //         const challenges = await Challenge.find({ author: parent.id });
    //         return challenges.map(ch => ({
    //             id: ch._id.toString(),
    //             title: ch.title,
    //             author: {
    //                 id: parent.id,
    //                 name: parent.name,
    //                 email: parent.email
    //             },
    //             isPredefined: ch.isPredefined
    //         }));
    //     },
    // },
    Challenge: {
        author: async (parent) => {
            const user = await User.findById(parent.author);
            if (!user) throw new Error("User not found  - challenges");

            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email
            }
        }
    }
}

export default resolvers