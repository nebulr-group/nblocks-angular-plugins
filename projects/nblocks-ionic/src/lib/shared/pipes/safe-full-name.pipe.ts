import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'safeFullName'
})
export class SafeFullNamePipe implements PipeTransform {

  constructor(private readonly translateService: TranslateService) { }
  
  transform(fullName: string | undefined): string {       
    return fullName ? fullName : this.translateService.instant('NBLOCKS.USER.NO_NAME');
  }

}
