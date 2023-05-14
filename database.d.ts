declare module "*.json" {
    const value: {
      host: string;
      port: number;
      database: string;
      username: string;
      password: string;
    };
    export default value;
  }

declare module 'db-migrate' {
    export declare function getInstance(isModule: boolean)
    export declare function down(specification: string)
    export declare function up(specification: string)
    export declare function reset()
}