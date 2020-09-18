import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-field-swift',
  templateUrl: './field-swift.component.html',
  styleUrls: ['./field-swift.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldSwiftComponent),
      multi: true,
    },
  ],
})
export class FieldSwiftComponent implements OnInit {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() control: AbstractControl;
  @Input('value') val: string;
  @Input() showClearBtn = false;

  // Statuses
  @Input() disabled: boolean;
  @Input() readonly = false;

  _formatToRegExp = {
    '0': /[0-9]/,
    a: /[a-z]/,
    A: /[A-Z]/,
    B: /[a-zA-Z]/,
  };

  _allFormatsStr =
    '(' +
    Object.keys(this._formatToRegExp)
      .map((key) => this._formatToRegExp[key].toString())
      .map((regexStr) => regexStr.substr(1, regexStr.length - 2))
      .join('|') +
    ')';

  _allFormatsGlobal = this.getAllFormatRegexp('g');

  constructor() {}

  ngOnInit() {}

  // Both onChange and onTouched are functions
  onChange: any = () => {};
  onTouched: any = () => {};

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateValue($event) {
    this.writeValue($event);
    this.onChange($event);
  }

  clear() {
    this.value = null;
    this.writeValue(null);
    this.onChange(null);
  }

  onInputChange(event) {
    let newVal = event.detail.value.toUpperCase();
    // let newVal = event.detail.value;

    // * BYkk bbbb aaaa cccc cccc cccc cccc
    // * b = Код национального банка или отделения
    // * a = Номер балансового счета
    // * c = Номер счета

    newVal = this.valueToFormat(newVal, 'AA00 AAAA 0000 0000 0000 0000 0000');
    this.updateValue(newVal);
  }

  //   /**
  //  * Apply format to a value string
  //  *
  //  * Format can be constructed from next symbols:
  //  *  - '0': /[0-9]/,
  //  *  - 'a': /[a-z]/,
  //  *  - 'A': /[A-Z]/,
  //  *  - 'B': /[a-zA-Z]/
  //  *
  //  * Example: 'AAA-00BB-aaaa'
  //  * will accept 'COD-12Rt-efww'
  //  *
  //  * @param value Current value
  //  * @param format Format
  //  * @param goingBack Indicates if change was done by BackSpace
  //  * @param prevValue Pass to precisely detect formatter chars
  //  */
  valueToFormat(
    value: string,
    format: string,
    goingBack = false,
    prevValue?: string
  ): string {
    let maskedValue = '';
    const unmaskedValue = this.unmaskValue(value);

    const isLastCharFormatter = !this.getAllFormatRegexp().test(
      value[value.length - 1]
    );
    const isPrevLastCharFormatter =
      prevValue &&
      !this.getAllFormatRegexp().test(prevValue[prevValue.length - 1]);

    let formatOffset = 0;
    for (
      let i = 0, maxI = Math.min(unmaskedValue.length, format.length);
      i < maxI;
      ++i
    ) {
      const valueChar = unmaskedValue[i];
      let formatChar = format[formatOffset + i];
      let formatRegex = this.getFormatRegexp(formatChar);

      if (formatChar && !formatRegex) {
        maskedValue += formatChar;
        formatChar = format[++formatOffset + i];
        formatRegex = this.getFormatRegexp(formatChar);
      }

      if (valueChar && formatRegex) {
        if (formatRegex && formatRegex.test(valueChar)) {
          maskedValue += valueChar;
        } else {
          break;
        }
      }

      const nextFormatChar = format[formatOffset + i + 1];
      const nextFormatRegex = this.getFormatRegexp(nextFormatChar);
      const isLastIteration = i === maxI - 1;

      if (isLastIteration && nextFormatChar && !nextFormatRegex) {
        if (!isLastCharFormatter && goingBack) {
          if (prevValue && !isPrevLastCharFormatter) {
            continue;
          }
          maskedValue = maskedValue.substr(0, formatOffset + i);
        } else {
          maskedValue += nextFormatChar;
        }
      }
    }

    return maskedValue;
  }

  unmaskValue(value: string): string {
    const unmaskedMathes = value.replace(' ', '').match(this._allFormatsGlobal);
    return unmaskedMathes ? unmaskedMathes.join('') : '';
  }

  getAllFormatRegexp(flags?: string) {
    return new RegExp(this._allFormatsStr, flags);
  }

  getFormatRegexp(formatChar: string): RegExp | null {
    return formatChar && this._formatToRegExp[formatChar]
      ? this._formatToRegExp[formatChar]
      : null;
  }

  onKeydown(event) {
    if (event.code === 'Backspace' && this.value.length) {
      const temp = this.value.substr(0, this.value.length - 1);
      this.updateValue(temp);
    }
  }
}
