import * as _91 from "./applications/transfer/v1/genesis";
import * as _92 from "./applications/transfer/v1/transfer";
import * as _93 from "./applications/transfer/v1/tx";
import * as _94 from "./applications/transfer/v2/packet";
import * as _95 from "./core/channel/v1/channel";
import * as _96 from "./core/channel/v1/genesis";
import * as _97 from "./core/channel/v1/tx";
import * as _98 from "./core/client/v1/client";
import * as _99 from "./core/client/v1/genesis";
import * as _100 from "./core/client/v1/tx";
import * as _101 from "./core/commitment/v1/commitment";
import * as _102 from "./core/connection/v1/connection";
import * as _103 from "./core/connection/v1/genesis";
import * as _104 from "./core/connection/v1/tx";
import * as _105 from "./core/types/v1/genesis";
import * as _106 from "./lightclients/localhost/v1/localhost";
import * as _107 from "./lightclients/solomachine/v1/solomachine";
import * as _108 from "./lightclients/solomachine/v2/solomachine";
import * as _109 from "./lightclients/tendermint/v1/tendermint";
export namespace ibc {
  export namespace applications {
    export namespace transfer {
      export const v1 = {
        ..._91,
        ..._92,
        ..._93,
      };
      export const v2 = {
        ..._94,
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._95,
        ..._96,
        ..._97,
      };
    }
    export namespace client {
      export const v1 = {
        ..._98,
        ..._99,
        ..._100,
      };
    }
    export namespace commitment {
      export const v1 = {
        ..._101,
      };
    }
    export namespace connection {
      export const v1 = {
        ..._102,
        ..._103,
        ..._104,
      };
    }
    export namespace types {
      export const v1 = {
        ..._105,
      };
    }
  }
  export namespace lightclients {
    export namespace localhost {
      export const v1 = {
        ..._106,
      };
    }
    export namespace solomachine {
      export const v1 = {
        ..._107,
      };
      export const v2 = {
        ..._108,
      };
    }
    export namespace tendermint {
      export const v1 = {
        ..._109,
      };
    }
  }
}
