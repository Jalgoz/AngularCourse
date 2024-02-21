import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginResponse } from './interfaces/login-response';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // 1: Encrypt the password
      const { password, ...userData } = createUserDto;
      const newUser = new this.userModel({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      const { password: _, ...user } = (await newUser.save()).toJSON();

      return user;
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        throw new BadRequestException(
          `${createUserDto.email} email already taken`,
        );
      } else {
        throw new InternalServerErrorException('An error occurred');
      }
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('Invalid email');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Invalid password');
    }

    const { password: _, ...userData } = user.toJSON();

    return {
      user: userData,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async register(registerUserDto: RegisterUserDto): Promise<LoginResponse> {
    const user = await this.create(registerUserDto);

    return {
      user,
      token: this.getJwtToken({ id: user._id }),
    };
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  async findUserById(id: string) {
    const user = await this.userModel.findById(id);
    const { password: _, ...userData } = user.toJSON();

    return userData;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);

    return token;
  }
}
