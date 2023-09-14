import * as _8 from "./did/v2/diddoc";
import * as _9 from "./did/v2/fee";
import * as _10 from "./did/v2/genesis";
import * as _11 from "./did/v2/tx";
import * as _12 from "./resource/v2/fee";
import * as _13 from "./resource/v2/genesis";
import * as _14 from "./resource/v2/resource";
import * as _15 from "./resource/v2/tx";
export namespace cheqd {
  export namespace did {
    export const v2 = {
      ..._8,
      ..._9,
      ..._10,
      ..._11
    };
  }
  export namespace resource {
    export const v2 = {
      ..._12,
      ..._13,
      ..._14,
      ..._15
    };
  }
}