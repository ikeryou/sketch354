import { MyDisplay } from "../core/myDisplay";
import { Color } from "three/src/math/Color";
import { HSL } from "../libs/hsl";
import { Util } from "../libs/util";
import { Scroller } from "../core/scroller";
import { Func } from "../core/func";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _ccc:number = 0;

  constructor(opt:any) {
    super(opt)
  }


  private _updateStyle(): void {
    const sheets = document.styleSheets
    const sheet = sheets[sheets.length - 1];

    const col = new Color();
    const hsl = new HSL();
    hsl.h = Util.map(Scroller.instance.val.y, 0, 2, 0, Func.sh() * 2);
    hsl.s = 0.5;
    hsl.l = 0.5;
    col.setHSL(hsl.h, hsl.s, hsl.l);

    const colStyle = col.getStyle();
    // console.log(colStyle)

    if(this._ccc > 0) {
      sheet.deleteRule(sheet.cssRules.length - 1);
      sheet.deleteRule(sheet.cssRules.length - 1);
      // sheet.deleteRule(sheet.cssRules.length - 1);
    }

    sheet.insertRule(':root {scrollbar-color: ' + colStyle + ' transparent;}', sheet.cssRules.length);
    // sheet.insertRule(':root::-webkit-scrollbar {background-color: transparent;}', sheet.cssRules.length);
    sheet.insertRule(':root::-webkit-scrollbar-thumb {background-color: ' + colStyle + '; border:3px solid transparent; border-radius: 10px;background-clip: content-box;}', sheet.cssRules.length);

    this._ccc++;
  }


  protected _update(): void {
    super._update();

    if(this._c % 1 == 0) {
      this._updateStyle();
    }
  }

  protected _resize(): void {
    super._resize();
  }
}