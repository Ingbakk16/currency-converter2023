export interface CurrencyForDisplay {
    currencyId: any;
    currencyName: string;
    currencyMemo: string;
    symbol: string;
    value: number;
}


export interface CurrencyConversionDto {
    SourceCurrencyId: number;
    TargetCurrencyId: number;
    Amount: number;
  }


  export interface CurrencyForCreationDto {

    currencyName: string;
    currencyMemo: string;
    symbol: string;
    value: number;
}