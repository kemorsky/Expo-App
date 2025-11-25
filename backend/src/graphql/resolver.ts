import User from "./../models/userSchema.js";
import Challenge, { ChallengeDocument } from "./../models/challengeSchema.js";
import UserChallenge from "./../models/userChallengeSchema.js";
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

                const result = await UserChallenge.updateMany({
                    user: user._id,
                    currentChallenge: true,
                    currentChallengeExpiresAt: { $lte: new Date() }
                },
                {
                    $set: {
                        currentChallenge: false,
                        currentChallengeExpiresAt: null
                    }
                });
                
                console.log(result)

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

            return UserChallenge.find({ author: user._id.toString(), isPredefined: false });
        },
        getUsers: async () => User.find()
    },

    Mutation: {
        createUser: async (_, { input }) => {
            const existingUser = await User.findOne({email: input!.email})
            if (existingUser) { throw new Error ("User already exists. Sign in or recover your password.") }
            const user = new User(input)
            await user.save();

            const predefined = await Challenge.find({ isPredefined: true });

            const userChallenges = predefined.map((ch) => ({
                user: user._id,
                challenge: ch._id,
                done: false,
                currentChallenge: false
            }))

            await UserChallenge.insertMany(userChallenges);

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

                await User.findByIdAndUpdate(user.id, { refreshToken: newRefreshToken })

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
                    isPredefined: false
                })
                await challenge.save()

                const userChallenge = new UserChallenge({
                    user: user._id.toString(),
                    challenge: challenge._id,
                    done: false
                });

                await userChallenge.save();

                console.log(challenge)
                return {
                    id: userChallenge._id.toString(),
                    user: {
                            id: user._id.toString(),
                            name: user.name,
                            email: user.email
                        },
                    challenge: {
                        id: challenge._id.toString(),
                        title: challenge.title,
                        isPredefined: challenge.isPredefined
                    },
                    currentChallenge: userChallenge.currentChallenge,
                    done: userChallenge.done,
                    createdAt: userChallenge.createdAt
                }
            } catch (error) {
                throw new Error (`Error creating new challenge: ${error}`)
            }
        },
        assignRandomChallenge: async (_, __, context) => {
            const user = await User.findById(context.user.id || context.user._id).populate("challenges");
            if (!user) throw new Error("Not authenticated");

            const challenges = await UserChallenge.find({ 
                user: user._id, 
                currentChallenge: false, 
                done: false 
            });
            
            if (challenges.length === 0) throw new Error ("No challenges available");

            const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
            
            await UserChallenge.updateMany(
                { user: user._id },
                { $set: { currentChallenge: false } }
            )

            const expirationDate = new Date(Date.now() + 24 + 60 * 60 * 1000);

            const assignedChallenge = await UserChallenge.findByIdAndUpdate(
                randomChallenge._id,
                { currentChallenge: true,
                  currentChallengeExpiresAt: expirationDate
                },
                { new: true, runValidators: true }
            ).populate("challenge");

            if (!assignedChallenge) { throw new Error(`Challenge with id ${randomChallenge._id} not found`) }
            const challenge = assignedChallenge?.challenge as ChallengeDocument

            return {
                id: assignedChallenge._id.toString(),
                user: {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email
                    },
                challenge: {
                    id: challenge._id.toString(),
                    title: challenge.title,
                    isPredefined: challenge.isPredefined
                },
                currentChallenge: assignedChallenge.currentChallenge,
                currentChallengeExpiresAt: assignedChallenge.currentChallengeExpiresAt,
                done: assignedChallenge.done,
            }
        },
        markChallengeAsDone: async (_, { id, input }, context) => {
            const user = await User.findById(context.user.id || context.user_id)
            if (!user) throw new Error("Not authenticated");

            try {
                const doneChallenge = await UserChallenge.findByIdAndUpdate(
                    id,
                    { notes: input.notes,
                      done: input.done,
                      currentChallenge: input.currentChallenge
                    },
                    { new: true, runValidators: true }
                ).populate("challenge");
                
                console.log(doneChallenge)
                if (!doneChallenge) {
                    throw new Error(`Challenge with id ${id} not found`);
                }
                const challenge = doneChallenge.challenge as ChallengeDocument
                return {
                    id: doneChallenge._id.toString(),
                    user: {
                            id: user._id.toString(),
                            name: user.name,
                            email: user.email
                        },
                    challenge: {
                        id: challenge._id.toString(),
                        title: challenge.title,
                        isPredefined: challenge.isPredefined
                    },
                    notes: doneChallenge.notes,
                    currentChallenge: doneChallenge.currentChallenge,
                    done: doneChallenge.done,
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
                const updatedChallenge = await UserChallenge.findByIdAndUpdate(
                    id,
                    { title: input.title },
                    { new: true, runValidators: true }
                ).populate("challenge");
                const challenge = updatedChallenge?.challenge as ChallengeDocument;
                console.log(updatedChallenge)
                if (!updatedChallenge) {
                    throw new Error(`Challenge with id ${id} not found`);
                }
                return {
                    id: updatedChallenge._id.toString(),
                    user: {
                            id: user._id.toString(),
                            name: user.name,
                            email: user.email
                        },
                    title: challenge.title,
                    challenge: {
                        id: challenge._id.toString(),
                        title: challenge.title,
                        isPredefined: challenge.isPredefined
                    },
                    currentChallenge: updatedChallenge.currentChallenge,
                    done: updatedChallenge.done,
                    createdAt: updatedChallenge.createdAt,
                    updatedAt: updatedChallenge.updatedAt
                }
            } catch (error) {
                throw new Error (`Error updating challenge: ${error}`)
            }
        },
        deleteChallenge: async (_, { id }) => { await UserChallenge.findByIdAndDelete(id); return true },
        updateUserSettings: async (_, { input }, context) => {
            const user = await User.findById(context.user.id || context.user._id);
            if (!user) throw new Error("Not authenticated");

            try {
                const updateSettings = await User.findByIdAndUpdate(
                    user._id, 
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
            const userChallenges = await UserChallenge.find({ user: parent.id }).populate("challenge");
            return userChallenges.map((ch) => {
                const challenge = ch.challenge as ChallengeDocument;
                    return {
                        id: ch._id.toString(),
                        user: {
                                id: parent.id,
                                name: parent.name,
                                email: parent.email
                            },
                        challenge: {
                            id: challenge._id.toString(),
                            title: challenge.title,
                            isPredefined: challenge.isPredefined
                        },
                        notes: ch.notes,
                        done: ch.done,
                        currentChallenge: ch.currentChallenge,
                        currentChallengeExpiresAt: ch.currentChallengeExpiresAt,
                        createdAt: ch.createdAt,
                        updatedAt: ch.updatedAt
                    }
            });
        },
    },
    // Challenge: {
    //     author: async (parent) => {
    //         const user = await User.findById(parent.author);
    //         if (!user) throw new Error("User not found - challenges");

    //         return {
    //             id: user._id.toString(),
    //             name: user.name,
    //             email: user.email
    //         }
    //     }
    // },
}

export default resolvers