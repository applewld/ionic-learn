import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { EmojiProvider } from "../../providers/emoji/emoji";
@Component({
  selector: 'emojipicker',
  templateUrl: 'emojipicker.html'
})
export class EmojipickerComponent implements ControlValueAccessor {

  emojiArray = [];
  content:string;

  constructor(EmojiProvider:EmojiProvider) {
      this.emojiArray = EmojiProvider.getEmojis();
  }


  writeValue(obj: any): void{

  }
  registerOnChange(fn: any): void{

  }
  registerOnTouched(fn: any): void{

  }
  setDisabledState(isDisabled: boolean): void{

  }

}
