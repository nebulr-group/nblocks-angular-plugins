import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tenant } from '../../../generated/graphql';
import { TenantService } from '../../tenant.service';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { NblocksTranslationService } from '../../../shared/nblocks-translation.service';

@Component({
  selector: 'nblocks-edit-tenant',
  templateUrl: './edit-tenant.component.html',
  styleUrls: ['./edit-tenant.component.css']
})
export class EditTenantComponent implements OnInit {
  readonly EDIT_ROLES = ['OWNER'];

  mutableTenant!:Tenant;
  tenant$!: Observable<Tenant>;

  languages: SelectItem[];
  
  constructor(
    private readonly tenantService: TenantService,
    private readonly primengConfig: PrimeNGConfig,
    private readonly nblocksTranslationService: NblocksTranslationService
  ) {
    this.mutableTenant = this.createInitialDummyTenant();
    this.languages = this.nblocksTranslationService.selectableLanguages;
    this.nblocksTranslationService.languageChanged.subscribe(lang => this._reRenderLangPicker());
  }

  ngOnInit(): void {
    
    this.tenant$ = this._getTenant();

    this.tenant$.subscribe(t => {
      this.mutableTenant = JSON.parse(JSON.stringify(t));
    });
  }

  updateTenant():void {
    const {name, locale} = this.mutableTenant as Tenant;
    this.tenantService.updateTenant(name, locale!);
  }

  private _getTenant():Observable<Tenant>{
    return this.tenantService.getTenant();
  }

  /** Sometimes the lang picker get stuck with untranslated entries if language changed, this is a bug fix */
  private _reRenderLangPicker(): void {
    this.languages = JSON.parse(JSON.stringify(this.nblocksTranslationService.selectableLanguages));
  }

  private createInitialDummyTenant(): Tenant{
    return {
      id: '',
      logo: '',
      name: '',
      locale: 'en'
    }
  }
}

