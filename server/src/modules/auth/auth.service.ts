import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthRegisterDto } from './dtos/authRegister.dto';
import { UserEntity } from '../users/entities/user.entity';
import { AuthLoginDto } from './dtos/authLogin.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) {}

  register = async (authRegisterDto: AuthRegisterDto, response: Response) => {
    const { nickname, email, password } = authRegisterDto;

    const userExists = await this.userRepository.findOne({ where: [{ email }, { nickname }] }).catch(() => {
      throw new InternalServerErrorException('An error ocurred finding user.');
    });
    if (userExists) throw new ConflictException('User with email or nickname already exists.');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ nickname, email, password: hashedPassword, active: true });
    await this.userRepository.save(newUser);

    return response.status(201).json({ message: 'User created successfully.' });
  };

  login = async (authLoginDto: AuthLoginDto, response: Response) => {
    const { nickname, password } = authLoginDto;

    const user = await this.userRepository.findOne({ where: { nickname } }).catch(() => {
      throw new InternalServerErrorException('An error ocurred finding user.');
    });
    if (!user) throw new NotFoundException('User with nickname not found.');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid combination email & password.');

    const { password: userPassword, ...userWithoutPassword } = user;
    const jwt = this.jwtService.sign(userWithoutPassword);
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
    };

    response.cookie('authorization', jwt, cookieOptions);
    return response.status(200).json(userWithoutPassword);
  };

  logout = async (request: Request, response: Response) => {
    const token = request.cookies['authorization'];
    if (!token) throw new UnauthorizedException('No active session.');

    response.cookie('authorization', '', { httpOnly: true, expires: new Date(0) });
    return response.status(200).json({ message: 'User logged out successfully.' });
  };

  verify = async (token: string) => {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  };
}
