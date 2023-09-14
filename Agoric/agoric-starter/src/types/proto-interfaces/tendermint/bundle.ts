import * as _121 from "./abci/types";
import * as _122 from "./crypto/keys";
import * as _123 from "./crypto/proof";
import * as _124 from "./libs/bits/types";
import * as _125 from "./p2p/types";
import * as _126 from "./types/block";
import * as _127 from "./types/evidence";
import * as _128 from "./types/params";
import * as _129 from "./types/types";
import * as _130 from "./types/validator";
import * as _131 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._121,
  };
  export const crypto = {
    ..._122,
    ..._123,
  };
  export namespace libs {
    export const bits = {
      ..._124,
    };
  }
  export const p2p = {
    ..._125,
  };
  export const types = {
    ..._126,
    ..._127,
    ..._128,
    ..._129,
    ..._130,
  };
  export const version = {
    ..._131,
  };
}
