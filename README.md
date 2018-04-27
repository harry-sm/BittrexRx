# BittrexRx

BittrexRx is an Reactive library that was built with TypeScript for the [Bittrex](https://bittrex.com/) API which runs on the node.js platform. I built this library because I couldn't find any other library that uses [rxjs](https://github.com/Reactive-Extensions/RxJS).

---
[![npm version](https://badge.fury.io/js/bittrex-rx.svg)](https://badge.fury.io/js/bittrex-rx)
[![npm downloads](https://img.shields.io/npm/dt/bittrex-rx.svg)](https://www.npmjs.com/package/bittrex-rx)
[![Build Status](https://api.travis-ci.org/harry-sm/BittrexRx.svg?branch=master)](https://travis-ci.org/harry-sm/BittrexRx)
[![Renovate badge](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![David](https://img.shields.io/david/harry-sm/BittrexRx.svg)](https://david-dm.org/harry-sm/bittrexRx)

---



## My Other API Clients

- [CobinhoodRx](https://github.com/harry-sm/CobinhoodRx) (Typescript)  - API client for the [Cobinhood](https://cobinhood.com/) Exchange.
- [BittrexRxSharp]( https://github.com/harry-sm/BittrexRxSharp) (C#)




## Basic Usage

`npm install bittrex-rx --save`

Include in your project

```js
import {
    BittrexRxClient,
    OrderConditionalTypeValue,
    TickIntervalValue,
    TimeInEffectValue,
    MarketOrderValue,
    OrderTypeValue,
    FillTypeValue,
    Model,
    LogTypeValue
} from "bittrex-rx";
```

> **Note**: To gain access to rxjs operators such as `map()`, `flatMap()`, `filter()`, you will need to include [rxjs](https://github.com/ReactiveX/RxJS) in your project.

Install

`npm install rxjs`

Include in your project

```js
import "rxjs";
```



## Advance Usage

Fetch the project via git:
```
git clone https://github.com/harry-sm/BittrexRx.git
```
Install package dependencies:
```
npm install
```
Build Project
```
npm run build
```
Include in your project
```js
import {
    BittrexRxClient,
    OrderConditionalTypeValue,
    TickIntervalValue,
    TimeInEffectValue,
    MarketOrderValue,
    OrderTypeValue,
    FillTypeValue,
    Model,
    LogTypeValue
} from '<path to project>';
```


## BittrexRx Settings

### settings(settings: BittrexRxSettings)

Sets settings for BittrexRx methods behaviors.

#### Parameters

| Parameter | Type              | Example                                  | Description                              |
| --------- | ----------------- | ---------------------------------------- | ---------------------------------------- |
| settings  | BittrexRxSettings | {<br /> baseUrl:  'https://bittrex.com/api/',<br /> logType:  LogTypeValue.Debug,<br /> logWriter: console.log<br />} | baseUrl: This is the entry point use to connect to the API server.<br />logType: The type of logs that should be displayed.<br /><ul><li>Debug: writes all log messages.</li><li>Error: writes only error messages.</li><li>Warning: writes only warning messages.</li> <li>logWriter:  The function that takes a single string argument and outputs the log message.</li></ul> |

#### Example

```js
import {
    BittrexRxClient,
    OrderConditionalTypeValue,
    TickIntervalValue,
    TimeInEffectValue,
    MarketOrderValue,
    Model,
    LogTypeValue
} from "bittrex-rx";

bittrexRx.settings({
  logType: LogTypeValue.Warning,
  logWriter: console.log
});
```



### Api Credentials

Sign into your Bittrex account go to settings then API keys and add new key.

The API key has four access permissions they are:
- **READ INFO** - Grants access to read private trade data such as orders, transaction history, balances, etc...
- **TRADE LIMIT** - Grants access to limit order functions, which includes creating and canceling limit buy and sell orders.
- **TRADE MARKET** - Grants access to other order functions, which includes creating and canceling conditional buy and sell orders.
- **WITHDRAW** -  Grants access to the withdraw function which allows for withdrawals to another address. (This function is not available via the public interface of this library.)

**For first time use please set API permissions to READ INFO only**.

```js
bittrexRx.apiCredentials("API_KEY", "API_SECRET");
```
### Example
```js
import {
    BittrexRxClient,
    OrderConditionalTypeValue,
    TickIntervalValue,
    TimeInEffectValue,
    MarketOrderValue,
    OrderTypeValue,
    FillTypeValue,
    Model,
    LogTypeValue
} from 'bittrex-rx';

let bittrexRx = new BittrexClient();

bittrexRx.apiCredentials("API_KEY", "API_SECRET");

bittrexRx.getMarkets()
    .subscribe(
        data => {
            data.forEach(market => {
                bittrexRx.getTicker(market.MarketName).subscribe(tickData => {
                    console.log(tickData);
                });
            });
        },
        err => {
            console.log('Error', err);
        },
        () => {
            console.log('Completed');
        });
```
#### Response
```js
{
    Bid: 0.00000345,
    Ask: 0.00000347,
    Last: 0.00000349
}
```

## Observable Extension

### intervalTime(milliseconds: number)
The intervalTime operator returns an observable that emits some sequence of data at specified intervals.

#### Example
```js
bittrexRx.getMarkets()
    .intervalTime(5000)
    .subscribe(
        data => {
            for (let market of data) {
                console.log(market);
            }
        });
```
The example above fetches market data every 5 seconds.

## Public API Method

### bittrexRx.getMarkets()
Fetches a snapshot of all markets.

#### Parameters

| Parameter | Type | Example |
| --------- | ---- | ------- |
| none      | -    | -       |

#### Return Type
`Observable<Model.Market[]>`

#### Example
```js
bittrexRx.getMarkets()
    .subscribe(
        data => {
            for (let market of data) {
                console.log(market);
            }
        });
```

#### Response
```js
[
    {
        MarketCurrency: 'LTC',
        BaseCurrency: 'BTC',
        MarketCurrencyLong: 'Litecoin',
        BaseCurrencyLong: 'Bitcoin',
        MinTradeSize: 1e-8,
        MarketName: 'BTC-LTC',
        IsActive: true,
        Created: '2014-02-13T05:00:00.000Z',
        Notice: null,
        IsSponsored: null,
        LogoUrl: 'https://bittrexblobstorage.blob.core.windows.net/public/6defbc41-582d-47a6-bb2e-d0fa88663524.png'
    },
    ...
]
```

### bittrexRx.getCurrencies()
Fetches all the market currencies.

#### Parameters

| Parameter | Type | Example |
| --------- | ---- | ------- |
| none      | -    | -       |

#### Return Type
`Observable<Model.Currency[]>`

#### Example
```js
bittrexRx.getCurrencies()
    .subscribe(
        data => {
            for (let currency of data) {
                console.log(currency);
            }
        });
```

#### Response
```js
[
    {
        Currency: 'LTC',
        CurrencyLong: 'Litecoin',
        MinConfirmation: 6,
        TxFee: 0.01,
        IsActive: true,
        CoinType: 'BITCOIN',
        BaseAddress: 'LhyLNfBkoKshT7R8Pce6vkB9T2cP2o84hx',
        Notice: null
    },
...
]
```

### bittrexRx.getTicker(market: string)
Fetches the Tick data which consists of the Bid, Ask and Latest Price the market was traded at.

#### Parameters

| Parameter | Type   | Example   |
| --------- | ------ | --------- |
| market    | string | 'BTC-LTC' |

#### Return Type
`Observable<Model.Ticker>`

#### Example
```js
bittrexRx.getTicker('BTC-LTC')
    .subscribe(
        data => {
            console.log(data);
        });
```

#### Response
```js
{
    Bid: 0.00966006,
    Ask: 0.00967006,
    Last: 0.00966006
}
```

### bittrexRx.getMarketSummaries()
Fetches the summary of each market available.

#### Parameters

| Parameter | Type | Example |
| --------- | ---- | ------- |
| none      | -    | -       |

#### Return Type
`Observable<Model.MarketSummary[]>`

#### Example
```js
bittrexRx.getMarketSummaries()
    .subscribe(
        data => {
            for (let marketSummary of data) {
                console.log(marketSummary);
            }
        });
```

#### Response
```js
[
    {
        MarketName: 'BTC-LTC',
        High: 0.01023899,
        Low: 0.00966416,
        Volume: 79788.80702209,
        Last: 0.00970283,
        BaseVolume: 791.93512777,
        TimeStamp: '2017-10-26T01:52:30.430Z',
        Bid: 0.00970283,
        Ask: 0.00970683,
        OpenBuyOrders: 2143,
        OpenSellOrders: 12833,
        PrevDay: 0.01020636,
        Created: '2014-02-13T05:00:00.000Z'
    },
    ...
]
```

### bittrexRx.getMarketSummary(market: string)
Fetches the summary of a specific market.

#### Parameters

| Parameter | Type   | Example   |
| --------- | ------ | --------- |
| market    | string | 'BTC-LTC' |

#### Return Type
`Observable<Model.MarketSummary>`

#### Example
```js
bittrexRx.getMarketSummary('BTC-LTC')
    .subscribe(
        data => {
            console.log(data);
        });
```

#### Response
```js
{
    MarketName: 'BTC-LTC',
    High: 0.01023899,
    Low: 0.00966416,
    Volume: 79788.80702209,
    Last: 0.00970283,
    BaseVolume: 791.93512777,
    TimeStamp: '2017-10-26T01:52:30.430Z',
    Bid: 0.00970283,
    Ask: 0.00970683,
    OpenBuyOrders: 2143,
    OpenSellOrders: 12833,
    PrevDay: 0.01020636,
    Created: '2014-02-13T05:00:00.000Z'
}
```

### bittrexRx.getOrderBook(market: string)
Fetches both buy and sell orders from the order book for a specific market.

#### Parameters

| Parameter | Type   | Example   |
| --------- | ------ | --------- |
| market    | string | 'BTC-LTC' |

#### Return Type
`Observable<Model.OrderBook>`

#### Example
```js
bittrexRx.getOrderBook('BTC-LTC')
    .subscribe(
        data => {
           for (let orderItem of data.buy) {
                console.log(orderItem);
            }
        });
```

#### Response
```js
{
    buy: [
        { Quantity: 0.1, Rate: 0.07059785 },
        ...
    ],
    sell: [
        { Quantity: 1.9251093, Rate: 0.07068 },
        ...
    ]
}
```

### bittrexRx.getBuyOrderBook(market: string)
Fetches buy orders from the order book for a specific market.

#### Parameters

| Parameter | Type   | Example   |
| --------- | ------ | --------- |
| market    | string | 'BTC-LTC' |

#### Return Type
`Observable<Model.OrderBookOrderItem>`

#### Example
```js
bittrexRx.getBuyOrderBook('BTC-LTC')
    .subscribe(
        data => {
           for (let orderItem of data) {
                console.log(orderItem);
            }
        });
```

#### Response
```js
[
    { Quantity: 0.1, Rate: 0.07059785 },
    ...
]
```

### bittrexRx.getSellOrderBook(market: string)
Fetches sell orders from the order book for a specific market.

#### Parameters

| Parameter | Type   | Example   |
| --------- | ------ | --------- |
| market    | string | 'BTC-LTC' |

#### Return Type
`Observable<Model.OrderBookOrderItem>`

#### Example
```js
bittrexRx.getSellOrderBook('BTC-LTC')
    .subscribe(
        data => {
           for (let orderItem of data) {
                console.log(orderItem);
            }
        });
```

#### Response
```js
[
    { Quantity: 1.9251093, Rate: 0.07068 },
    ...
]
```

### bittrexRx.getMarketHistory(market: string)
Fetches the latest transactions for a specific market.

#### Parameters

| Parameter | Type   | Example   |
| --------- | ------ | --------- |
| market    | string | 'BTC-LTC' |

#### Return Type
`Observable<Model.MarketHistory[]>`

#### Example
```js
bittrexRx.getMarketHistory('BTC-LTC')
    .subscribe(
        data => {
            for (let marketHistory of data) {
                console.log(marketHistory);
            }
        });
```

#### Response
```js
[
    {
        Id: 85963164,
        TimeStamp: '2017-10-26T02:00:10.273Z',
        Quantity: 3.29091587,
        Price: 0.00973473,
        Total: 0.03203617,
        FillType: 'PARTIAL_FILL',
        OrderType: 'BUY'
    },
    ...
]
```

### bittrexRx.getCandles(market: string, tickIntervalType: TickIntervalValue)
Fetches the OHLC (Open, High, Low, Close) of a market for a given time period.

> **Note:**  This method relies on the v2 API of Bittrex. Very little is known about this version of the API and is subjected to change without warning!

#### Parameters

| Parameter        | Type              | Example                                  |
| ---------------- | ----------------- | ---------------------------------------- |
| market           | string            | 'USDT-BTC'                               |
| tickIntervalType | TickIntervalValue | TickIntervalValue.oneMin, TickIntervalValue.fiveMin, ... |

#### Return Type
`Observable<Model.Candle[]>`

#### Example
```js
bittrexRx.getCandles('BTC-LTC', TickIntervalType.oneMin)
    .subscribe(
        data => {
            for (let candle of data) {
                console.log(candle);
            }
        });
```

#### Response
```js
[
    {
        O: 0.01149845,
        H: 0.0115379,
        L: 0.01149845,
        C: 0.0115379,
        V: 46.98461375,
        T: '2017-10-16T03:56:00.000Z',
        BV: 0.5419376
    },
    ...
]
```

## Account API Methods

### bittrexRx.getBalances()
Fetches all your current currency balances.

#### Parameters

| Parameter | Type | Example |
| --------- | ---- | ------- |
| none      | -    | -       |

#### Return Type
`Observable<Model.Balance[]>`

#### Example
```js
bittrexRx.getBalances()
    .subscribe(
        data => {
            for (let balance of data) {
                console.log(balance);
            }
        });
```

#### Response
```js
[
    {
        Currency: 'LTC',
        Balance: 0,
        Available: 0,
        Pending: 0,
        CryptoAddress: null
    },
    ...
]
```


### bittrexRx.getBalance(currency: string)
Fetches the current balance of a specific currency.

#### Parameters

| Parameter | Type   | Example |
| --------- | ------ | ------- |
| currency  | string | 'LTC'   |

#### Return Type
`Observable<Model.Balance>`

#### Example
```js
bittrexRx.getBalance('LTC')
    .subscribe(
        data => {
            console.log(data);
        });
```

#### Response
```js
{
    Currency: 'LTC',
    Balance: 0,
    Available: 0,
    Pending: 0,
    CryptoAddress: null
}
```

### bittrexRx.getDepositAddress(currency: string)
Fetches the deposit address of a specific currency.

#### Parameters

| Parameter | Type   | Example |
| --------- | ------ | ------- |
| currency  | string | 'LTC'   |

#### Return Type
`Observable<Model.DepositAddress>`

#### Example
```js
bittrexRx.getBalance('LTC')
    .subscribe(
        data => {
            console.log(data);
        });
```

#### Response
```js
{
    Currency: 'LTC',
    Address: ''
}
```

### bittrexRx.getOrder(uuid: string)
Fetches an order by a specific identifier.

#### Return Type
`Observable<Model.Order>`

#### Parameters

| Parameter | Type   | Example                                |
| --------- | ------ | -------------------------------------- |
| uuid      | string | '2968d0f9-2854-48e5-bbbf-18a2b7451140' |

#### Example
```js
bittrexRx.getOrder('dc1a6628-7e12-4817-aa16-b5e9860d116c')
    .subscribe(
        data => {
            console.log(data);
        });
```

#### Response
```js
{
    AccountId: null,
    OrderUuid: 'dc1a6628-7e12-4817-aa16-b5e9860d116c',
    Exchange: 'BTC-XVG',
    Type: 'LIMIT_BUY',
    Quantity: 326.22641509,
    QuantityRemaining: 0,
    Limit: 0.00000159,
    Reserved: 0.00051869,
    ReserveRemaining: 0.00051869,
    CommissionReserved: 0.00000129,
    CommissionReserveRemaining: 0,
    CommissionPaid: 0.00000129,
    Price: 0.00051869,
    PricePerUnit: 0.00000158,
    Opened: '2017-09-27T02:47:50.740Z',
    Closed: '2017-09-27T03:39:30.280Z',
    IsOpen: false,
    Sentinel: 'Invalid Date',
    CancelInitiated: false,
    ImmediateOrCancel: false,
    IsConditional: false,
    Condition: 'NONE',
    ConditionTarget: null
}
```

### bittrexRx.getOrderHistory()
Fetches the total transaction history.

#### Parameters

| Parameter | Type | Example |
| --------- | ---- | ------- |
| none      | -    | -       |

#### Return Type
`Observable<Model.OrderHistoryOrderItem[]>`

#### Example
```js
bittrexRx.getOrderHistory()
    .subscribe(
        data => {
           for (let orderHistoryItem of data) {
                console.log(orderHistoryItem);
            }
        });
```

#### Response
```js
[
    {
        OrderUuid: 'dc1a6628-7e12-4817-aa16-b5e9860d116c',
        Exchange: 'BTC-XVG',
        TimeStamp: '2017-09-27T02:47:50.740Z',
        OrderType: 'LIMIT_BUY',
        Limit: 0.00000159,
        Quantity: 326.22641509,
        QuantityRemaining: 0,
        Commission: 0.00000129,
        Price: 0.00051869,
        PricePerUnit: 0.00000158,
        IsConditional: false,
        Condition: 'NONE',
        ConditionTarget: null,
        ImmediateOrCancel: false,
        Closed: '2017-09-27T03:39:30.280Z'
    },
    ...
]
```


### bittrexRx.getDepositHistory(currency: string)
Fetches the deposit records of the currency specified.

#### Parameters

| Parameter | Type   | Example |
| --------- | ------ | ------- |
| currency  | string | 'LTC'   |

#### Return Type
`Observable<Model.Transaction[]>`

#### Example
```js
bittrexRx.getDepositHistory('LTC')
    .subscribe(
        data => {
           for (let transactionHistory of data) {
                console.log(transactionHistory);
            }
        });
```

#### Response
```js
[
    {
        Id: 26972433,
        Amount: 0.02455098,
        Currency: 'BTC',
        Confirmations: 4,
        LastUpdated: '2017-08-16T22:13:47.783Z',
        TxId: '8aa448a50b06c0e1436e6e000132d721761e54cac365769ec1136a391df44bfc',
        CryptoAddress: '138TtdZkyMU8GMY8tzpZuc7xsqrb4CwrGE'
    },
    ...
]
```

### bittrexRx.getWithdrawalHistory(currency: string)
Fetches the withdrawal records of the currency specified.

#### Parameters

| Parameter | Type   | Example |
| --------- | ------ | ------- |
| currency  | string | 'BTC'   |

#### Return Type
`Observable<Model.WithdrawalTransaction[]>`

#### Example
```js
bittrexRx.getWithdrawalHistory('BTC')
    .subscribe(
        data => {
            for (let transactionHistory of data) {
                console.log(transactionHistory);
            }
        });
```

#### Response
```js
[
    {
        PaymentUuid: "b14f86bb-b15b-4177-9779-5466eb3a0fbc",
        Currency: "BTC",
        Amount: 0.02039674,
        Address: "1Fo8nz1m4fBb7iDKWDghiA6YSEsg4HZJxD",
        Opened: "2017-08-18T04:40:44.737",
        Authorized: true,
        PendingPayment: false,
        TxCost: 0.001,
        TxId: "38a3147f51b8c4798d1a5b3e2712bd7b7177fa99d6457af45a84e56664b6bbc6",
        Canceled: false,
        InvalidAddress: false
    },
    ...
]
```

## Market API Methods

### bittrexRx.setBuyOrder(market: string, quantity: number, rate: number)
Place buy limit order for a market pair at a rate and quantity specified.

#### Parameters

| Parameter | Type   | Example    |
| --------- | ------ | ---------- |
| market    | string | 'BTC-LTC'  |
| quantity  | number | 0.05849296 |
| rate      | number | 0.00869720 |


#### Return Type
`Observable<Model.OrderResult>`

#### Example
```js
bittrexRx.setBuyOrder('BTC-LTC', 0.05849296, 0.00869720)
    .subscribe(
        data => {
            console.log(data);
        });
```

#### Response
```js
{
    uuid: '54a1cc8f-10dc-49de-bb52-f5d70b1c84ec'
}
```

### bittrexRx.setSellOrder(market: string, quantity: number, rate: number)
Place sell limit order for a market pair at a rate and quantity specified.

#### Parameters

| Parameter | Type   | Example    |
| --------- | ------ | ---------- |
| market    | string | 'USDT-BTC' |
| quantity  | number | 0.0051     |
| rate      | number | 7000       |

#### Return Type
`Observable<Model.OrderResult>`

#### Example
```js
bittrexRx.setSellOrder('USDT-BTC', 0.0051, 7000)
    .subscribe(
        data => {
            console.log(data);
        });
```

#### Response
```js
{
    uuid: '2968d0f9-2854-48e5-bbbf-18a2b7451140'
}
```

### bittrexRx.getOpenOrders(market: string)
Fetch orders that has not been executed for specific market.

#### Parameters

| Parameter | Type   | Example   |
| --------- | ------ | --------- |
| market    | string | 'BTC-GNT' |

#### Return Type
`Observable<Model.OpenOrder[]>`

#### Example
```js
bittrexRx.getOpenOrders('BTC-GNT')
    .subscribe(
        data => {
            for (let openOrder of data) {
                console.log(openOrder);
            }
        });
```

#### Response
```js
[
    {
        Uuid: null,
        OrderUuid: '9a6e6f63-de19-475a-ad81-c85129681253',
        Exchange: 'BTC-GNT',
        OrderType: 'LIMIT_BUY',
        Quantity: 16.14487464,
        QuantityRemaining: 16.14487464,
        Limit: 0.00003151,
        CommissionPaid: 0,
        Price: 0,
        PricePerUnit: null,
        Opened: '2017-10-24T03:50:26.250Z',
        Closed: null,
        CancelInitiated: false,
        ImmediateOrCancel: false,
        IsConditional: false,
        Condition: 'NONE',
        ConditionTarget: null
    }
]
```

### bittrexRx.cancelOrder(uuid: string)
Cancel order returns null.

#### Parameters

| Parameter | Type   | Example                                |
| --------- | ------ | -------------------------------------- |
| uuid      | string | '2968d0f9-2854-48e5-bbbf-18a2b7451140' |

#### Return Type
`Observable<void>`

#### Example
```js
bittrexRx.cancelOrder('54a1cc8f-10dc-49de-bb52-f5d70b1c84ec')
    .subscribe(
        data => {
            console.log(data);
        });
```

#### Response
```js
null
```

### bittrexRx.setConditionalBuyOrder(market: string, marketOrderType: MarketOrderValue, quantity: number, rate: number, timeInEffect: TimeInEffectValue, conditionType: OrderConditionalTypeValue, target: number)
Executes buy orders under the conditions specified.

> **Note:**  This method relies on the v2 API of Bittrex. Very little is known about this version of the API and is subjected to change without warning!

#### Parameter

| Parameter       | Type                      | Example                                  | Description                              |
| --------------- | ------------------------- | ---------------------------------------- | ---------------------------------------- |
| market          | string                    | 'BTC-ETH'                                |                                          |
| marketOrderType | MarketOrderValue          | MarketOrderValue.LIMIT                   | LIMIT: The order will be executed at a specific price. |
| quantity        | number                    | 0.01162237                               | -                                        |
| rate            | number                    | 0.04377120                               | -                                        |
| timeInEffect    | TimeInEffectValue         | TimeInEffectValue.IMMEDIATE_OR_CANCEL,<br> TimeInEffectValue.GOOD_TIL_CANCELLED, <br>TimeInEffectValue.FILL_OR_KILL | IMMEDIATE_OR_CANCEL: The order must be executed immediately or else it is canceled. Partial fills are accepted .<br> GOOD_TIL_CANCELLED:,The order is placed until the user cancels it. <br>FILL_OR_KILL: The order must be completed in its entirety. The full quantity of the order at a fixed prices must be executed or canceled. |
| conditionType   | OrderConditionalTypeValue | OrderConditionalTypeValue.NONE, <br>OrderConditionalTypeValue.GREATER_THAN,<br> OrderConditionalTypeValue.LESS_THAN | GREATER_THAN: The order will be executed if the price of the security is greater than the price specified in the target parameter. <br>LESS_THAN: The order will be executed if the price of the security is less than the price specified in the target parameter. |
| target          | number                    | 0.0                                      | -                                        |


#### Return Type
`Observable<Model.ConditionalOrder>`

#### Example
```js
bittrexRx.setConditionalBuyOrder('BTC-ETH', MarketOrderValue.LIMIT, 0.01162237, 0.04377120, TimeInEffectValue.GOOD_TIL_CANCELLED, OrderConditionalTypeValue.NONE, 0.0)
    .subscribe(
        data => {
            console.log(data);
        });
```

#### Response
```js
{
    OrderId: 'ac983afd-6852-478e-8415-d6e30615ea9c',
    MarketName: 'BTC-ETH',
    MarketCurrency: 'ETH',
    BuyOrSell: 'Buy',
    OrderType: 'LIMIT',
    Quantity: 0.01162237,
    Rate: 0.0437712
}
```

### bittrexRx.setConditionalSellOrder(market: string, marketOrderType: MarketOrderValue, quantity: number, rate: number, timeInEffect: TimeInEffectValue, conditionType: OrderConditionalTypeValue, target: number)
Executes sell orders under the conditions specified.

> **Note:**  This method relies on the v2 API of Bittrex. Very little is known about this version of the API and is subjected to change without warning!

#### Parameter

| Parameter       | Type                      | Example                                  | Description                              |
| --------------- | ------------------------- | ---------------------------------------- | ---------------------------------------- |
| market          | string                    | 'USDT-ETH'                               |                                          |
| marketOrderType | MarketOrderValue          | MarketOrderValue.LIMIT                   | LIMIT: The order will be executed at a specific price. |
| quantity        | number                    | 0.01574783                               | -                                        |
| rate            | number                    | 400                                      | -                                        |
| timeInEffect    | TimeInEffectValue         | TimeInEffectValue.IMMEDIATE_OR_CANCEL,<br> TimeInEffectValue.GOOD_TIL_CANCELLED, <br>TimeInEffectValue.FILL_OR_KILL | IMMEDIATE_OR_CANCEL: The order must be executed immediately or else it is canceled. Partial fills are accepted .<br> GOOD_TIL_CANCELLED:,The order is placed until the user cancels it. <br>FILL_OR_KILL: The order must be completed in its entirety. The full quantity of the order at a fixed prices must be executed or canceled. |
| conditionType   | OrderConditionalTypeValue | OrderConditionalTypeValue.NONE, <br>OrderConditionalTypeValue.GREATER_THAN,<br> OrderConditionalTypeValue.LESS_THAN | GREATER_THAN: The order will be executed if the price of the security is greater than the price specified in the target parameter. <br>LESS_THAN: The order will be executed if the price of the security is less than the price specified in the target parameter. |
| target          | number                    | 0.0                                      | -                                        |

#### Return Type
`Observable<Model.ConditionalOrder>`

#### Example
```js
bittrexRx.setConditionalSellOrder('BTC-ETH', MarketOrderValue.LIMIT, 0.01162237, 0.04377120, TimeInEffectValue.GOOD_TIL_CANCELLED,  OrderConditionalTypeValue.NONE, 0.0)
    .subscribe(
        data => {
            console.log(data);
        });
```

#### Response
```js
{
    OrderId: 'b27a6b86-bae6-4b04-be2d-6726e717e53e',
    MarketName: 'USDT-ETH',
    MarketCurrency: 'ETH',
    BuyOrSell: 'Sell',
    OrderType: 'LIMIT',
    Quantity: 0.01574783,
    Rate: 400
}
```


### customRequest(url: string, queryOptions: Object, useCredentials: Boolean)
This method is not dependent on the API version and allows for the sending of custom requests.

#### Parameters

| Parameter      | Type    | Example                                  | Description                              |
| -------------- | ------- | ---------------------------------------- | ---------------------------------------- |
| url            | string  | https://bittrex.com/api/v1.1/public/getmarketsummary | API endpoint.                            |
| queryOptions   | Object  | { market: 'BTC-LTC' }                    | Query string parameters.                 |
| useCredentials | Boolean | false                                    | Specify whether the API credentials should be enabled or not. |

#### Return Type
`Observable<any>`

#### Example
```js
bittrexRx.customRequest('https://bittrex.com/api/v1.1/public/getmarketsummary', { market: 'BTC-LTC' }, false)
    .subscribe(
        data => {
            console.log(data);
        });
```

#### Response
```js
[
    {
        MarketName: 'BTC-LTC',
        High: 0.00908,
        Low: 0.0076,
        Volume: 291758.48361243,
        Last: 0.0084773,
        BaseVolume: 2464.80235543,
        TimeStamp: '2017-11-08T00:32:02.203',
        Bid: 0.00846202,
        Ask: 0.0084773,
        OpenBuyOrders: 2964,
        OpenSellOrders: 13074,
        PrevDay: 0.00775,
        Created: '2014-02-13T00:00:00'
    }
]
```

## Web Socket


### bittrexRx.Socket.summaryState()
Connect to a live stream of market summary data.

#### Parameters

| Parameter | Type | Example |
| --------- | ---- | ------- |
| none      | -    | -       |

#### Return Type
`Observable<Model.SummaryStateDelta>`

#### Example
```js
bittrexRx.Socket.summaryState()
    .subscribe(
        data => {
            console.log(data);
        });
```

#### Response
```js
{
    Nounce: 51705,
    Deltas: [
        {
            MarketName: 'USDT-BTC',
            High: 6002,
            Low: 5410.36691866,
            Volume: 9899.62086304,
            Last: 5693.9,
            BaseVolume: 56483410.89562297,
            TimeStamp: '2017-10-23T18:25:14.817Z',
            Bid: 5689,
            Ask: 5693.9,
            OpenBuyOrders: 7611,
            OpenSellOrders: 3541,
            PrevDay: 5850,
            Created: '2015-12-11T06:31:40.633Z'
        },
        ...
    ]
}
```

### bittrexRx.Socket.exchangeState(market: string[])
Connect to a live stream of specific market data. The data consists of the order books and market history.

#### Parameters

| Parameter | Type     | Example      |
| --------- | -------- | ------------ |
| market    | string[] | ['BTC-L TC'] |

#### Return Type
`Observable<Model.OrderBookStream>`

#### Example
```js
bittrexRx.Socket.exchangeState(['BTC-ETH'])
    .subscribe(
        data => {
            console.log(data);
        });
```

#### Response
```js
{
    MarketName: 'BTC-ETH',
    Nounce: 40393,
    Buys:[
        { Type: 1, Rate: 0.053516, Quantity: 0 },
        { Type: 1, Rate: 0.05344106, Quantity: 0 },
        { Type: 2, Rate: 0.05188199, Quantity: 0.04339557 },
        { Type: 2, Rate: 0.05170671, Quantity: 0.04354268 },
        { Type: 2, Rate: 0.05153143, Quantity: 0.04369078 },
        { Type: 2, Rate: 0.05135616, Quantity: 0.0438399 },
        { Type: 2, Rate: 0.05118088, Quantity: 0.04399003 },
        { Type: 2, Rate: 0.0510056, Quantity: 0.0441412 }
    ],
    Sells: [
        { Type: 2, Rate: 0.05382, Quantity: 10.18061112 },
        { Type: 2, Rate: 0.05434562, Quantity: 4.83608199 },
        { Type: 0, Rate: 0.05450161, Quantity: 8.71091193 },
        { Type: 1, Rate: 0.05450262, Quantity: 0 }
    ],
    Fills: [
        {
            OrderType: 'BUY',
            Rate: 0.05382,
            Quantity: 0.42158507,
            TimeStamp: '2017-10-24T20:16:12.213Z'
        }
    ]
}
```

### bittrexRx.Socket.close()
Closes socket connection.

#### Parameters

| Parameter | Type | Example |
| --------- | ---- | ------- |
| none      | -    | -       |

#### Return Type
`Void`

#### Example
```js
bittrexRx.Socket.close();
```


### Websockets ServiceHandlers

#### Example

```js
bittrexRx.Socket.Status.Connected = function ( connection ){
    console.log('connection start', connection);
}

bittrexRx.Socket.Status.ConnectionFailed = function ( connection ){
    console.log('connection failed', connection);
}

bittrexRx.Socket.Status.Disconnected = function (){
    console.log("disconnected");
}

bittrexRx.Socket.Status.Error = function ( error ){
    console.log("error: ", error);
}

bittrexRx.Socket.Status.BindingError = function ( error ){
    console.log("bindingError: ", error)
}

bittrexRx.Socket.Status.ConnectionLost = function ( error ){
    console.log("connection lost: ", error);
}

bittrexRx.Socket.Status.Reconnecting = function ( retry ){
    console.log('connection retry ', retry);
    return true;
}
```
