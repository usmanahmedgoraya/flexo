import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import mongoose, { Model } from 'mongoose';
import { loginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/register-dto';
import { updateUserDto } from './dto/updateUser.dto';
import { Role, User } from './schema/user.schemas';
import { changePasswordDTO } from './dto/changePassword.dto';
import { AccessDto } from './dto/accesses.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    // ===========
    // Helper Methods
    // ===========

    /**
     * Hash a password using bcrypt.
     */
    private async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }

    /**
     * Validate a user's password.
     */
    private async validatePassword(
        plainPassword: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    /**
     * Find a user by ID and validate its existence.
     */
    private async findUserById(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    /**
     * Sanitize user data to remove sensitive information.
     */
    private sanitizeUser(user: User): Partial<User> {
        const { password, ...sanitizedUser } = user.toObject();
        return sanitizedUser;
    }

    // ===========
    // Register User
    // ===========
    async registerUser(signUpDto: CreateUserDto): Promise<{ user: Partial<User> }> {
        const { name, password, role, accesses } = signUpDto;

        // Check if user already exists
        const existedUser = await this.userModel.findOne({ name }).exec();
        if (existedUser) {
            throw new ConflictException('User already exists with this email');
        }

        // Hash the password
        const hashedPassword = await this.hashPassword(password);

        // Create the user
        const user = await this.userModel.create({
            name,
            password: hashedPassword,
            role,
            accesses,
        });

        // Sanitize and return the user data
        const sanitizedUser = this.sanitizeUser(user);
        return { user: sanitizedUser };
    }

    // ===========
    // Login User
    // ===========
    async login(loginDto: loginDto): Promise<{ token: string; user: Partial<User> }> {
        const { name, password } = loginDto;

        // Find the user by email
        const user = await this.userModel.findOne({ name }).exec();
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        // Validate the password
        const isPasswordValid = await this.validatePassword(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        // Generate JWT token
        const token = this.jwtService.sign({ id: user._id });

        // Sanitize and return the user data
        const sanitizedUser = this.sanitizeUser(user);
        return { token, user: sanitizedUser };
    }

    // =======================
    // Get all Users by Admin
    // =======================
    async getAllUser(): Promise<Partial<User>[]> {
        const users = await this.userModel.find().lean();
        return users.map((user) => this.sanitizeUser(user as User));
    }

    // =======================
    // Get user by ID
    // =======================
    async getUser(id: string, requestingUser: User): Promise<Partial<User>> {
        const user = await this.findUserById(id);

        // Check if the requesting user is authorized
        if (requestingUser.role !== Role.ISADMIN && id !== requestingUser._id.toString()) {
            throw new UnauthorizedException('Not allowed');
        }

        // Sanitize and return the user data
        return this.sanitizeUser(user);
    }

    // =======================
    // Change User Password
    // =======================
    async changePassword(
        id: string,
        changePasswordDTO: changePasswordDTO,
        requestingUser: User,
    ): Promise<Partial<User>> {
        const user = await this.findUserById(id);

        // Check if the requesting user is authorized
        if (id !== requestingUser._id.toString()) {
            throw new UnauthorizedException('Not allowed');
        }

        // Validate the old password
        const isOldPasswordValid = await this.validatePassword(
            changePasswordDTO.oldPassword,
            user.password,
        );
        if (!isOldPasswordValid) {
            throw new UnauthorizedException('Invalid old password');
        }

        // Hash the new password
        const hashedNewPassword = await this.hashPassword(changePasswordDTO.newPassword);

        // Update the password
        const updatedUser = await this.userModel
            .findByIdAndUpdate(id, { password: hashedNewPassword }, { new: true })
            .exec();

        // Sanitize and return the updated user data
        return this.sanitizeUser(updatedUser);
    }

    // ===============
    // Update User Profile
    // ===============
    async updateProfile(
        id: string,
        updateUserDto: updateUserDto,
        requestingUser: User,
    ): Promise<Partial<User>> {
        // Check if the requesting user is authorized
        if (id !== requestingUser._id.toString()) {
            throw new UnauthorizedException('Not allowed');
        }

        // Update the user profile
        const updatedUser = await this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .exec();

        // Sanitize and return the updated user data
        return this.sanitizeUser(updatedUser);
    }

    // ===============
    // Delete User Profile
    // ===============
    async deleteProfile(id: string): Promise<Partial<User>> {
        const user = await this.findUserById(id);
        await this.userModel.findByIdAndDelete(id).exec();
        return this.sanitizeUser(user);
    }

    // ===============
    // Update User Access Permissions
    // ===============
    async updateAccess(id: string, accessDto: AccessDto): Promise<{ message: string }> {
        const user = await this.findUserById(id);

        // Update the user's access permissions
        user.accesses = accessDto as any;
        await user.save();

        return { message: 'User access permissions updated successfully' };
    }
}