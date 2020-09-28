const qrcode = require('./qrcode.js');


class GiroCode {

    constructor(config) {

        let config_defaults = {
            'service': 'BCD', // Service Tag
            'version': '001', // Version: 001, 002
            'encoding': '2', // Character set: 1 = UTF-8, 2 = ISO 8859-1
            'transfer': 'SCT', // Identification: SCT = SEPA credit transfer
            'bic': '', //'PBNKDEFF', // BIC
            'name': '', // 'Postbank', // Bank name
            'iban': '', //'DE02100100100006820101', // IBAN
            'currency': 'EUR',
            'amount': '0.00', // Amount (Format „EUR#.##“)
            'char': '', // Zweck (vierstelliger Buchstabencode, optional)
            'ref': '', // Reference (strukturierter 35-Zeichen-Code gem. ISO 11649 RF Creditor Reference)
            'reason': '', // Verwendungszweck (max of 140 characters)
            'hint': '', // Optional hint to user
        };
        this._config = Object.assign(config_defaults, config);
        console.log(config, this._config);

let girocode_string = `
${this._config.service}
${this._config.version}
${this._config.encoding}
${this._config.transfer}
${this._config.bic}
${this._config.name}
${this._config.iban}
${this._config.currency}${this._config.amount}
${this._config.char}
${this._config.ref}
${this._config.reason}
`.trim();

        this._svg = qrcode(girocode_string);

        return this;
    }

    svg() {
        return this._svg;
    }
    
    svg_data_url() {
        return 'data:image/svg+xml;utf8,' + encodeURIComponent(this._svg);
    }

}
const girocode = function() { return new GiroCode(...arguments); };


export { girocode, GiroCode };

