import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardGameModule } from './board-game/board-game.module';
import { GenreModule } from './genre/genre.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BoardGameScoreModule } from './board-game-score/board-game-score.module';

@Module({
  imports: [BoardGameModule, GenreModule, AuthModule, UserModule, BoardGameScoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
