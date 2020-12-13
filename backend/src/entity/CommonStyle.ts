import { Column } from 'typeorm';

export default class CommonStyle {
  @Column()
  width!: number;

  @Column()
  height!: number;

  @Column()
  zIndex!: number;

  @Column()
  fontSize!: number;

  @Column()
  color!: string;

  @Column()
  top!: number;

  @Column()
  left!: number;

  @Column()
  rotate!: number;
}
