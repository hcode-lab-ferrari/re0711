import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {
    Address,
    PaymentSituation,
    Person,
    Schedule,
    ScheduleService,
    Service,
    TimeOption,
    User,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { include } from './schedules.const';
import { ScheduleProps } from './SchedulesType';

@Injectable()
export class SchedulesService {
    constructor(private prisma: PrismaService) {}

    async getAll() {
        return this.prisma.schedule.findMany({
            include,
        });
    }

    async getAllByUser(userId: number) {
        userId = Number(userId);

        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        return this.prisma.schedule.findMany({
            where: {
                personId: Number(user.personId),
            },
            include,
        });
    }

    async get(id: number) {
        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException('ID is required.');
        }

        const schedule = (await this.prisma.schedule.findUnique({
            where: {
                id,
            },
            include,
        })) as Schedule & {
            person: Person & {
                User: User[];
            };
            ScheduleService: (ScheduleService & {
                service: Service;
            })[];
            address: Address;
            paymentSituation: PaymentSituation;
            timeOption: TimeOption;
        };

        if (!schedule) {
            throw new BadRequestException('Schedule not found.');
        }

        return schedule;
    }

    async delete(id: number) {
        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException('ID is required.');
        }

        const schedule = await this.get(id);

        if (!schedule) {
            throw new NotFoundException('Schedule not found.');
        }

        await this.prisma.schedule.delete({
            where: {
                id,
            },
        });

        return {
            success: true,
        };
    }
}
