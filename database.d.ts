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