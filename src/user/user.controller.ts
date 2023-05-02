import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptors';
import { UseInterceptors } from '@nestjs/common';
import { ExceptionInterceptor } from 'src/interceptors/exception.interceptor';


@UseInterceptors(SerializeInterceptor)
@UseInterceptors(ExceptionInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    console.log(body)
    return this.userService.create(body);
  }

  @Get()
  findAll(@Query() query) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
