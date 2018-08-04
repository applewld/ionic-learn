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
  onChanged:Function;
  onTounched:Function;

  constructor(EmojiProvider:EmojiProvider) {
      this.emojiArray = EmojiProvider.getEmojis();
  }


  writeValue(obj: any): void{
      this.content = obj;
  }
  registerOnChange(fn: any): void{
    this.onChanged = fn;
    this.setValue(this.content);
  }
  registerOnTouched(fn: any): void{
    this.onTounched = fn;
  }
  setValue(val:any){
    this.content+=val;
    if(this.content){
      this.onChanged(this.content);
    }
  }
}
