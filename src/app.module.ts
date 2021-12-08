import { AdminBoardGameModule } from './admin-board-game/admin-board-game.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardGameModule } from './board-game/board-game.module';
import { BoardGameReplyModule } from './board-game-reply/board-game-reply.module';
import { BoardGameScoreModule } from './board-game-score/board-game-score.module';
import { GenreModule } from './genre/genre.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminGenreModule } from './admin-genre/admin-genre.module';

@Module({
  imports: [
    BoardGameModule,
    GenreModule,
    AuthModule,
    UserModule,
    BoardGameScoreModule,
    BoardGameReplyModule,
    AdminBoardGameModule,
    AdminGenreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
