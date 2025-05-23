import { prisma as db } from '$lib/server/db';
import { hashPassword } from '$lib/utils/password.util';
import type { User } from '@prisma/client';

export class UserService {
	/**
	 * Fetches a user by their unique ID.
	 * @param userId - The user's unique identifier.
	 * @returns The user object or null if not found.
	 */
	async getUserById(userId: string): Promise<User | null> {
		return db.user.findUnique({ where: { id: userId } });
	}

	/**
	 * Fetches a user by their email address.
	 * @param email - The user's email.
	 * @returns The user object or null if not found.
	 */
	async getUserByEmail(email: string): Promise<User | null> {
		return db.user.findUnique({ where: { email } });
	}

	/**
	 * Fetches the first user with the given username.
	 * @param username - The user's username.
	 * @returns The user object or null if not found.
	 */
	async getUserByUsername(username: string): Promise<User | null> {
		return db.user.findFirst({ where: { username } });
	}

	/**
	 * Creates a new user with the provided data.
	 * @param data - The user's email, username, and password.
	 * @returns The created user object.
	 */
	async createUser(data: { email: string; username: string; password: string }): Promise<User> {
		// Hash the password before storing it
		const passwordHash = await hashPassword(data.password);
		return db.user.create({
			data: {
				email: data.email,
				username: data.username,
				password: passwordHash
			}
		});
	}

	/**
	 * Updates an existing user with the given data.
	 * @param userId - The user's unique identifier.
	 * @param data - Partial user data to update.
	 * @returns The updated user object.
	 */
	async updateUser(userId: string, data: Partial<User>): Promise<User> {
		return db.user.update({ where: { id: userId }, data });
	}
}
