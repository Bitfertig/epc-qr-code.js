# EPC-QR-Code

Ein [EPC-QR-Code](https://de.wikipedia.org/wiki/EPC-QR-Code) ist ein vom **European Payments Council** standardisierter Datensatz, der alle Daten für eine SEPA-Überweisung enthält, und mittels **QR-Codierung** maschinenlesbar ist.

## Demo

[Demo](http://tools.bitfertig.de/epc-qr-code)

## Install

```bash
npm i @dipser/epc-qr-code.js
```

## Usage

```html
<script type="module"></script>
import { girocode } from "@dipser/epc-qr-code.js";
girocode({
    'service': 'BCD', // Service Tag
    'version': '001', // Version: 001, 002
    'encoding': '2', // Character set: 1 = UTF-8, 2 = ISO 8859-1
    'transfer': 'SCT', // Identification: SCT = SEPA credit transfer
    'bic': 'PBNKDEFF', // BIC
    'name': 'Postbank', // Bank name
    'iban': 'DE02100100100006820101', // IBAN
    'amount': 'EUR10.00', // Amount (Format „EUR#.##“)
    'char': '', // Zweck (vierstelliger Buchstabencode, optional)
    'ref': '', // Reference (strukturierter 35-Zeichen-Code gem. ISO 11649 RF Creditor Reference)
    'reason': '', // Verwendungszweck (max of 140 characters)
    'hint': '', // Optional hint to user
})
</script>
```
