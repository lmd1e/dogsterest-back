import { Controller, Get, Param, Post, Query, BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DogsService  } from './dogs.service';


@Controller('dogs')
export class DogsController {
    constructor(private readonly dogsService: DogsService) {}
    
    @Get("/update")
    updateDogs() {
        return this.dogsService.updateDogs();
    }
  
    @Get()
    async getDogs(@Query('page') page: number) {
        if (!page) {
            throw new BadRequestException('Page parameter is required');
        }
    
        try {
            return await this.dogsService.getDogs(page);
        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch dogs on page ${page}`);
        }
    }
  
    @Post("/like/:id")
    async addLike(@Param('id') id: number) {
        try {
            const result = await this.dogsService.addLike(id);
            if (!result) {
                throw new NotFoundException(`Dog with id ${id} not found`);
            }
            return result;
        } catch (error) {
            throw new InternalServerErrorException(`Failed to like dog with id ${id}`);
        }
    }

    @Post("/unlike/:id")
    async unLike(@Param('id') id: number) {
        try {
            const result = await this.dogsService.unLike(id);
            if (!result) {
                throw new NotFoundException(`Dog with id ${id} not found`);
            }
            return result;
        } catch (error) {
            throw new InternalServerErrorException(`Failed to like dog with id ${id}`);
        }
    }
  }