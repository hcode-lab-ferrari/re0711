import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SchedulesService } from './schedules.service';
import { ScheduleProps } from './SchedulesType';

@Controller('schedules')
export class SchedulesController {
    constructor(private schedulesService: SchedulesService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getAll() {
        return this.schedulesService.getAll();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.schedulesService.get(id);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.schedulesService.delete(id);
    }
}
