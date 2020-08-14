import { PipeTransform, BadRequestException } from '@nestjs/common';
import { UserRole } from '../user-role.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [UserRole.ADMIN, UserRole.AUTHOR];

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
