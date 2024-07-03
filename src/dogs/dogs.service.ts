import { ConflictException, Injectable,
InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DogEntity } from "../entities/dog.entity";
import { Repository } from "typeorm";
import axios from "axios";
  
@Injectable()
export class DogsService {
    constructor(
        @InjectRepository(DogEntity)
        private dogRepository: Repository<DogEntity>,
    ) {}
  
    async updateDogs(){
        try {
            const response = await axios.get('https://random.dog/doggos');
            const filenames = response.data;
    
            for (const filename of filenames) {
            const dogFile = new DogEntity();
            dogFile.name = filename;
            dogFile.link = `https://random.dog/${filename}`;
            await this.dogRepository.upsert(dogFile, ['name']);
            }
    
            return {message: 'Database updated successfully'};
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Failed to update database');
        }
    }
  
    async getDogs(page: number) {
        const take = 20;
        const skip = (page - 1) * take;
    
        try {
            const dogs = await this.dogRepository.find({
            take,
            skip,
            select: ['id', 'link', 'likes'],
            order: {
              id: 'ASC',
            }
          }); 
    
        return dogs;
    }catch (error) {
        throw error;
    }
    }
  
    async addLike(id: number) {
        try {
            const dog = await this.dogRepository.findOne({ where: { id } });
            if (!dog) {
                return null;
            }
    
            dog.likes += 1;
            await this.dogRepository.save(dog);
    
            return { id: dog.id, likes: dog.likes };
        } catch (error) {
            throw error;
        }
    }
    async unLike(id: number) {
        try {
            const dog = await this.dogRepository.findOne({ where: { id } });
            if (!dog) {
                return null;
            }
            if (dog.likes === 0){
                throw new ConflictException('likes = 0');
            }
            dog.likes -= 1;
            await this.dogRepository.save(dog);
    
            return { id: dog.id, likes: dog.likes };
        } catch (error) {
            throw error;
        }
    }
  }