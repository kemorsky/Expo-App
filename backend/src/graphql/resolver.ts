import { GraphQLDateTime } from "graphql-scalars";
import User from "./../models/userSchema.js";
import Challenge, { ChallengeDocument } from "./../models/challengeSchema.js";
import UserChallenge from "./../models/userChallengeSchema.js";
import type { Resolvers } from "./__generated__/types";

import { generateToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";

const resolvers: Resolvers = {
    DateTime: GraphQLDateTime,
    Query: {
        user: async (_, { id }) => await User.findById(id),
        me: async (_, __, context) => {
            if (!context.user) {
                throw new Error("context is not present");
            };
            try {
                const user = await User.findById(context.user._id || context.user.id)

                if (!user) throw new Error("Not authenticated");

                const now = new Date();
                const challengeDeadline = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59 ,0); // 23:59:59 of today in local timezone

                if (!user.challengeResetDate || user.challengeResetDate < challengeDeadline) { // If last reset is before today 00:00:00, run daily reset

                // Reset currentChallenge flags
                    await UserChallenge.updateMany(
                        { user: user._id, currentChallenge: true },
                        { $set: { currentChallenge: false } }
                    );

                    user.assignmentsToday = 0;

                    // Update the last reset timestamp to today's midnight
                    user.challengeResetDate = challengeDeadline;
                    await user.save();
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    settings: user.settings,
                    challengeResetDate: user.challengeResetDate,
                    assignmentsToday: user.assignmentsToday,
                    lastAssignmentDate: user.lastAssignmentDate,
                    onboarded: user.onboarded
                }

            } catch (error) {
                console.log(error)
                throw new Error (`Error getting user: ${error}`)
            }
            
        },
        challenge: async (_, { id } ) => await Challenge.findById(id),
        getChallenges: async (_, { isPredefined }, context ) => {
            const user = await User.findById(context.user.id).populate("challenges");
            if (!user) throw new Error("Not authenticated");

            return UserChallenge.find({ author: user._id.toString(), isPredefined: false });
        },
        getUsers: async () => User.find()
    },

    Mutation: {
        createUser: async (_, { input }) => {
            const existingUser = await User.findOne({email: input!.email})
            if (existingUser) { throw new Error ("Email already in use. Sign in or recover your password.") }
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
                password: user.password,
                assignmentsToday: user.assignmentsToday,
            }
        },
        login: async (_, { input }) => {
            const { email, password } = input;
            const user = await User.findOne({ email })
            if (!user) throw new Error(`Invalid email or password`);

            const isMatch = await user.comparePassword(password);
            
            if (!user.email || !isMatch) {
                throw new Error (`Invalid email or password`)
            };
            
            const accessToken = generateToken({ _id: user._id.toString() });
            const refreshToken = generateRefreshToken({ _id: user._id.toString() });

            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                assignmentsToday: user.assignmentsToday,
                challengeResetDate: user.challengeResetDate,
                token: accessToken,
                refreshToken: refreshToken,
            }
        },
        saveOnboarding: async (_, { input }, context) => {
            const user = await User.findById(context.user.id);
            if (!user) throw new Error("Not authenticated");

            try {
                const updatedUser = await User.findByIdAndUpdate(
                    user._id,
                   { $set: { onboarded: input.onboarded } },
                   { new: true, runValidators: true }
                );

                if (!updatedUser) {
                    throw new Error(`User with id ${user._id} not found`);
                }

                return {
                    id: updatedUser._id.toString(),
                    name: updatedUser.name,
                    email: updatedUser.email,
                    assignmentsToday: updatedUser.assignmentsToday,
                    onboarded: updatedUser.onboarded
                }
            } catch (error) {
                throw new Error (`Error updating onboarding value for user: ${error}`)
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
                    assignmentsToday: user.assignmentsToday,
                    challengeResetDate: user.challengeResetDate,
                    token: newAccessToken,
                    refreshToken: newRefreshToken
                } 
            } catch (error) {
                throw new Error (`Error refreshing token: ${error}`)
            }
        },
        createChallenge: async (_, { input }, context) => {
            console.log(context.user)
            const user = await User.findById(context.user.id);
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
                            email: user.email,
                            assignmentsToday: user.assignmentsToday,
                            challengeResetDate: user.challengeResetDate
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
        previewChallenge: async (_, __, context) => {
            const user = await User.findById(context.user.id).populate("challenges");
            if (!user) throw new Error("Not authenticated");

            const challenges = await UserChallenge.find({ 
                user: user._id, 
                currentChallenge: false, 
                done: false,
                $or: [
                    { assignedAt: { $lt: user.challengeResetDate } },
                    { assignedAt: null }
                ]
            }).populate("challenge");
            
            if (challenges.length === 0) throw new Error ("No challenges available");

            const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]

            const challenge = randomChallenge?.challenge as ChallengeDocument

            return {
                id: randomChallenge._id.toString(),
                challenge: {
                    id: challenge._id.toString(),
                    title: challenge.title,
                    isPredefined: challenge.isPredefined
                },
                currentChallenge: randomChallenge.currentChallenge,
                done: randomChallenge.done
            }
        },
        acceptChallenge: async (_, { id }, context) => {
            const user = await User.findById(context.user.id).populate("challenges");
            if (!user) throw new Error("Not authenticated");

            const updatedUser = await User.findOneAndUpdate(
                {
                    _id: user._id,
                    assignmentsToday: { $lt: user.settings?.numberOfChallengesPerDay },
                },
                {
                    $inc: { assignmentsToday: 1 },
                    $set: { lastAssignmentDate: new Date() }
                },
                { new: true }
             );

            if (!updatedUser) {
                throw new Error(`You can only assign ${user.settings?.numberOfChallengesPerDay} challenge(s) per day.`);
            }

            await UserChallenge.updateMany(
                { user: user._id, currentChallenge: true },
                { $set: { currentChallenge: false } }
            );

            const assignedChallenge = await UserChallenge.findByIdAndUpdate(
                id,
                { currentChallenge: true, assignedAt: new Date() },
                { new: true, runValidators: true }
            ).populate("challenge");

            if (!assignedChallenge) { throw new Error(`Challenge with id ${id} not found`) }

            const challenge = assignedChallenge?.challenge as ChallengeDocument

            return {
                id: assignedChallenge._id.toString(),
                user: {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        assignmentsToday: user.assignmentsToday,
                        challengeResetDate: user.challengeResetDate,
                        lastAssignmentDate: user.lastAssignmentDate
                    },
                challenge: {
                    id: challenge._id.toString(),
                    title: challenge.title,
                    isPredefined: challenge.isPredefined
                },
                currentChallenge: assignedChallenge.currentChallenge,
                done: assignedChallenge.done,
                assignedAt: assignedChallenge.assignedAt
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
                      completedAt: new Date(),
                      currentChallenge: input.currentChallenge,
                      assignedAt: null
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
                            email: user.email,
                            assignmentsToday: user.assignmentsToday,
                            challengeResetDate: user.challengeResetDate
                        },
                    challenge: {
                        id: challenge._id.toString(),
                        title: challenge.title,
                        isPredefined: challenge.isPredefined
                    },
                    notes: doneChallenge.notes,
                    currentChallenge: doneChallenge.currentChallenge,
                    done: doneChallenge.done,
                    assignedAt: doneChallenge.assignedAt,
                    createdAt: doneChallenge.createdAt,
                    updatedAt: doneChallenge.updatedAt,
                    completedAt: doneChallenge.completedAt
                }
            } catch (error) {
                throw new Error (`Error marking challenge as done: ${error}`)
            }
        },
        updateChallenge: async (_, { id, input }, context) => {
            const user = await User.findById(context.user.id);
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
                            email: user.email,
                            assignmentsToday: user.assignmentsToday,
                            challengeResetDate: user.challengeResetDate
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
            const user = await User.findById(context.user.id);
            if (!user) throw new Error("Not authenticated");

            try {
                const updateSettings = await User.findByIdAndUpdate(
                    user._id, 
                    { $set: Object.fromEntries( // determines which fields to update based on the input rather than update/replace the entire settings object
                            Object.entries(input).map(([k, v]) => [`settings.${k}`, v])
                        )
                    },
                    { new: true, runValidators: true }
                );
                if (!updateSettings) {
                    throw new Error(`User with id ${user.id} not found`);
                }
                return {
                    numberOfChallengesPerDay: updateSettings.settings?.numberOfChallengesPerDay,
                    language: updateSettings.settings?.language,
                    theme: updateSettings.settings?.theme
                };
            } catch (error) {
                throw new Error (`Error updating user settings: ${error}`)
            }
        },
    },
    User: {
        challenges: async (parent) => {
            const userChallenges = await UserChallenge.find({ user: parent.id })
                .sort({ done: -1 }) // .sort handles sorting of the array items (done: true has priority)
                .populate("challenge");
            return userChallenges.map((ch) => {
                const challenge = ch.challenge as ChallengeDocument;
                    return {
                        id: ch._id.toString(),
                        user: {
                                id: parent.id,
                                name: parent.name,
                                email: parent.email,
                                assignmentsToday: parent.assignmentsToday,
                                challengeResetDate: parent.challengeResetDate
                            },
                        challenge: {
                            id: challenge._id.toString(),
                            title: challenge.title,
                            isPredefined: challenge.isPredefined
                        },
                        notes: ch.notes,
                        done: ch.done,
                        currentChallenge: ch.currentChallenge,
                        createdAt: ch.createdAt,
                        assignedAt: ch.assignedAt,
                        updatedAt: ch.updatedAt,
                        completedAt: ch.completedAt
                    }
            });
        },
    },
}

export default resolvers