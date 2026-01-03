import { GraphQLDateTime } from "graphql-scalars";
import gqlError from "./errors.js";
import User from "./../models/userSchema.js";
import Challenge, { ChallengeDocument } from "./../models/challengeSchema.js";
import UserChallenge from "./../models/userChallengeSchema.js";
import type { Resolvers } from "./__generated__/types";

import { generateToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { GraphQLError } from "graphql";

const resolvers: Resolvers = {
    DateTime: GraphQLDateTime,
    Query: {
        user: async (_, { id }) => await User.findById(id),
        me: async (_, __, context) => {
            if (!context.user) {
                throw gqlError("Not authenticated", "UNAUTHENTICATED", 401);
            };
            try {
                const user = await User.findById(context.user._id || context.user.id)

                if (!user) throw gqlError("Not authenticated", "UNAUTHENTICATED", 401);

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
                throw gqlError("Failed to fetch user data", "INTERNAL_SERVER_ERROR", 500);
            }
            
        },
        challenge: async (_, { id } ) => await Challenge.findById(id),
        getChallenges: async (_, { isPredefined }, context ) => {
            const user = await User.findById(context.user.id).populate("challenges");
            if (!user) throw gqlError("Not authenticated", "UNAUTHENTICATED", 401);

            return UserChallenge.find({ author: user._id.toString(), isPredefined: false });
        },
        getUsers: async () => User.find()
    },

    Mutation: {
        createUser: async (_, { input }) => {
            const existingUser = await User.findOne({email: input!.email})
            if (existingUser) { throw gqlError("Email already in use. Sign in or recover your password.", "BAD_REQUEST", 400); }
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
            if (!user) throw gqlError("Invalid email or password", "UNAUTHENTICATED", 401);

            const isMatch = await user.comparePassword(password);
            
            if (!user.email || !isMatch) {
                throw gqlError("Invalid email or password", "UNAUTHENTICATED", 401);
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
            if (!user) throw gqlError("Not authenticated", "UNAUTHENTICATED", 401);

            try {
                const updatedUser = await User.findByIdAndUpdate(
                    user._id,
                   { $set: { onboarded: input.onboarded } },
                   { new: true, runValidators: true }
                );

                if (!updatedUser) {
                    throw gqlError(`User with id ${user._id} not found`, "NOT_FOUND", 404);
                }

                return {
                    id: updatedUser._id.toString(),
                    name: updatedUser.name,
                    email: updatedUser.email,
                    assignmentsToday: updatedUser.assignmentsToday,
                    onboarded: updatedUser.onboarded
                }
            } catch (error) {
                throw gqlError("Error updating onboarding value for user", "BAD_REQUEST", 400);
            }
        },
        refreshToken: async (_, { refreshToken }) => {
            try {
                const decoded = verifyRefreshToken(refreshToken);
                if (typeof decoded === "string" || !decoded.id) throw gqlError("Invalid refresh token", "BAD_REQUEST", 400);

                const user = await User.findById(decoded.id);
                if (!user) throw gqlError("User not found", "UNAUTHENTICATED", 401);

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
                if (error instanceof GraphQLError) throw error;
                throw gqlError("Error refreshing token", "BAD_REQUEST", 400);
            }
        },
        createChallenge: async (_, { input }, context) => {
            console.log(context.user)
            const user = await User.findById(context.user.id);
            if (!user) throw gqlError("Not authenticated", "UNAUTHENTICATED", 401);

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
                if (error instanceof GraphQLError) throw error;
                throw gqlError("Error creating new challenge", "BAD_REQUEST", 400);
            }
        },
        previewChallenge: async (_, __, context) => {
            const user = await User.findById(context.user.id).populate("challenges");
            if (!user) throw gqlError("Not authenticated", "UNAUTHENTICATED", 401);

            const challenges = await UserChallenge.find({ 
                user: user._id, 
                currentChallenge: false, 
                done: false,
                $or: [
                    { assignedAt: { $lt: user.challengeResetDate } },
                    { assignedAt: null }
                ]
            }).populate("challenge");
            
            if (challenges.length === 0) throw gqlError("No challenges available", "NOT_FOUND", 404);

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
            if (!user) throw gqlError("Not authenticated", "UNAUTHENTICATED", 401);

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
                throw gqlError(`You can only assign ${user.settings?.numberOfChallengesPerDay} challenge(s) per day.`, "FORBIDDEN", 403);
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

            if (!assignedChallenge) { throw gqlError(`Challenge with id ${id} not found`, "NOT_FOUND", 404); }

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
            if (!user) throw gqlError("Not authenticated", "UNAUTHENTICATED", 401);

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
                    throw gqlError(`Challenge with id ${id} not found`, "NOT_FOUND", 404);
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
                if (error instanceof GraphQLError) throw error;
                throw gqlError("Error marking challenge as done", "BAD_REQUEST", 400);
            }
        },
        updateChallenge: async (_, { id, input }, context) => {
            const user = await User.findById(context.user.id);
            if (!user) throw gqlError("Not authenticated", "UNAUTHENTICATED", 401);

            try {
                const updatedChallenge = await UserChallenge.findByIdAndUpdate(
                    id,
                    { title: input.title },
                    { new: true, runValidators: true }
                ).populate("challenge");
                const challenge = updatedChallenge?.challenge as ChallengeDocument;
                console.log(updatedChallenge)
                if (!updatedChallenge) {
                    throw gqlError(`Challenge with id ${id} not found`, "NOT_FOUND", 404);
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
                if (error instanceof GraphQLError) throw error;
                throw gqlError("Error updating challenge", "BAD_REQUEST", 400);
            }
        },
        deleteChallenge: async (_, { id }) => { await UserChallenge.findByIdAndDelete(id); return true },
        updateUserSettings: async (_, { input }, context) => {
            const user = await User.findById(context.user.id);
            if (!user) throw gqlError("Not authenticated", "UNAUTHENTICATED", 401);

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
                    throw gqlError(`User with id ${user._id} not found`, "NOT_FOUND", 404);
                }
                return {
                    numberOfChallengesPerDay: updateSettings.settings?.numberOfChallengesPerDay,
                    language: updateSettings.settings?.language,
                    theme: updateSettings.settings?.theme
                };
            } catch (error) {
                throw gqlError("Error updating user settings", "BAD_REQUEST", 400);
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