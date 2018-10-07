declare const InquirerHelpers: {
    FULLSCREEN: boolean;
    PAGE_SIZE: number;
    CLI_WIDTH: number;
    _cliWidth(): any;
    _cliPageSize(): number;
    confirm(message: string, fallback?: boolean): Promise<boolean>;
    noYes(message: string): Promise<boolean>;
    yesNo(message: string): Promise<boolean>;
    input(message: string, fallback?: any): Promise<any>;
    list(message: string, list: any[], fallback?: any): Promise<any>;
    checkbox(message: string, list: any[], fallback?: any): Promise<any>;
    table(message: string, table: string[][], values: any[], colors?: any[], fallback?: any): Promise<any>;
};
export default InquirerHelpers;
