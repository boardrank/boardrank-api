import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardGameModule } from './board-game/board-game.module';
import { GenreModule } from './genre/genre.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BoardGameModule, GenreModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
