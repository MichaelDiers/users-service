import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../configuration/configuration.module';
import { HashPipe } from './hash-pipe';

@Module({
  exports: [HashPipe],
  imports: [ConfigurationModule],
  providers: [HashPipe],
})
export class PipesModule {}
