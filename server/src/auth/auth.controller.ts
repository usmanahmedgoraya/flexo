import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/register-dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { Role, User } from './schema/user.schemas';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { changePasswordDTO } from './dto/changePassword.dto';
import { updateUserDto } from './dto/updateUser.dto';
import { AccessDto } from './dto/accesses.dto';

@ApiTags('Auth') // Group all endpoints under the "Auth" section
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // ====================
    // Authentication Endpoints
    // ====================

    @Post('/register')
    @ApiOperation({ summary: 'Register a new user', description: 'Create a new user account.' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, description: 'User registered successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    async register(@Body() registerDTO: CreateUserDto): Promise<{ user: Partial<User> }> {
        return this.authService.registerUser(registerDTO);
    }

    @Post('/login')
    @ApiOperation({ summary: 'User login', description: 'Authenticate a user and return a JWT token.' })
    @ApiBody({ type: loginDto })
    @ApiResponse({ status: 200, description: 'User authenticated successfully.' })
    @ApiResponse({ status: 401, description: 'Invalid credentials.' })
    async login(@Body() loginDto: loginDto): Promise<{ token: string; user: {} }> {
        return this.authService.login(loginDto);
    }

    // ====================
    // User Management Endpoints
    // ====================

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ISADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all users', description: 'Retrieve a list of all users. Only accessible by admins.' })
    @ApiResponse({ status: 200, description: 'List of users retrieved successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Authentication token is missing or invalid.' })
    @ApiResponse({ status: 403, description: 'Forbidden. User does not have the required role (admin).' })
    async getAllUsers() {
        return await this.authService.getAllUser();
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user profile', description: 'Retrieve the profile of a specific user.' })
    @ApiParam({ name: 'id', description: 'User ID', type: String })
    @ApiResponse({ status: 200, description: 'User profile retrieved successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Authentication token is missing or invalid.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async getUserProfile(@Param('id') id: string, @Req() req) {
        return await this.authService.getUser(id, req.user);
    }

    @Delete('profile/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ISADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete user profile', description: 'Delete the profile of a specific user. Only accessible by admins.' })
    @ApiParam({ name: 'id', description: 'User ID', type: String })
    @ApiResponse({ status: 200, description: 'User profile deleted successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Authentication token is missing or invalid.' })
    @ApiResponse({ status: 403, description: 'Forbidden. User does not have the required role (admin).' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async deleteUserProfile(@Param('id') id: string) {
        return await this.authService.deleteProfile(id);
    }

    @Put('profile/change-password/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ISADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Change user password', description: 'Change the password of a specific user. Only accessible by admins.' })
    @ApiParam({ name: 'id', description: 'User ID', type: String })
    @ApiBody({ type: changePasswordDTO })
    @ApiResponse({ status: 200, description: 'Password changed successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Authentication token is missing or invalid.' })
    @ApiResponse({ status: 403, description: 'Forbidden. User does not have the required role (admin).' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async changeUserPassword(
        @Param('id') id: string,
        @Body() changePasswordDTO: changePasswordDTO,
        @Req() req,
    ) {
        return await this.authService.changePassword(id, changePasswordDTO, req.user);
    }

    @Put('profile/update/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ISADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update user profile', description: 'Update the profile of a specific user. Only accessible by admins.' })
    @ApiParam({ name: 'id', description: 'User ID', type: String })
    @ApiBody({ type: updateUserDto })
    @ApiResponse({ status: 200, description: 'User profile updated successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Authentication token is missing or invalid.' })
    @ApiResponse({ status: 403, description: 'Forbidden. User does not have the required role (admin).' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async updateUserProfile(
        @Param('id') id: string,
        @Body() updateUserDto: updateUserDto,
        @Req() req,
    ) {
        return await this.authService.updateProfile(id, updateUserDto, req.user);
    }

    // ====================
    // Access Management Endpoints
    // ====================

    @Put('update-access/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ISADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update user access permissions', description: 'Update the access permissions of a specific user. Only accessible by admins.' })
    @ApiParam({ name: 'id', description: 'User ID', type: String })
    @ApiBody({ type: AccessDto })
    @ApiResponse({ status: 200, description: 'User access permissions updated successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Authentication token is missing or invalid.' })
    @ApiResponse({ status: 403, description: 'Forbidden. User does not have the required role (admin).' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async updateUserAccess(
        @Param('id') id: string,
        @Body() accessDto: AccessDto,
    ) {
        return await this.authService.updateAccess(id, accessDto);
    }
}