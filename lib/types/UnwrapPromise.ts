
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
    
type UnwrapPromise<T extends (...args: any) => any> = ThenArg<ReturnType<T>>;

export default UnwrapPromise;
