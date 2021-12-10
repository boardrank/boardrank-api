import * as Joi from 'joi';

import { AdminBoardGameModule } from './admin-board-game/admin-board-game.module';
import { AdminGenreModule } from './admin-genre/admin-genre.module';
import { AdminUserModule } from './admin-user/admin-user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardGameModule } from './board-game/board-game.module';
import { BoardGameReplyModule } from './board-game-reply/board-game-reply.module';
import { BoardGameScoreModule } from './board-game-score/board-game-score.module';
import { ConfigModule } from '@nestjs/config';
import { GenreModule } from './genre/genre.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? '.env.development'
          : '.env.local',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('local', 'development', 'production', 'test')
          .required(),
        DATABASE_URL: Joi.string().required(),
        OAUTH_GOOGLE_CLIENT_ID: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    BoardGameModule,
    GenreModule,
    AuthModule,
    UserModule,
    BoardGameScoreModule,
    BoardGameReplyModule,
    AdminBoardGameModule,
    AdminGenreModule,
    AdminUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
