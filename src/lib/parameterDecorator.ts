import "reflect-metadata";

export function handleParams(handlers: { [key: string]: (parameter: any) => void }): MethodDecorator {
    return (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const method = descriptor.value;
        descriptor.value = function() {
            for (const handlerKey of Object.keys(handlers)) {
                const requiredParameters = Reflect.getOwnMetadata(handlerKey, target, propertyKey);
                if (requiredParameters) {
                    for (const parameterIndex of requiredParameters) {
                        handlers[handlerKey](arguments[parameterIndex]);
                    }
                }
            }
            return method!.apply(this, arguments);
        };
    };
}

export function param(handlerName: string): ParameterDecorator {
    return (target: object, propertyKey: string | symbol, parameterIndex: number) => {
        const existingRequiredParameters = Reflect.getOwnMetadata(handlerName, target, propertyKey) || [];
        existingRequiredParameters.push(parameterIndex);
        Reflect.defineMetadata(handlerName, existingRequiredParameters, target, propertyKey);
    };
}
