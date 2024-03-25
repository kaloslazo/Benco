import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { plainToClass } from 'class-transformer';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { UserEntityUpdateDto } from './dtos/userUpdate.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  getUserById = async (userId: string): Promise<any> => {
    if (!userId) throw new NotFoundException('User id not found.');

    const currentUser = await this.userRepository.findOne({ where: { id: userId } });
    if (!currentUser) throw new NotFoundException('User not found.');

    const { password, ...userWithoutPassword } = currentUser;
    return userWithoutPassword;
  };

  deleteUserById = async (userId: string, response: Response) => {
    if (!userId) throw new NotFoundException('User id not found.');

    const currentUser = await this.userRepository.findOne({ where: { id: userId } });
    if (!currentUser) throw new NotFoundException('User not found.');

    const deletedUser = await this.userRepository.delete({ id: userId });
    if (deletedUser.affected === 0) throw new NotFoundException('Any record was deleted.');

    response.clearCookie('authorization');
    return response.status(200).json({ message: 'User deleted successfully.' });
  };

  updateUser = async (userId: string, userData: UserEntityUpdateDto): Promise<UserEntity> => {
    if (!userId) throw new NotFoundException('User id not found.');

    const currentUser = await this.userRepository.findOne({ where: { id: userId } });
    if (!currentUser) throw new NotFoundException('User not found.');

    if (userData.email && userData.email !== currentUser.email) {
      const userExists = await this.userRepository.findOne({ where: { email: userData.email } });
      if (userExists) throw new ConflictException('User with email already exists.');
    }

    if (userData.nickname && userData.nickname !== currentUser.nickname) {
      const userExists = await this.userRepository.findOne({ where: { nickname: userData.nickname } });
      if (userExists) throw new ConflictException('User with nickname already exists.');
    }

    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
    }

    const { password, ...updateData } = userData;
    const updatedUser = await this.userRepository.merge(currentUser, updateData);

    await this.userRepository.save(updatedUser);
    return updatedUser;
  };
}
