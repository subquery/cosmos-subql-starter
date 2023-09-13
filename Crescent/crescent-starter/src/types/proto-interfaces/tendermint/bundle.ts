import * as _165 from "./abci/types";
import * as _166 from "./crypto/keys";
import * as _167 from "./crypto/proof";
import * as _168 from "./libs/bits/types";
import * as _169 from "./p2p/types";
import * as _170 from "./types/block";
import * as _171 from "./types/evidence";
import * as _172 from "./types/params";
import * as _173 from "./types/types";
import * as _174 from "./types/validator";
import * as _175 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._165
  };
  export const crypto = {
    ..._166,
    ..._167
  };
  export namespace libs {
    export const bits = {
      ..._168
    };
  }
  export const p2p = {
    ..._169
  };
  export const types = {
    ..._170,
    ..._171,
    ..._172,
    ..._173,
    ..._174
  };
  export const version = {
    ..._175
  };
}