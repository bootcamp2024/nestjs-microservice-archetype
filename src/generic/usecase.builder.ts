import { Provider } from '@nestjs/common';
import { UseCase } from './usecase';

interface UseCaseConfig<R, T> {
  useCaseClass: new (...args: any[]) => UseCase<R, T>;
  dependencies: any[];
}

export class UseCasesProviderBuilder {
  private useCaseConfigs: UseCaseConfig<any, any>[] = [];

  addUseCase<R, T>(
    useCaseClass: new (...args: any[]) => UseCase<R, T>,
    ...dependencies: any[]
  ): UseCasesProviderBuilder {
    this.useCaseConfigs.push({ useCaseClass, dependencies });
    return this;
  }

  build(): Provider[] {
    return this.useCaseConfigs.map((config) => ({
      provide: config.useCaseClass.name,
      useFactory: (...resolvedDependencies: any[]) =>
        new config.useCaseClass(...resolvedDependencies),
      inject: config.dependencies,
    }));
  }
}
