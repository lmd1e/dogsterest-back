import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogEntity } from './entities/dog.entity';
import { DogsService } from './dogs/dogs.service';
import { DogsController } from './dogs/dogs.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'postgres',
      entities: [DogEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([DogEntity]),
  ],
  controllers: [DogsController],
  providers: [DogsService],
})
export class AppModule {}
