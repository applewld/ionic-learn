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
  onChange:Function;
  onTounched:Function;

  constructor(EmojiProvider:EmojiProvider) {
      this.emojiArray = EmojiProvider.getEmojis();
  }


  writeValue(obj: any): void{
      this.content = obj;
  }
  registerOnChange(fn: any): void{
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void{
    this.onTounched = fn;
  }
}
