import { Column } from 'typeorm';

export class PropsValue {
  @Column()
  placeholder!: string;
}
