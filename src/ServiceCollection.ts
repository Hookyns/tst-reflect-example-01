import {
    Type,
    getType
} from "tst-reflect";

export class ServiceCollection
{
    get services(): IterableIterator<[Type, Array<Type>]>
    {
        return this._services.entries();
    }

    /**
     * List of added dependencies
     */
    private readonly _services: Map<Type, Array<Type>> = new Map<Type, Array<Type>>();

    /**
     * Add transient dependency into collection.
     * @reflectGeneric
     * @param dependencyType
     * @param dependencyImplementationType
     */
    addTransient(dependencyType: Type, dependencyImplementationType: Type)
    /**
     * Add already existing object as dependency into collection.
     * @reflectGeneric
     * @param dependencyType
     * @param dependencyImplementation Instance of any type, already existing object. But it is not transient.
     */
    addTransient(dependencyType: Type, dependencyImplementation: object)
    /**
     * Add transient dependency into collection.
     * @reflectGeneric
     */
    addTransient<TDependency, TImplementation>()
    /**
     * @internal
     * @reflectGeneric
     * @param dependencyType
     * @param dependencyImplementation
     */
    addTransient<TDependency, TImplementation>(dependencyType?: Type, dependencyImplementation?: Type | any)
    {
        if (dependencyType === undefined)
        {
            dependencyType = getType<TDependency>();
        }

        if (dependencyImplementation === undefined)
        {
            dependencyImplementation = getType<TImplementation>();
        }

        const value = (this._services.get(dependencyType) || []);
        value.push(dependencyImplementation);

        this._services.set(dependencyType, value);
    }

    // addScoped(dependencyType: Type, dependencyImplementation: Type)
    // {
    //
    // }

    // addSingleton(dependencyType: Type, dependencyImplementation: Type)
    // {
    //
    // }
}