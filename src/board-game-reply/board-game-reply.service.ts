import { Injectable } from '@nestjs/common';
import { CreateBoardGameReplyDto } from './dto/create-board-game-reply.dto';
import { UpdateBoardGameReplyDto } from './dto/update-board-game-reply.dto';

@Injectable()
export class BoardGameReplyService {
  create(createBoardGameReplyDto: CreateBoardGameReplyDto) {
    return 'This action adds a new boardGameReply';
  }

  findAll() {
    return `This action returns all boardGameReply`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boardGameReply`;
  }

  update(id: number, updateBoardGameReplyDto: UpdateBoardGameReplyDto) {
    return `This action updates a #${id} boardGameReply`;
  }

  remove(id: number) {
    return `This action removes a #${id} boardGameReply`;
  }
}
