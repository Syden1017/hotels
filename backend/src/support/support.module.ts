import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SupportRequest,
  SupportRequestSchema,
} from './schemas/support-request.schema';
import {
  SupportRequestClientService,
  SupportRequestEmployeeService,
  SupportRequestService,
} from './support.service';
import { SupportRequestController } from './support.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
    ]),
  ],
  providers: [
    SupportRequestService,
    SupportRequestClientService,
    SupportRequestEmployeeService,
  ],
  controllers: [SupportRequestController],
  exports: [SupportRequestClientService, SupportRequestEmployeeService],
})
export class SupportModule {}
