# parameter-decorator-typescript

A small decorator helpers wich allow you to mark & check method parameters

```typescript
import { handleParams, param } from 'parameter-decorator-typescript';

const handlers: { [key: string]: (parameter: any) => void } = {};
handlers.notNull = (parameter: any) => {
    if (parameter == null) {
        throw new Error('Parameter is null');
    }
};

class Greeter {
    @handleParams(handlers)
    public greet(@param('notNull') name?: string) {
        return "Hello " + name;
    }
}

const greeter = new Greeter();
greeter.greet('hello'); // ok
greeter.greet('world'); // ok
greeter.greet();        // throws Error('Parameter is null')
```
