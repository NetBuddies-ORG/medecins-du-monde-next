
export class Deferred
{
    public readonly promise: Promise<void>;
    public resolve: ()=>void;
    public cancel: ()=>void;
    
    constructor()
    {
        this.promise = new Promise((resolve, cancel) => {
            this.resolve = resolve;
            this.cancel = cancel;
        });
    }
}