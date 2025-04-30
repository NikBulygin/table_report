
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Shop12
 * 
 */
export type Shop12 = $Result.DefaultSelection<Prisma.$Shop12Payload>
/**
 * Model Shop2
 * 
 */
export type Shop2 = $Result.DefaultSelection<Prisma.$Shop2Payload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Shop12s
 * const shop12s = await prisma.shop12.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Shop12s
   * const shop12s = await prisma.shop12.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.shop12`: Exposes CRUD operations for the **Shop12** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shop12s
    * const shop12s = await prisma.shop12.findMany()
    * ```
    */
  get shop12(): Prisma.Shop12Delegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.shop2`: Exposes CRUD operations for the **Shop2** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shop2s
    * const shop2s = await prisma.shop2.findMany()
    * ```
    */
  get shop2(): Prisma.Shop2Delegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Shop12: 'Shop12',
    Shop2: 'Shop2'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "shop12" | "shop2"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Shop12: {
        payload: Prisma.$Shop12Payload<ExtArgs>
        fields: Prisma.Shop12FieldRefs
        operations: {
          findUnique: {
            args: Prisma.Shop12FindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop12Payload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Shop12FindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop12Payload>
          }
          findFirst: {
            args: Prisma.Shop12FindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop12Payload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Shop12FindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop12Payload>
          }
          findMany: {
            args: Prisma.Shop12FindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop12Payload>[]
          }
          create: {
            args: Prisma.Shop12CreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop12Payload>
          }
          createMany: {
            args: Prisma.Shop12CreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Shop12CreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop12Payload>[]
          }
          delete: {
            args: Prisma.Shop12DeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop12Payload>
          }
          update: {
            args: Prisma.Shop12UpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop12Payload>
          }
          deleteMany: {
            args: Prisma.Shop12DeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Shop12UpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.Shop12UpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop12Payload>[]
          }
          upsert: {
            args: Prisma.Shop12UpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop12Payload>
          }
          aggregate: {
            args: Prisma.Shop12AggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShop12>
          }
          groupBy: {
            args: Prisma.Shop12GroupByArgs<ExtArgs>
            result: $Utils.Optional<Shop12GroupByOutputType>[]
          }
          count: {
            args: Prisma.Shop12CountArgs<ExtArgs>
            result: $Utils.Optional<Shop12CountAggregateOutputType> | number
          }
        }
      }
      Shop2: {
        payload: Prisma.$Shop2Payload<ExtArgs>
        fields: Prisma.Shop2FieldRefs
        operations: {
          findUnique: {
            args: Prisma.Shop2FindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop2Payload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Shop2FindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop2Payload>
          }
          findFirst: {
            args: Prisma.Shop2FindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop2Payload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Shop2FindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop2Payload>
          }
          findMany: {
            args: Prisma.Shop2FindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop2Payload>[]
          }
          create: {
            args: Prisma.Shop2CreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop2Payload>
          }
          createMany: {
            args: Prisma.Shop2CreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Shop2CreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop2Payload>[]
          }
          delete: {
            args: Prisma.Shop2DeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop2Payload>
          }
          update: {
            args: Prisma.Shop2UpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop2Payload>
          }
          deleteMany: {
            args: Prisma.Shop2DeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Shop2UpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.Shop2UpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop2Payload>[]
          }
          upsert: {
            args: Prisma.Shop2UpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Shop2Payload>
          }
          aggregate: {
            args: Prisma.Shop2AggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShop2>
          }
          groupBy: {
            args: Prisma.Shop2GroupByArgs<ExtArgs>
            result: $Utils.Optional<Shop2GroupByOutputType>[]
          }
          count: {
            args: Prisma.Shop2CountArgs<ExtArgs>
            result: $Utils.Optional<Shop2CountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    shop12?: Shop12Omit
    shop2?: Shop2Omit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Shop12
   */

  export type AggregateShop12 = {
    _count: Shop12CountAggregateOutputType | null
    _avg: Shop12AvgAggregateOutputType | null
    _sum: Shop12SumAggregateOutputType | null
    _min: Shop12MinAggregateOutputType | null
    _max: Shop12MaxAggregateOutputType | null
  }

  export type Shop12AvgAggregateOutputType = {
    id: number | null
    weight: number | null
    tio2Analysis: number | null
    h2oAnalysis: number | null
    recalculatedWeight: number | null
  }

  export type Shop12SumAggregateOutputType = {
    id: number | null
    weight: number | null
    tio2Analysis: number | null
    h2oAnalysis: number | null
    recalculatedWeight: number | null
  }

  export type Shop12MinAggregateOutputType = {
    id: number | null
    vagonNumber: string | null
    weight: number | null
    tio2Analysis: number | null
    h2oAnalysis: number | null
    recalculatedWeight: number | null
    InvoiceDate: Date | null
    InvoiceNumber: string | null
    GtdDate: Date | null
    GtdNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Shop12MaxAggregateOutputType = {
    id: number | null
    vagonNumber: string | null
    weight: number | null
    tio2Analysis: number | null
    h2oAnalysis: number | null
    recalculatedWeight: number | null
    InvoiceDate: Date | null
    InvoiceNumber: string | null
    GtdDate: Date | null
    GtdNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Shop12CountAggregateOutputType = {
    id: number
    vagonNumber: number
    weight: number
    tio2Analysis: number
    h2oAnalysis: number
    recalculatedWeight: number
    InvoiceDate: number
    InvoiceNumber: number
    GtdDate: number
    GtdNumber: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Shop12AvgAggregateInputType = {
    id?: true
    weight?: true
    tio2Analysis?: true
    h2oAnalysis?: true
    recalculatedWeight?: true
  }

  export type Shop12SumAggregateInputType = {
    id?: true
    weight?: true
    tio2Analysis?: true
    h2oAnalysis?: true
    recalculatedWeight?: true
  }

  export type Shop12MinAggregateInputType = {
    id?: true
    vagonNumber?: true
    weight?: true
    tio2Analysis?: true
    h2oAnalysis?: true
    recalculatedWeight?: true
    InvoiceDate?: true
    InvoiceNumber?: true
    GtdDate?: true
    GtdNumber?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Shop12MaxAggregateInputType = {
    id?: true
    vagonNumber?: true
    weight?: true
    tio2Analysis?: true
    h2oAnalysis?: true
    recalculatedWeight?: true
    InvoiceDate?: true
    InvoiceNumber?: true
    GtdDate?: true
    GtdNumber?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Shop12CountAggregateInputType = {
    id?: true
    vagonNumber?: true
    weight?: true
    tio2Analysis?: true
    h2oAnalysis?: true
    recalculatedWeight?: true
    InvoiceDate?: true
    InvoiceNumber?: true
    GtdDate?: true
    GtdNumber?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Shop12AggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shop12 to aggregate.
     */
    where?: Shop12WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shop12s to fetch.
     */
    orderBy?: Shop12OrderByWithRelationInput | Shop12OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Shop12WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shop12s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shop12s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Shop12s
    **/
    _count?: true | Shop12CountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Shop12AvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Shop12SumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Shop12MinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Shop12MaxAggregateInputType
  }

  export type GetShop12AggregateType<T extends Shop12AggregateArgs> = {
        [P in keyof T & keyof AggregateShop12]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShop12[P]>
      : GetScalarType<T[P], AggregateShop12[P]>
  }




  export type Shop12GroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Shop12WhereInput
    orderBy?: Shop12OrderByWithAggregationInput | Shop12OrderByWithAggregationInput[]
    by: Shop12ScalarFieldEnum[] | Shop12ScalarFieldEnum
    having?: Shop12ScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Shop12CountAggregateInputType | true
    _avg?: Shop12AvgAggregateInputType
    _sum?: Shop12SumAggregateInputType
    _min?: Shop12MinAggregateInputType
    _max?: Shop12MaxAggregateInputType
  }

  export type Shop12GroupByOutputType = {
    id: number
    vagonNumber: string
    weight: number
    tio2Analysis: number
    h2oAnalysis: number
    recalculatedWeight: number
    InvoiceDate: Date
    InvoiceNumber: string
    GtdDate: Date
    GtdNumber: string
    createdAt: Date
    updatedAt: Date
    _count: Shop12CountAggregateOutputType | null
    _avg: Shop12AvgAggregateOutputType | null
    _sum: Shop12SumAggregateOutputType | null
    _min: Shop12MinAggregateOutputType | null
    _max: Shop12MaxAggregateOutputType | null
  }

  type GetShop12GroupByPayload<T extends Shop12GroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Shop12GroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Shop12GroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Shop12GroupByOutputType[P]>
            : GetScalarType<T[P], Shop12GroupByOutputType[P]>
        }
      >
    >


  export type Shop12Select<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vagonNumber?: boolean
    weight?: boolean
    tio2Analysis?: boolean
    h2oAnalysis?: boolean
    recalculatedWeight?: boolean
    InvoiceDate?: boolean
    InvoiceNumber?: boolean
    GtdDate?: boolean
    GtdNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["shop12"]>

  export type Shop12SelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vagonNumber?: boolean
    weight?: boolean
    tio2Analysis?: boolean
    h2oAnalysis?: boolean
    recalculatedWeight?: boolean
    InvoiceDate?: boolean
    InvoiceNumber?: boolean
    GtdDate?: boolean
    GtdNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["shop12"]>

  export type Shop12SelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vagonNumber?: boolean
    weight?: boolean
    tio2Analysis?: boolean
    h2oAnalysis?: boolean
    recalculatedWeight?: boolean
    InvoiceDate?: boolean
    InvoiceNumber?: boolean
    GtdDate?: boolean
    GtdNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["shop12"]>

  export type Shop12SelectScalar = {
    id?: boolean
    vagonNumber?: boolean
    weight?: boolean
    tio2Analysis?: boolean
    h2oAnalysis?: boolean
    recalculatedWeight?: boolean
    InvoiceDate?: boolean
    InvoiceNumber?: boolean
    GtdDate?: boolean
    GtdNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type Shop12Omit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vagonNumber" | "weight" | "tio2Analysis" | "h2oAnalysis" | "recalculatedWeight" | "InvoiceDate" | "InvoiceNumber" | "GtdDate" | "GtdNumber" | "createdAt" | "updatedAt", ExtArgs["result"]["shop12"]>

  export type $Shop12Payload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Shop12"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      vagonNumber: string
      weight: number
      tio2Analysis: number
      h2oAnalysis: number
      recalculatedWeight: number
      InvoiceDate: Date
      InvoiceNumber: string
      GtdDate: Date
      GtdNumber: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["shop12"]>
    composites: {}
  }

  type Shop12GetPayload<S extends boolean | null | undefined | Shop12DefaultArgs> = $Result.GetResult<Prisma.$Shop12Payload, S>

  type Shop12CountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Shop12FindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Shop12CountAggregateInputType | true
    }

  export interface Shop12Delegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Shop12'], meta: { name: 'Shop12' } }
    /**
     * Find zero or one Shop12 that matches the filter.
     * @param {Shop12FindUniqueArgs} args - Arguments to find a Shop12
     * @example
     * // Get one Shop12
     * const shop12 = await prisma.shop12.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Shop12FindUniqueArgs>(args: SelectSubset<T, Shop12FindUniqueArgs<ExtArgs>>): Prisma__Shop12Client<$Result.GetResult<Prisma.$Shop12Payload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Shop12 that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Shop12FindUniqueOrThrowArgs} args - Arguments to find a Shop12
     * @example
     * // Get one Shop12
     * const shop12 = await prisma.shop12.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Shop12FindUniqueOrThrowArgs>(args: SelectSubset<T, Shop12FindUniqueOrThrowArgs<ExtArgs>>): Prisma__Shop12Client<$Result.GetResult<Prisma.$Shop12Payload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shop12 that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shop12FindFirstArgs} args - Arguments to find a Shop12
     * @example
     * // Get one Shop12
     * const shop12 = await prisma.shop12.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Shop12FindFirstArgs>(args?: SelectSubset<T, Shop12FindFirstArgs<ExtArgs>>): Prisma__Shop12Client<$Result.GetResult<Prisma.$Shop12Payload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shop12 that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shop12FindFirstOrThrowArgs} args - Arguments to find a Shop12
     * @example
     * // Get one Shop12
     * const shop12 = await prisma.shop12.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Shop12FindFirstOrThrowArgs>(args?: SelectSubset<T, Shop12FindFirstOrThrowArgs<ExtArgs>>): Prisma__Shop12Client<$Result.GetResult<Prisma.$Shop12Payload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Shop12s that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shop12FindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shop12s
     * const shop12s = await prisma.shop12.findMany()
     * 
     * // Get first 10 Shop12s
     * const shop12s = await prisma.shop12.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shop12WithIdOnly = await prisma.shop12.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Shop12FindManyArgs>(args?: SelectSubset<T, Shop12FindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Shop12Payload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Shop12.
     * @param {Shop12CreateArgs} args - Arguments to create a Shop12.
     * @example
     * // Create one Shop12
     * const Shop12 = await prisma.shop12.create({
     *   data: {
     *     // ... data to create a Shop12
     *   }
     * })
     * 
     */
    create<T extends Shop12CreateArgs>(args: SelectSubset<T, Shop12CreateArgs<ExtArgs>>): Prisma__Shop12Client<$Result.GetResult<Prisma.$Shop12Payload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Shop12s.
     * @param {Shop12CreateManyArgs} args - Arguments to create many Shop12s.
     * @example
     * // Create many Shop12s
     * const shop12 = await prisma.shop12.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Shop12CreateManyArgs>(args?: SelectSubset<T, Shop12CreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Shop12s and returns the data saved in the database.
     * @param {Shop12CreateManyAndReturnArgs} args - Arguments to create many Shop12s.
     * @example
     * // Create many Shop12s
     * const shop12 = await prisma.shop12.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Shop12s and only return the `id`
     * const shop12WithIdOnly = await prisma.shop12.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Shop12CreateManyAndReturnArgs>(args?: SelectSubset<T, Shop12CreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Shop12Payload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Shop12.
     * @param {Shop12DeleteArgs} args - Arguments to delete one Shop12.
     * @example
     * // Delete one Shop12
     * const Shop12 = await prisma.shop12.delete({
     *   where: {
     *     // ... filter to delete one Shop12
     *   }
     * })
     * 
     */
    delete<T extends Shop12DeleteArgs>(args: SelectSubset<T, Shop12DeleteArgs<ExtArgs>>): Prisma__Shop12Client<$Result.GetResult<Prisma.$Shop12Payload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Shop12.
     * @param {Shop12UpdateArgs} args - Arguments to update one Shop12.
     * @example
     * // Update one Shop12
     * const shop12 = await prisma.shop12.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Shop12UpdateArgs>(args: SelectSubset<T, Shop12UpdateArgs<ExtArgs>>): Prisma__Shop12Client<$Result.GetResult<Prisma.$Shop12Payload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Shop12s.
     * @param {Shop12DeleteManyArgs} args - Arguments to filter Shop12s to delete.
     * @example
     * // Delete a few Shop12s
     * const { count } = await prisma.shop12.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Shop12DeleteManyArgs>(args?: SelectSubset<T, Shop12DeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shop12s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shop12UpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shop12s
     * const shop12 = await prisma.shop12.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Shop12UpdateManyArgs>(args: SelectSubset<T, Shop12UpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shop12s and returns the data updated in the database.
     * @param {Shop12UpdateManyAndReturnArgs} args - Arguments to update many Shop12s.
     * @example
     * // Update many Shop12s
     * const shop12 = await prisma.shop12.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Shop12s and only return the `id`
     * const shop12WithIdOnly = await prisma.shop12.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends Shop12UpdateManyAndReturnArgs>(args: SelectSubset<T, Shop12UpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Shop12Payload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Shop12.
     * @param {Shop12UpsertArgs} args - Arguments to update or create a Shop12.
     * @example
     * // Update or create a Shop12
     * const shop12 = await prisma.shop12.upsert({
     *   create: {
     *     // ... data to create a Shop12
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shop12 we want to update
     *   }
     * })
     */
    upsert<T extends Shop12UpsertArgs>(args: SelectSubset<T, Shop12UpsertArgs<ExtArgs>>): Prisma__Shop12Client<$Result.GetResult<Prisma.$Shop12Payload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Shop12s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shop12CountArgs} args - Arguments to filter Shop12s to count.
     * @example
     * // Count the number of Shop12s
     * const count = await prisma.shop12.count({
     *   where: {
     *     // ... the filter for the Shop12s we want to count
     *   }
     * })
    **/
    count<T extends Shop12CountArgs>(
      args?: Subset<T, Shop12CountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Shop12CountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shop12.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shop12AggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Shop12AggregateArgs>(args: Subset<T, Shop12AggregateArgs>): Prisma.PrismaPromise<GetShop12AggregateType<T>>

    /**
     * Group by Shop12.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shop12GroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Shop12GroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Shop12GroupByArgs['orderBy'] }
        : { orderBy?: Shop12GroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Shop12GroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShop12GroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Shop12 model
   */
  readonly fields: Shop12FieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Shop12.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Shop12Client<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Shop12 model
   */
  interface Shop12FieldRefs {
    readonly id: FieldRef<"Shop12", 'Int'>
    readonly vagonNumber: FieldRef<"Shop12", 'String'>
    readonly weight: FieldRef<"Shop12", 'Float'>
    readonly tio2Analysis: FieldRef<"Shop12", 'Float'>
    readonly h2oAnalysis: FieldRef<"Shop12", 'Float'>
    readonly recalculatedWeight: FieldRef<"Shop12", 'Float'>
    readonly InvoiceDate: FieldRef<"Shop12", 'DateTime'>
    readonly InvoiceNumber: FieldRef<"Shop12", 'String'>
    readonly GtdDate: FieldRef<"Shop12", 'DateTime'>
    readonly GtdNumber: FieldRef<"Shop12", 'String'>
    readonly createdAt: FieldRef<"Shop12", 'DateTime'>
    readonly updatedAt: FieldRef<"Shop12", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Shop12 findUnique
   */
  export type Shop12FindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop12
     */
    select?: Shop12Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop12
     */
    omit?: Shop12Omit<ExtArgs> | null
    /**
     * Filter, which Shop12 to fetch.
     */
    where: Shop12WhereUniqueInput
  }

  /**
   * Shop12 findUniqueOrThrow
   */
  export type Shop12FindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop12
     */
    select?: Shop12Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop12
     */
    omit?: Shop12Omit<ExtArgs> | null
    /**
     * Filter, which Shop12 to fetch.
     */
    where: Shop12WhereUniqueInput
  }

  /**
   * Shop12 findFirst
   */
  export type Shop12FindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop12
     */
    select?: Shop12Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop12
     */
    omit?: Shop12Omit<ExtArgs> | null
    /**
     * Filter, which Shop12 to fetch.
     */
    where?: Shop12WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shop12s to fetch.
     */
    orderBy?: Shop12OrderByWithRelationInput | Shop12OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shop12s.
     */
    cursor?: Shop12WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shop12s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shop12s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shop12s.
     */
    distinct?: Shop12ScalarFieldEnum | Shop12ScalarFieldEnum[]
  }

  /**
   * Shop12 findFirstOrThrow
   */
  export type Shop12FindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop12
     */
    select?: Shop12Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop12
     */
    omit?: Shop12Omit<ExtArgs> | null
    /**
     * Filter, which Shop12 to fetch.
     */
    where?: Shop12WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shop12s to fetch.
     */
    orderBy?: Shop12OrderByWithRelationInput | Shop12OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shop12s.
     */
    cursor?: Shop12WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shop12s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shop12s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shop12s.
     */
    distinct?: Shop12ScalarFieldEnum | Shop12ScalarFieldEnum[]
  }

  /**
   * Shop12 findMany
   */
  export type Shop12FindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop12
     */
    select?: Shop12Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop12
     */
    omit?: Shop12Omit<ExtArgs> | null
    /**
     * Filter, which Shop12s to fetch.
     */
    where?: Shop12WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shop12s to fetch.
     */
    orderBy?: Shop12OrderByWithRelationInput | Shop12OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Shop12s.
     */
    cursor?: Shop12WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shop12s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shop12s.
     */
    skip?: number
    distinct?: Shop12ScalarFieldEnum | Shop12ScalarFieldEnum[]
  }

  /**
   * Shop12 create
   */
  export type Shop12CreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop12
     */
    select?: Shop12Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop12
     */
    omit?: Shop12Omit<ExtArgs> | null
    /**
     * The data needed to create a Shop12.
     */
    data: XOR<Shop12CreateInput, Shop12UncheckedCreateInput>
  }

  /**
   * Shop12 createMany
   */
  export type Shop12CreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Shop12s.
     */
    data: Shop12CreateManyInput | Shop12CreateManyInput[]
  }

  /**
   * Shop12 createManyAndReturn
   */
  export type Shop12CreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop12
     */
    select?: Shop12SelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shop12
     */
    omit?: Shop12Omit<ExtArgs> | null
    /**
     * The data used to create many Shop12s.
     */
    data: Shop12CreateManyInput | Shop12CreateManyInput[]
  }

  /**
   * Shop12 update
   */
  export type Shop12UpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop12
     */
    select?: Shop12Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop12
     */
    omit?: Shop12Omit<ExtArgs> | null
    /**
     * The data needed to update a Shop12.
     */
    data: XOR<Shop12UpdateInput, Shop12UncheckedUpdateInput>
    /**
     * Choose, which Shop12 to update.
     */
    where: Shop12WhereUniqueInput
  }

  /**
   * Shop12 updateMany
   */
  export type Shop12UpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Shop12s.
     */
    data: XOR<Shop12UpdateManyMutationInput, Shop12UncheckedUpdateManyInput>
    /**
     * Filter which Shop12s to update
     */
    where?: Shop12WhereInput
    /**
     * Limit how many Shop12s to update.
     */
    limit?: number
  }

  /**
   * Shop12 updateManyAndReturn
   */
  export type Shop12UpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop12
     */
    select?: Shop12SelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shop12
     */
    omit?: Shop12Omit<ExtArgs> | null
    /**
     * The data used to update Shop12s.
     */
    data: XOR<Shop12UpdateManyMutationInput, Shop12UncheckedUpdateManyInput>
    /**
     * Filter which Shop12s to update
     */
    where?: Shop12WhereInput
    /**
     * Limit how many Shop12s to update.
     */
    limit?: number
  }

  /**
   * Shop12 upsert
   */
  export type Shop12UpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop12
     */
    select?: Shop12Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop12
     */
    omit?: Shop12Omit<ExtArgs> | null
    /**
     * The filter to search for the Shop12 to update in case it exists.
     */
    where: Shop12WhereUniqueInput
    /**
     * In case the Shop12 found by the `where` argument doesn't exist, create a new Shop12 with this data.
     */
    create: XOR<Shop12CreateInput, Shop12UncheckedCreateInput>
    /**
     * In case the Shop12 was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Shop12UpdateInput, Shop12UncheckedUpdateInput>
  }

  /**
   * Shop12 delete
   */
  export type Shop12DeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop12
     */
    select?: Shop12Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop12
     */
    omit?: Shop12Omit<ExtArgs> | null
    /**
     * Filter which Shop12 to delete.
     */
    where: Shop12WhereUniqueInput
  }

  /**
   * Shop12 deleteMany
   */
  export type Shop12DeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shop12s to delete
     */
    where?: Shop12WhereInput
    /**
     * Limit how many Shop12s to delete.
     */
    limit?: number
  }

  /**
   * Shop12 without action
   */
  export type Shop12DefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop12
     */
    select?: Shop12Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop12
     */
    omit?: Shop12Omit<ExtArgs> | null
  }


  /**
   * Model Shop2
   */

  export type AggregateShop2 = {
    _count: Shop2CountAggregateOutputType | null
    _avg: Shop2AvgAggregateOutputType | null
    _sum: Shop2SumAggregateOutputType | null
    _min: Shop2MinAggregateOutputType | null
    _max: Shop2MaxAggregateOutputType | null
  }

  export type Shop2AvgAggregateOutputType = {
    id: number | null
    weight: number | null
    perMetVklCert: number | null
    perTioCert: number | null
    perH2oCert: number | null
    H2OWeight: number | null
    DryWeight: number | null
    MetalTon: number | null
    MinusMetal: number | null
    standart80Tio2: number | null
  }

  export type Shop2SumAggregateOutputType = {
    id: number | null
    weight: number | null
    perMetVklCert: number | null
    perTioCert: number | null
    perH2oCert: number | null
    H2OWeight: number | null
    DryWeight: number | null
    MetalTon: number | null
    MinusMetal: number | null
    standart80Tio2: number | null
  }

  export type Shop2MinAggregateOutputType = {
    id: number | null
    numberVagonOrTank: string | null
    weight: number | null
    perMetVklCert: number | null
    perTioCert: number | null
    perH2oCert: number | null
    H2OWeight: number | null
    DryWeight: number | null
    MetalTon: number | null
    MinusMetal: number | null
    standart80Tio2: number | null
    InvoiceDate: Date | null
    InvoiceNumber: string | null
    GtdDate: Date | null
    GtdNumber: string | null
    MiroDocument: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Shop2MaxAggregateOutputType = {
    id: number | null
    numberVagonOrTank: string | null
    weight: number | null
    perMetVklCert: number | null
    perTioCert: number | null
    perH2oCert: number | null
    H2OWeight: number | null
    DryWeight: number | null
    MetalTon: number | null
    MinusMetal: number | null
    standart80Tio2: number | null
    InvoiceDate: Date | null
    InvoiceNumber: string | null
    GtdDate: Date | null
    GtdNumber: string | null
    MiroDocument: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Shop2CountAggregateOutputType = {
    id: number
    numberVagonOrTank: number
    weight: number
    perMetVklCert: number
    perTioCert: number
    perH2oCert: number
    H2OWeight: number
    DryWeight: number
    MetalTon: number
    MinusMetal: number
    standart80Tio2: number
    InvoiceDate: number
    InvoiceNumber: number
    GtdDate: number
    GtdNumber: number
    MiroDocument: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Shop2AvgAggregateInputType = {
    id?: true
    weight?: true
    perMetVklCert?: true
    perTioCert?: true
    perH2oCert?: true
    H2OWeight?: true
    DryWeight?: true
    MetalTon?: true
    MinusMetal?: true
    standart80Tio2?: true
  }

  export type Shop2SumAggregateInputType = {
    id?: true
    weight?: true
    perMetVklCert?: true
    perTioCert?: true
    perH2oCert?: true
    H2OWeight?: true
    DryWeight?: true
    MetalTon?: true
    MinusMetal?: true
    standart80Tio2?: true
  }

  export type Shop2MinAggregateInputType = {
    id?: true
    numberVagonOrTank?: true
    weight?: true
    perMetVklCert?: true
    perTioCert?: true
    perH2oCert?: true
    H2OWeight?: true
    DryWeight?: true
    MetalTon?: true
    MinusMetal?: true
    standart80Tio2?: true
    InvoiceDate?: true
    InvoiceNumber?: true
    GtdDate?: true
    GtdNumber?: true
    MiroDocument?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Shop2MaxAggregateInputType = {
    id?: true
    numberVagonOrTank?: true
    weight?: true
    perMetVklCert?: true
    perTioCert?: true
    perH2oCert?: true
    H2OWeight?: true
    DryWeight?: true
    MetalTon?: true
    MinusMetal?: true
    standart80Tio2?: true
    InvoiceDate?: true
    InvoiceNumber?: true
    GtdDate?: true
    GtdNumber?: true
    MiroDocument?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Shop2CountAggregateInputType = {
    id?: true
    numberVagonOrTank?: true
    weight?: true
    perMetVklCert?: true
    perTioCert?: true
    perH2oCert?: true
    H2OWeight?: true
    DryWeight?: true
    MetalTon?: true
    MinusMetal?: true
    standart80Tio2?: true
    InvoiceDate?: true
    InvoiceNumber?: true
    GtdDate?: true
    GtdNumber?: true
    MiroDocument?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Shop2AggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shop2 to aggregate.
     */
    where?: Shop2WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shop2s to fetch.
     */
    orderBy?: Shop2OrderByWithRelationInput | Shop2OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Shop2WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shop2s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shop2s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Shop2s
    **/
    _count?: true | Shop2CountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Shop2AvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Shop2SumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Shop2MinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Shop2MaxAggregateInputType
  }

  export type GetShop2AggregateType<T extends Shop2AggregateArgs> = {
        [P in keyof T & keyof AggregateShop2]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShop2[P]>
      : GetScalarType<T[P], AggregateShop2[P]>
  }




  export type Shop2GroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Shop2WhereInput
    orderBy?: Shop2OrderByWithAggregationInput | Shop2OrderByWithAggregationInput[]
    by: Shop2ScalarFieldEnum[] | Shop2ScalarFieldEnum
    having?: Shop2ScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Shop2CountAggregateInputType | true
    _avg?: Shop2AvgAggregateInputType
    _sum?: Shop2SumAggregateInputType
    _min?: Shop2MinAggregateInputType
    _max?: Shop2MaxAggregateInputType
  }

  export type Shop2GroupByOutputType = {
    id: number
    numberVagonOrTank: string
    weight: number
    perMetVklCert: number
    perTioCert: number
    perH2oCert: number
    H2OWeight: number
    DryWeight: number
    MetalTon: number
    MinusMetal: number
    standart80Tio2: number
    InvoiceDate: Date
    InvoiceNumber: string
    GtdDate: Date
    GtdNumber: string
    MiroDocument: string
    createdAt: Date
    updatedAt: Date
    _count: Shop2CountAggregateOutputType | null
    _avg: Shop2AvgAggregateOutputType | null
    _sum: Shop2SumAggregateOutputType | null
    _min: Shop2MinAggregateOutputType | null
    _max: Shop2MaxAggregateOutputType | null
  }

  type GetShop2GroupByPayload<T extends Shop2GroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Shop2GroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Shop2GroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Shop2GroupByOutputType[P]>
            : GetScalarType<T[P], Shop2GroupByOutputType[P]>
        }
      >
    >


  export type Shop2Select<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numberVagonOrTank?: boolean
    weight?: boolean
    perMetVklCert?: boolean
    perTioCert?: boolean
    perH2oCert?: boolean
    H2OWeight?: boolean
    DryWeight?: boolean
    MetalTon?: boolean
    MinusMetal?: boolean
    standart80Tio2?: boolean
    InvoiceDate?: boolean
    InvoiceNumber?: boolean
    GtdDate?: boolean
    GtdNumber?: boolean
    MiroDocument?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["shop2"]>

  export type Shop2SelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numberVagonOrTank?: boolean
    weight?: boolean
    perMetVklCert?: boolean
    perTioCert?: boolean
    perH2oCert?: boolean
    H2OWeight?: boolean
    DryWeight?: boolean
    MetalTon?: boolean
    MinusMetal?: boolean
    standart80Tio2?: boolean
    InvoiceDate?: boolean
    InvoiceNumber?: boolean
    GtdDate?: boolean
    GtdNumber?: boolean
    MiroDocument?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["shop2"]>

  export type Shop2SelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numberVagonOrTank?: boolean
    weight?: boolean
    perMetVklCert?: boolean
    perTioCert?: boolean
    perH2oCert?: boolean
    H2OWeight?: boolean
    DryWeight?: boolean
    MetalTon?: boolean
    MinusMetal?: boolean
    standart80Tio2?: boolean
    InvoiceDate?: boolean
    InvoiceNumber?: boolean
    GtdDate?: boolean
    GtdNumber?: boolean
    MiroDocument?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["shop2"]>

  export type Shop2SelectScalar = {
    id?: boolean
    numberVagonOrTank?: boolean
    weight?: boolean
    perMetVklCert?: boolean
    perTioCert?: boolean
    perH2oCert?: boolean
    H2OWeight?: boolean
    DryWeight?: boolean
    MetalTon?: boolean
    MinusMetal?: boolean
    standart80Tio2?: boolean
    InvoiceDate?: boolean
    InvoiceNumber?: boolean
    GtdDate?: boolean
    GtdNumber?: boolean
    MiroDocument?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type Shop2Omit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numberVagonOrTank" | "weight" | "perMetVklCert" | "perTioCert" | "perH2oCert" | "H2OWeight" | "DryWeight" | "MetalTon" | "MinusMetal" | "standart80Tio2" | "InvoiceDate" | "InvoiceNumber" | "GtdDate" | "GtdNumber" | "MiroDocument" | "createdAt" | "updatedAt", ExtArgs["result"]["shop2"]>

  export type $Shop2Payload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Shop2"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      numberVagonOrTank: string
      weight: number
      perMetVklCert: number
      perTioCert: number
      perH2oCert: number
      H2OWeight: number
      DryWeight: number
      MetalTon: number
      MinusMetal: number
      standart80Tio2: number
      InvoiceDate: Date
      InvoiceNumber: string
      GtdDate: Date
      GtdNumber: string
      MiroDocument: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["shop2"]>
    composites: {}
  }

  type Shop2GetPayload<S extends boolean | null | undefined | Shop2DefaultArgs> = $Result.GetResult<Prisma.$Shop2Payload, S>

  type Shop2CountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Shop2FindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Shop2CountAggregateInputType | true
    }

  export interface Shop2Delegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Shop2'], meta: { name: 'Shop2' } }
    /**
     * Find zero or one Shop2 that matches the filter.
     * @param {Shop2FindUniqueArgs} args - Arguments to find a Shop2
     * @example
     * // Get one Shop2
     * const shop2 = await prisma.shop2.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Shop2FindUniqueArgs>(args: SelectSubset<T, Shop2FindUniqueArgs<ExtArgs>>): Prisma__Shop2Client<$Result.GetResult<Prisma.$Shop2Payload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Shop2 that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Shop2FindUniqueOrThrowArgs} args - Arguments to find a Shop2
     * @example
     * // Get one Shop2
     * const shop2 = await prisma.shop2.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Shop2FindUniqueOrThrowArgs>(args: SelectSubset<T, Shop2FindUniqueOrThrowArgs<ExtArgs>>): Prisma__Shop2Client<$Result.GetResult<Prisma.$Shop2Payload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shop2 that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shop2FindFirstArgs} args - Arguments to find a Shop2
     * @example
     * // Get one Shop2
     * const shop2 = await prisma.shop2.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Shop2FindFirstArgs>(args?: SelectSubset<T, Shop2FindFirstArgs<ExtArgs>>): Prisma__Shop2Client<$Result.GetResult<Prisma.$Shop2Payload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shop2 that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shop2FindFirstOrThrowArgs} args - Arguments to find a Shop2
     * @example
     * // Get one Shop2
     * const shop2 = await prisma.shop2.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Shop2FindFirstOrThrowArgs>(args?: SelectSubset<T, Shop2FindFirstOrThrowArgs<ExtArgs>>): Prisma__Shop2Client<$Result.GetResult<Prisma.$Shop2Payload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Shop2s that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shop2FindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shop2s
     * const shop2s = await prisma.shop2.findMany()
     * 
     * // Get first 10 Shop2s
     * const shop2s = await prisma.shop2.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shop2WithIdOnly = await prisma.shop2.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Shop2FindManyArgs>(args?: SelectSubset<T, Shop2FindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Shop2Payload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Shop2.
     * @param {Shop2CreateArgs} args - Arguments to create a Shop2.
     * @example
     * // Create one Shop2
     * const Shop2 = await prisma.shop2.create({
     *   data: {
     *     // ... data to create a Shop2
     *   }
     * })
     * 
     */
    create<T extends Shop2CreateArgs>(args: SelectSubset<T, Shop2CreateArgs<ExtArgs>>): Prisma__Shop2Client<$Result.GetResult<Prisma.$Shop2Payload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Shop2s.
     * @param {Shop2CreateManyArgs} args - Arguments to create many Shop2s.
     * @example
     * // Create many Shop2s
     * const shop2 = await prisma.shop2.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Shop2CreateManyArgs>(args?: SelectSubset<T, Shop2CreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Shop2s and returns the data saved in the database.
     * @param {Shop2CreateManyAndReturnArgs} args - Arguments to create many Shop2s.
     * @example
     * // Create many Shop2s
     * const shop2 = await prisma.shop2.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Shop2s and only return the `id`
     * const shop2WithIdOnly = await prisma.shop2.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Shop2CreateManyAndReturnArgs>(args?: SelectSubset<T, Shop2CreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Shop2Payload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Shop2.
     * @param {Shop2DeleteArgs} args - Arguments to delete one Shop2.
     * @example
     * // Delete one Shop2
     * const Shop2 = await prisma.shop2.delete({
     *   where: {
     *     // ... filter to delete one Shop2
     *   }
     * })
     * 
     */
    delete<T extends Shop2DeleteArgs>(args: SelectSubset<T, Shop2DeleteArgs<ExtArgs>>): Prisma__Shop2Client<$Result.GetResult<Prisma.$Shop2Payload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Shop2.
     * @param {Shop2UpdateArgs} args - Arguments to update one Shop2.
     * @example
     * // Update one Shop2
     * const shop2 = await prisma.shop2.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Shop2UpdateArgs>(args: SelectSubset<T, Shop2UpdateArgs<ExtArgs>>): Prisma__Shop2Client<$Result.GetResult<Prisma.$Shop2Payload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Shop2s.
     * @param {Shop2DeleteManyArgs} args - Arguments to filter Shop2s to delete.
     * @example
     * // Delete a few Shop2s
     * const { count } = await prisma.shop2.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Shop2DeleteManyArgs>(args?: SelectSubset<T, Shop2DeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shop2s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shop2UpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shop2s
     * const shop2 = await prisma.shop2.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Shop2UpdateManyArgs>(args: SelectSubset<T, Shop2UpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shop2s and returns the data updated in the database.
     * @param {Shop2UpdateManyAndReturnArgs} args - Arguments to update many Shop2s.
     * @example
     * // Update many Shop2s
     * const shop2 = await prisma.shop2.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Shop2s and only return the `id`
     * const shop2WithIdOnly = await prisma.shop2.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends Shop2UpdateManyAndReturnArgs>(args: SelectSubset<T, Shop2UpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Shop2Payload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Shop2.
     * @param {Shop2UpsertArgs} args - Arguments to update or create a Shop2.
     * @example
     * // Update or create a Shop2
     * const shop2 = await prisma.shop2.upsert({
     *   create: {
     *     // ... data to create a Shop2
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shop2 we want to update
     *   }
     * })
     */
    upsert<T extends Shop2UpsertArgs>(args: SelectSubset<T, Shop2UpsertArgs<ExtArgs>>): Prisma__Shop2Client<$Result.GetResult<Prisma.$Shop2Payload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Shop2s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shop2CountArgs} args - Arguments to filter Shop2s to count.
     * @example
     * // Count the number of Shop2s
     * const count = await prisma.shop2.count({
     *   where: {
     *     // ... the filter for the Shop2s we want to count
     *   }
     * })
    **/
    count<T extends Shop2CountArgs>(
      args?: Subset<T, Shop2CountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Shop2CountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shop2.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shop2AggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Shop2AggregateArgs>(args: Subset<T, Shop2AggregateArgs>): Prisma.PrismaPromise<GetShop2AggregateType<T>>

    /**
     * Group by Shop2.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shop2GroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Shop2GroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Shop2GroupByArgs['orderBy'] }
        : { orderBy?: Shop2GroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Shop2GroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShop2GroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Shop2 model
   */
  readonly fields: Shop2FieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Shop2.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Shop2Client<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Shop2 model
   */
  interface Shop2FieldRefs {
    readonly id: FieldRef<"Shop2", 'Int'>
    readonly numberVagonOrTank: FieldRef<"Shop2", 'String'>
    readonly weight: FieldRef<"Shop2", 'Float'>
    readonly perMetVklCert: FieldRef<"Shop2", 'Float'>
    readonly perTioCert: FieldRef<"Shop2", 'Float'>
    readonly perH2oCert: FieldRef<"Shop2", 'Float'>
    readonly H2OWeight: FieldRef<"Shop2", 'Float'>
    readonly DryWeight: FieldRef<"Shop2", 'Float'>
    readonly MetalTon: FieldRef<"Shop2", 'Float'>
    readonly MinusMetal: FieldRef<"Shop2", 'Float'>
    readonly standart80Tio2: FieldRef<"Shop2", 'Float'>
    readonly InvoiceDate: FieldRef<"Shop2", 'DateTime'>
    readonly InvoiceNumber: FieldRef<"Shop2", 'String'>
    readonly GtdDate: FieldRef<"Shop2", 'DateTime'>
    readonly GtdNumber: FieldRef<"Shop2", 'String'>
    readonly MiroDocument: FieldRef<"Shop2", 'String'>
    readonly createdAt: FieldRef<"Shop2", 'DateTime'>
    readonly updatedAt: FieldRef<"Shop2", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Shop2 findUnique
   */
  export type Shop2FindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop2
     */
    select?: Shop2Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop2
     */
    omit?: Shop2Omit<ExtArgs> | null
    /**
     * Filter, which Shop2 to fetch.
     */
    where: Shop2WhereUniqueInput
  }

  /**
   * Shop2 findUniqueOrThrow
   */
  export type Shop2FindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop2
     */
    select?: Shop2Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop2
     */
    omit?: Shop2Omit<ExtArgs> | null
    /**
     * Filter, which Shop2 to fetch.
     */
    where: Shop2WhereUniqueInput
  }

  /**
   * Shop2 findFirst
   */
  export type Shop2FindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop2
     */
    select?: Shop2Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop2
     */
    omit?: Shop2Omit<ExtArgs> | null
    /**
     * Filter, which Shop2 to fetch.
     */
    where?: Shop2WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shop2s to fetch.
     */
    orderBy?: Shop2OrderByWithRelationInput | Shop2OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shop2s.
     */
    cursor?: Shop2WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shop2s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shop2s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shop2s.
     */
    distinct?: Shop2ScalarFieldEnum | Shop2ScalarFieldEnum[]
  }

  /**
   * Shop2 findFirstOrThrow
   */
  export type Shop2FindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop2
     */
    select?: Shop2Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop2
     */
    omit?: Shop2Omit<ExtArgs> | null
    /**
     * Filter, which Shop2 to fetch.
     */
    where?: Shop2WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shop2s to fetch.
     */
    orderBy?: Shop2OrderByWithRelationInput | Shop2OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shop2s.
     */
    cursor?: Shop2WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shop2s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shop2s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shop2s.
     */
    distinct?: Shop2ScalarFieldEnum | Shop2ScalarFieldEnum[]
  }

  /**
   * Shop2 findMany
   */
  export type Shop2FindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop2
     */
    select?: Shop2Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop2
     */
    omit?: Shop2Omit<ExtArgs> | null
    /**
     * Filter, which Shop2s to fetch.
     */
    where?: Shop2WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shop2s to fetch.
     */
    orderBy?: Shop2OrderByWithRelationInput | Shop2OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Shop2s.
     */
    cursor?: Shop2WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shop2s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shop2s.
     */
    skip?: number
    distinct?: Shop2ScalarFieldEnum | Shop2ScalarFieldEnum[]
  }

  /**
   * Shop2 create
   */
  export type Shop2CreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop2
     */
    select?: Shop2Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop2
     */
    omit?: Shop2Omit<ExtArgs> | null
    /**
     * The data needed to create a Shop2.
     */
    data: XOR<Shop2CreateInput, Shop2UncheckedCreateInput>
  }

  /**
   * Shop2 createMany
   */
  export type Shop2CreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Shop2s.
     */
    data: Shop2CreateManyInput | Shop2CreateManyInput[]
  }

  /**
   * Shop2 createManyAndReturn
   */
  export type Shop2CreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop2
     */
    select?: Shop2SelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shop2
     */
    omit?: Shop2Omit<ExtArgs> | null
    /**
     * The data used to create many Shop2s.
     */
    data: Shop2CreateManyInput | Shop2CreateManyInput[]
  }

  /**
   * Shop2 update
   */
  export type Shop2UpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop2
     */
    select?: Shop2Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop2
     */
    omit?: Shop2Omit<ExtArgs> | null
    /**
     * The data needed to update a Shop2.
     */
    data: XOR<Shop2UpdateInput, Shop2UncheckedUpdateInput>
    /**
     * Choose, which Shop2 to update.
     */
    where: Shop2WhereUniqueInput
  }

  /**
   * Shop2 updateMany
   */
  export type Shop2UpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Shop2s.
     */
    data: XOR<Shop2UpdateManyMutationInput, Shop2UncheckedUpdateManyInput>
    /**
     * Filter which Shop2s to update
     */
    where?: Shop2WhereInput
    /**
     * Limit how many Shop2s to update.
     */
    limit?: number
  }

  /**
   * Shop2 updateManyAndReturn
   */
  export type Shop2UpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop2
     */
    select?: Shop2SelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shop2
     */
    omit?: Shop2Omit<ExtArgs> | null
    /**
     * The data used to update Shop2s.
     */
    data: XOR<Shop2UpdateManyMutationInput, Shop2UncheckedUpdateManyInput>
    /**
     * Filter which Shop2s to update
     */
    where?: Shop2WhereInput
    /**
     * Limit how many Shop2s to update.
     */
    limit?: number
  }

  /**
   * Shop2 upsert
   */
  export type Shop2UpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop2
     */
    select?: Shop2Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop2
     */
    omit?: Shop2Omit<ExtArgs> | null
    /**
     * The filter to search for the Shop2 to update in case it exists.
     */
    where: Shop2WhereUniqueInput
    /**
     * In case the Shop2 found by the `where` argument doesn't exist, create a new Shop2 with this data.
     */
    create: XOR<Shop2CreateInput, Shop2UncheckedCreateInput>
    /**
     * In case the Shop2 was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Shop2UpdateInput, Shop2UncheckedUpdateInput>
  }

  /**
   * Shop2 delete
   */
  export type Shop2DeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop2
     */
    select?: Shop2Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop2
     */
    omit?: Shop2Omit<ExtArgs> | null
    /**
     * Filter which Shop2 to delete.
     */
    where: Shop2WhereUniqueInput
  }

  /**
   * Shop2 deleteMany
   */
  export type Shop2DeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shop2s to delete
     */
    where?: Shop2WhereInput
    /**
     * Limit how many Shop2s to delete.
     */
    limit?: number
  }

  /**
   * Shop2 without action
   */
  export type Shop2DefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop2
     */
    select?: Shop2Select<ExtArgs> | null
    /**
     * Omit specific fields from the Shop2
     */
    omit?: Shop2Omit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Shop12ScalarFieldEnum: {
    id: 'id',
    vagonNumber: 'vagonNumber',
    weight: 'weight',
    tio2Analysis: 'tio2Analysis',
    h2oAnalysis: 'h2oAnalysis',
    recalculatedWeight: 'recalculatedWeight',
    InvoiceDate: 'InvoiceDate',
    InvoiceNumber: 'InvoiceNumber',
    GtdDate: 'GtdDate',
    GtdNumber: 'GtdNumber',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Shop12ScalarFieldEnum = (typeof Shop12ScalarFieldEnum)[keyof typeof Shop12ScalarFieldEnum]


  export const Shop2ScalarFieldEnum: {
    id: 'id',
    numberVagonOrTank: 'numberVagonOrTank',
    weight: 'weight',
    perMetVklCert: 'perMetVklCert',
    perTioCert: 'perTioCert',
    perH2oCert: 'perH2oCert',
    H2OWeight: 'H2OWeight',
    DryWeight: 'DryWeight',
    MetalTon: 'MetalTon',
    MinusMetal: 'MinusMetal',
    standart80Tio2: 'standart80Tio2',
    InvoiceDate: 'InvoiceDate',
    InvoiceNumber: 'InvoiceNumber',
    GtdDate: 'GtdDate',
    GtdNumber: 'GtdNumber',
    MiroDocument: 'MiroDocument',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Shop2ScalarFieldEnum = (typeof Shop2ScalarFieldEnum)[keyof typeof Shop2ScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    
  /**
   * Deep Input Types
   */


  export type Shop12WhereInput = {
    AND?: Shop12WhereInput | Shop12WhereInput[]
    OR?: Shop12WhereInput[]
    NOT?: Shop12WhereInput | Shop12WhereInput[]
    id?: IntFilter<"Shop12"> | number
    vagonNumber?: StringFilter<"Shop12"> | string
    weight?: FloatFilter<"Shop12"> | number
    tio2Analysis?: FloatFilter<"Shop12"> | number
    h2oAnalysis?: FloatFilter<"Shop12"> | number
    recalculatedWeight?: FloatFilter<"Shop12"> | number
    InvoiceDate?: DateTimeFilter<"Shop12"> | Date | string
    InvoiceNumber?: StringFilter<"Shop12"> | string
    GtdDate?: DateTimeFilter<"Shop12"> | Date | string
    GtdNumber?: StringFilter<"Shop12"> | string
    createdAt?: DateTimeFilter<"Shop12"> | Date | string
    updatedAt?: DateTimeFilter<"Shop12"> | Date | string
  }

  export type Shop12OrderByWithRelationInput = {
    id?: SortOrder
    vagonNumber?: SortOrder
    weight?: SortOrder
    tio2Analysis?: SortOrder
    h2oAnalysis?: SortOrder
    recalculatedWeight?: SortOrder
    InvoiceDate?: SortOrder
    InvoiceNumber?: SortOrder
    GtdDate?: SortOrder
    GtdNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type Shop12WhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: Shop12WhereInput | Shop12WhereInput[]
    OR?: Shop12WhereInput[]
    NOT?: Shop12WhereInput | Shop12WhereInput[]
    vagonNumber?: StringFilter<"Shop12"> | string
    weight?: FloatFilter<"Shop12"> | number
    tio2Analysis?: FloatFilter<"Shop12"> | number
    h2oAnalysis?: FloatFilter<"Shop12"> | number
    recalculatedWeight?: FloatFilter<"Shop12"> | number
    InvoiceDate?: DateTimeFilter<"Shop12"> | Date | string
    InvoiceNumber?: StringFilter<"Shop12"> | string
    GtdDate?: DateTimeFilter<"Shop12"> | Date | string
    GtdNumber?: StringFilter<"Shop12"> | string
    createdAt?: DateTimeFilter<"Shop12"> | Date | string
    updatedAt?: DateTimeFilter<"Shop12"> | Date | string
  }, "id">

  export type Shop12OrderByWithAggregationInput = {
    id?: SortOrder
    vagonNumber?: SortOrder
    weight?: SortOrder
    tio2Analysis?: SortOrder
    h2oAnalysis?: SortOrder
    recalculatedWeight?: SortOrder
    InvoiceDate?: SortOrder
    InvoiceNumber?: SortOrder
    GtdDate?: SortOrder
    GtdNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: Shop12CountOrderByAggregateInput
    _avg?: Shop12AvgOrderByAggregateInput
    _max?: Shop12MaxOrderByAggregateInput
    _min?: Shop12MinOrderByAggregateInput
    _sum?: Shop12SumOrderByAggregateInput
  }

  export type Shop12ScalarWhereWithAggregatesInput = {
    AND?: Shop12ScalarWhereWithAggregatesInput | Shop12ScalarWhereWithAggregatesInput[]
    OR?: Shop12ScalarWhereWithAggregatesInput[]
    NOT?: Shop12ScalarWhereWithAggregatesInput | Shop12ScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Shop12"> | number
    vagonNumber?: StringWithAggregatesFilter<"Shop12"> | string
    weight?: FloatWithAggregatesFilter<"Shop12"> | number
    tio2Analysis?: FloatWithAggregatesFilter<"Shop12"> | number
    h2oAnalysis?: FloatWithAggregatesFilter<"Shop12"> | number
    recalculatedWeight?: FloatWithAggregatesFilter<"Shop12"> | number
    InvoiceDate?: DateTimeWithAggregatesFilter<"Shop12"> | Date | string
    InvoiceNumber?: StringWithAggregatesFilter<"Shop12"> | string
    GtdDate?: DateTimeWithAggregatesFilter<"Shop12"> | Date | string
    GtdNumber?: StringWithAggregatesFilter<"Shop12"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Shop12"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Shop12"> | Date | string
  }

  export type Shop2WhereInput = {
    AND?: Shop2WhereInput | Shop2WhereInput[]
    OR?: Shop2WhereInput[]
    NOT?: Shop2WhereInput | Shop2WhereInput[]
    id?: IntFilter<"Shop2"> | number
    numberVagonOrTank?: StringFilter<"Shop2"> | string
    weight?: FloatFilter<"Shop2"> | number
    perMetVklCert?: FloatFilter<"Shop2"> | number
    perTioCert?: FloatFilter<"Shop2"> | number
    perH2oCert?: FloatFilter<"Shop2"> | number
    H2OWeight?: FloatFilter<"Shop2"> | number
    DryWeight?: FloatFilter<"Shop2"> | number
    MetalTon?: FloatFilter<"Shop2"> | number
    MinusMetal?: FloatFilter<"Shop2"> | number
    standart80Tio2?: FloatFilter<"Shop2"> | number
    InvoiceDate?: DateTimeFilter<"Shop2"> | Date | string
    InvoiceNumber?: StringFilter<"Shop2"> | string
    GtdDate?: DateTimeFilter<"Shop2"> | Date | string
    GtdNumber?: StringFilter<"Shop2"> | string
    MiroDocument?: StringFilter<"Shop2"> | string
    createdAt?: DateTimeFilter<"Shop2"> | Date | string
    updatedAt?: DateTimeFilter<"Shop2"> | Date | string
  }

  export type Shop2OrderByWithRelationInput = {
    id?: SortOrder
    numberVagonOrTank?: SortOrder
    weight?: SortOrder
    perMetVklCert?: SortOrder
    perTioCert?: SortOrder
    perH2oCert?: SortOrder
    H2OWeight?: SortOrder
    DryWeight?: SortOrder
    MetalTon?: SortOrder
    MinusMetal?: SortOrder
    standart80Tio2?: SortOrder
    InvoiceDate?: SortOrder
    InvoiceNumber?: SortOrder
    GtdDate?: SortOrder
    GtdNumber?: SortOrder
    MiroDocument?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type Shop2WhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: Shop2WhereInput | Shop2WhereInput[]
    OR?: Shop2WhereInput[]
    NOT?: Shop2WhereInput | Shop2WhereInput[]
    numberVagonOrTank?: StringFilter<"Shop2"> | string
    weight?: FloatFilter<"Shop2"> | number
    perMetVklCert?: FloatFilter<"Shop2"> | number
    perTioCert?: FloatFilter<"Shop2"> | number
    perH2oCert?: FloatFilter<"Shop2"> | number
    H2OWeight?: FloatFilter<"Shop2"> | number
    DryWeight?: FloatFilter<"Shop2"> | number
    MetalTon?: FloatFilter<"Shop2"> | number
    MinusMetal?: FloatFilter<"Shop2"> | number
    standart80Tio2?: FloatFilter<"Shop2"> | number
    InvoiceDate?: DateTimeFilter<"Shop2"> | Date | string
    InvoiceNumber?: StringFilter<"Shop2"> | string
    GtdDate?: DateTimeFilter<"Shop2"> | Date | string
    GtdNumber?: StringFilter<"Shop2"> | string
    MiroDocument?: StringFilter<"Shop2"> | string
    createdAt?: DateTimeFilter<"Shop2"> | Date | string
    updatedAt?: DateTimeFilter<"Shop2"> | Date | string
  }, "id">

  export type Shop2OrderByWithAggregationInput = {
    id?: SortOrder
    numberVagonOrTank?: SortOrder
    weight?: SortOrder
    perMetVklCert?: SortOrder
    perTioCert?: SortOrder
    perH2oCert?: SortOrder
    H2OWeight?: SortOrder
    DryWeight?: SortOrder
    MetalTon?: SortOrder
    MinusMetal?: SortOrder
    standart80Tio2?: SortOrder
    InvoiceDate?: SortOrder
    InvoiceNumber?: SortOrder
    GtdDate?: SortOrder
    GtdNumber?: SortOrder
    MiroDocument?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: Shop2CountOrderByAggregateInput
    _avg?: Shop2AvgOrderByAggregateInput
    _max?: Shop2MaxOrderByAggregateInput
    _min?: Shop2MinOrderByAggregateInput
    _sum?: Shop2SumOrderByAggregateInput
  }

  export type Shop2ScalarWhereWithAggregatesInput = {
    AND?: Shop2ScalarWhereWithAggregatesInput | Shop2ScalarWhereWithAggregatesInput[]
    OR?: Shop2ScalarWhereWithAggregatesInput[]
    NOT?: Shop2ScalarWhereWithAggregatesInput | Shop2ScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Shop2"> | number
    numberVagonOrTank?: StringWithAggregatesFilter<"Shop2"> | string
    weight?: FloatWithAggregatesFilter<"Shop2"> | number
    perMetVklCert?: FloatWithAggregatesFilter<"Shop2"> | number
    perTioCert?: FloatWithAggregatesFilter<"Shop2"> | number
    perH2oCert?: FloatWithAggregatesFilter<"Shop2"> | number
    H2OWeight?: FloatWithAggregatesFilter<"Shop2"> | number
    DryWeight?: FloatWithAggregatesFilter<"Shop2"> | number
    MetalTon?: FloatWithAggregatesFilter<"Shop2"> | number
    MinusMetal?: FloatWithAggregatesFilter<"Shop2"> | number
    standart80Tio2?: FloatWithAggregatesFilter<"Shop2"> | number
    InvoiceDate?: DateTimeWithAggregatesFilter<"Shop2"> | Date | string
    InvoiceNumber?: StringWithAggregatesFilter<"Shop2"> | string
    GtdDate?: DateTimeWithAggregatesFilter<"Shop2"> | Date | string
    GtdNumber?: StringWithAggregatesFilter<"Shop2"> | string
    MiroDocument?: StringWithAggregatesFilter<"Shop2"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Shop2"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Shop2"> | Date | string
  }

  export type Shop12CreateInput = {
    vagonNumber: string
    weight: number
    tio2Analysis: number
    h2oAnalysis: number
    recalculatedWeight: number
    InvoiceDate: Date | string
    InvoiceNumber: string
    GtdDate: Date | string
    GtdNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Shop12UncheckedCreateInput = {
    id?: number
    vagonNumber: string
    weight: number
    tio2Analysis: number
    h2oAnalysis: number
    recalculatedWeight: number
    InvoiceDate: Date | string
    InvoiceNumber: string
    GtdDate: Date | string
    GtdNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Shop12UpdateInput = {
    vagonNumber?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    tio2Analysis?: FloatFieldUpdateOperationsInput | number
    h2oAnalysis?: FloatFieldUpdateOperationsInput | number
    recalculatedWeight?: FloatFieldUpdateOperationsInput | number
    InvoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    InvoiceNumber?: StringFieldUpdateOperationsInput | string
    GtdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    GtdNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Shop12UncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    vagonNumber?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    tio2Analysis?: FloatFieldUpdateOperationsInput | number
    h2oAnalysis?: FloatFieldUpdateOperationsInput | number
    recalculatedWeight?: FloatFieldUpdateOperationsInput | number
    InvoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    InvoiceNumber?: StringFieldUpdateOperationsInput | string
    GtdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    GtdNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Shop12CreateManyInput = {
    id?: number
    vagonNumber: string
    weight: number
    tio2Analysis: number
    h2oAnalysis: number
    recalculatedWeight: number
    InvoiceDate: Date | string
    InvoiceNumber: string
    GtdDate: Date | string
    GtdNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Shop12UpdateManyMutationInput = {
    vagonNumber?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    tio2Analysis?: FloatFieldUpdateOperationsInput | number
    h2oAnalysis?: FloatFieldUpdateOperationsInput | number
    recalculatedWeight?: FloatFieldUpdateOperationsInput | number
    InvoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    InvoiceNumber?: StringFieldUpdateOperationsInput | string
    GtdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    GtdNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Shop12UncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    vagonNumber?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    tio2Analysis?: FloatFieldUpdateOperationsInput | number
    h2oAnalysis?: FloatFieldUpdateOperationsInput | number
    recalculatedWeight?: FloatFieldUpdateOperationsInput | number
    InvoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    InvoiceNumber?: StringFieldUpdateOperationsInput | string
    GtdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    GtdNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Shop2CreateInput = {
    numberVagonOrTank: string
    weight: number
    perMetVklCert: number
    perTioCert: number
    perH2oCert: number
    H2OWeight: number
    DryWeight: number
    MetalTon: number
    MinusMetal: number
    standart80Tio2: number
    InvoiceDate: Date | string
    InvoiceNumber: string
    GtdDate: Date | string
    GtdNumber: string
    MiroDocument: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Shop2UncheckedCreateInput = {
    id?: number
    numberVagonOrTank: string
    weight: number
    perMetVklCert: number
    perTioCert: number
    perH2oCert: number
    H2OWeight: number
    DryWeight: number
    MetalTon: number
    MinusMetal: number
    standart80Tio2: number
    InvoiceDate: Date | string
    InvoiceNumber: string
    GtdDate: Date | string
    GtdNumber: string
    MiroDocument: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Shop2UpdateInput = {
    numberVagonOrTank?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    perMetVklCert?: FloatFieldUpdateOperationsInput | number
    perTioCert?: FloatFieldUpdateOperationsInput | number
    perH2oCert?: FloatFieldUpdateOperationsInput | number
    H2OWeight?: FloatFieldUpdateOperationsInput | number
    DryWeight?: FloatFieldUpdateOperationsInput | number
    MetalTon?: FloatFieldUpdateOperationsInput | number
    MinusMetal?: FloatFieldUpdateOperationsInput | number
    standart80Tio2?: FloatFieldUpdateOperationsInput | number
    InvoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    InvoiceNumber?: StringFieldUpdateOperationsInput | string
    GtdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    GtdNumber?: StringFieldUpdateOperationsInput | string
    MiroDocument?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Shop2UncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    numberVagonOrTank?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    perMetVklCert?: FloatFieldUpdateOperationsInput | number
    perTioCert?: FloatFieldUpdateOperationsInput | number
    perH2oCert?: FloatFieldUpdateOperationsInput | number
    H2OWeight?: FloatFieldUpdateOperationsInput | number
    DryWeight?: FloatFieldUpdateOperationsInput | number
    MetalTon?: FloatFieldUpdateOperationsInput | number
    MinusMetal?: FloatFieldUpdateOperationsInput | number
    standart80Tio2?: FloatFieldUpdateOperationsInput | number
    InvoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    InvoiceNumber?: StringFieldUpdateOperationsInput | string
    GtdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    GtdNumber?: StringFieldUpdateOperationsInput | string
    MiroDocument?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Shop2CreateManyInput = {
    id?: number
    numberVagonOrTank: string
    weight: number
    perMetVklCert: number
    perTioCert: number
    perH2oCert: number
    H2OWeight: number
    DryWeight: number
    MetalTon: number
    MinusMetal: number
    standart80Tio2: number
    InvoiceDate: Date | string
    InvoiceNumber: string
    GtdDate: Date | string
    GtdNumber: string
    MiroDocument: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Shop2UpdateManyMutationInput = {
    numberVagonOrTank?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    perMetVklCert?: FloatFieldUpdateOperationsInput | number
    perTioCert?: FloatFieldUpdateOperationsInput | number
    perH2oCert?: FloatFieldUpdateOperationsInput | number
    H2OWeight?: FloatFieldUpdateOperationsInput | number
    DryWeight?: FloatFieldUpdateOperationsInput | number
    MetalTon?: FloatFieldUpdateOperationsInput | number
    MinusMetal?: FloatFieldUpdateOperationsInput | number
    standart80Tio2?: FloatFieldUpdateOperationsInput | number
    InvoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    InvoiceNumber?: StringFieldUpdateOperationsInput | string
    GtdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    GtdNumber?: StringFieldUpdateOperationsInput | string
    MiroDocument?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Shop2UncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    numberVagonOrTank?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    perMetVklCert?: FloatFieldUpdateOperationsInput | number
    perTioCert?: FloatFieldUpdateOperationsInput | number
    perH2oCert?: FloatFieldUpdateOperationsInput | number
    H2OWeight?: FloatFieldUpdateOperationsInput | number
    DryWeight?: FloatFieldUpdateOperationsInput | number
    MetalTon?: FloatFieldUpdateOperationsInput | number
    MinusMetal?: FloatFieldUpdateOperationsInput | number
    standart80Tio2?: FloatFieldUpdateOperationsInput | number
    InvoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    InvoiceNumber?: StringFieldUpdateOperationsInput | string
    GtdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    GtdNumber?: StringFieldUpdateOperationsInput | string
    MiroDocument?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type Shop12CountOrderByAggregateInput = {
    id?: SortOrder
    vagonNumber?: SortOrder
    weight?: SortOrder
    tio2Analysis?: SortOrder
    h2oAnalysis?: SortOrder
    recalculatedWeight?: SortOrder
    InvoiceDate?: SortOrder
    InvoiceNumber?: SortOrder
    GtdDate?: SortOrder
    GtdNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type Shop12AvgOrderByAggregateInput = {
    id?: SortOrder
    weight?: SortOrder
    tio2Analysis?: SortOrder
    h2oAnalysis?: SortOrder
    recalculatedWeight?: SortOrder
  }

  export type Shop12MaxOrderByAggregateInput = {
    id?: SortOrder
    vagonNumber?: SortOrder
    weight?: SortOrder
    tio2Analysis?: SortOrder
    h2oAnalysis?: SortOrder
    recalculatedWeight?: SortOrder
    InvoiceDate?: SortOrder
    InvoiceNumber?: SortOrder
    GtdDate?: SortOrder
    GtdNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type Shop12MinOrderByAggregateInput = {
    id?: SortOrder
    vagonNumber?: SortOrder
    weight?: SortOrder
    tio2Analysis?: SortOrder
    h2oAnalysis?: SortOrder
    recalculatedWeight?: SortOrder
    InvoiceDate?: SortOrder
    InvoiceNumber?: SortOrder
    GtdDate?: SortOrder
    GtdNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type Shop12SumOrderByAggregateInput = {
    id?: SortOrder
    weight?: SortOrder
    tio2Analysis?: SortOrder
    h2oAnalysis?: SortOrder
    recalculatedWeight?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Shop2CountOrderByAggregateInput = {
    id?: SortOrder
    numberVagonOrTank?: SortOrder
    weight?: SortOrder
    perMetVklCert?: SortOrder
    perTioCert?: SortOrder
    perH2oCert?: SortOrder
    H2OWeight?: SortOrder
    DryWeight?: SortOrder
    MetalTon?: SortOrder
    MinusMetal?: SortOrder
    standart80Tio2?: SortOrder
    InvoiceDate?: SortOrder
    InvoiceNumber?: SortOrder
    GtdDate?: SortOrder
    GtdNumber?: SortOrder
    MiroDocument?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type Shop2AvgOrderByAggregateInput = {
    id?: SortOrder
    weight?: SortOrder
    perMetVklCert?: SortOrder
    perTioCert?: SortOrder
    perH2oCert?: SortOrder
    H2OWeight?: SortOrder
    DryWeight?: SortOrder
    MetalTon?: SortOrder
    MinusMetal?: SortOrder
    standart80Tio2?: SortOrder
  }

  export type Shop2MaxOrderByAggregateInput = {
    id?: SortOrder
    numberVagonOrTank?: SortOrder
    weight?: SortOrder
    perMetVklCert?: SortOrder
    perTioCert?: SortOrder
    perH2oCert?: SortOrder
    H2OWeight?: SortOrder
    DryWeight?: SortOrder
    MetalTon?: SortOrder
    MinusMetal?: SortOrder
    standart80Tio2?: SortOrder
    InvoiceDate?: SortOrder
    InvoiceNumber?: SortOrder
    GtdDate?: SortOrder
    GtdNumber?: SortOrder
    MiroDocument?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type Shop2MinOrderByAggregateInput = {
    id?: SortOrder
    numberVagonOrTank?: SortOrder
    weight?: SortOrder
    perMetVklCert?: SortOrder
    perTioCert?: SortOrder
    perH2oCert?: SortOrder
    H2OWeight?: SortOrder
    DryWeight?: SortOrder
    MetalTon?: SortOrder
    MinusMetal?: SortOrder
    standart80Tio2?: SortOrder
    InvoiceDate?: SortOrder
    InvoiceNumber?: SortOrder
    GtdDate?: SortOrder
    GtdNumber?: SortOrder
    MiroDocument?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type Shop2SumOrderByAggregateInput = {
    id?: SortOrder
    weight?: SortOrder
    perMetVklCert?: SortOrder
    perTioCert?: SortOrder
    perH2oCert?: SortOrder
    H2OWeight?: SortOrder
    DryWeight?: SortOrder
    MetalTon?: SortOrder
    MinusMetal?: SortOrder
    standart80Tio2?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}