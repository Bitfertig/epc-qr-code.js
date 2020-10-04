# EPC-QR-Code

An [EPC-QR-Code] is a data set standardized by the **European Payments Council** that contains all the data for a SEPA transfer and is machine-readable using **QR coding**.


## Demo

[Demo]


## Install

NPM package: [@dipser/epc-qr-code.js]

```bash
npm i @dipser/epc-qr-code.js
```


## Usage

Minimal example:

```html
<script type="module">
import { girocode } from "@dipser/epc-qr-code.js";
var g = girocode({
    'iban': 'DE02100100100006820101',
    'bic': 'PBNKDEFF',
    'name': 'Postbank',
    'amount': '10.00',
    'reason': 'Invoice X',
});
g.svg()
// g.svg_data_url()
</script>
```

Complete example:

```html
<script type="module">
import { girocode } from "@dipser/epc-qr-code.js";
var g = girocode({
    'service': 'BCD', // Service Tag
    'version': '001', // Version: 001, 002
    'encoding': '2', // Character set: 1 = UTF-8, 2 = ISO 8859-1
    'transfer': 'SCT', // Identification: SCT = SEPA credit transfer
    'bic': 'PBNKDEFF', // BIC
    'name': 'Postbank', // Bank name
    'iban': 'DE02100100100006820101', // IBAN
    'currency': 'EUR',
    'amount': '10.00', // Amount (Format „#.##“)
    'char': '', // Zweck (vierstelliger Buchstabencode, optional)
    'ref': '', // Reference (strukturierter 35-Zeichen-Code gem. ISO 11649 RF Creditor Reference)
    'reason': '', // Verwendungszweck (max of 140 characters)
    'hint': '', // Optional hint to user
});
g.svg() // or g.svg_data_url()
</script>
```



[EPC-QR-Code]: https://de.wikipedia.org/wiki/EPC-QR-Code
[Demo]: http://tools.bitfertig.de/epc-qr-code.js/
[@dipser/epc-qr-code.js]: https://www.npmjs.com/package/@dipser/epc-qr-code.js