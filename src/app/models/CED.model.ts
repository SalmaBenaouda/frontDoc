import { StructureRecherche } from "./StructureRecherche.model";


export class CED {
  id!: number;
  nom!: string;
  email!: string;
  structureRecherches?: StructureRecherche[];

  constructor(init?: Partial<CED>) {
    Object.assign(this, init);
  }
}
