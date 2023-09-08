import * as _107 from "./applications/transfer/v1/genesis";
import * as _108 from "./applications/transfer/v1/transfer";
import * as _109 from "./applications/transfer/v1/tx";
import * as _110 from "./applications/transfer/v2/packet";
import * as _111 from "./core/channel/v1/channel";
import * as _112 from "./core/channel/v1/genesis";
import * as _113 from "./core/channel/v1/tx";
import * as _114 from "./core/client/v1/client";
import * as _115 from "./core/client/v1/genesis";
import * as _116 from "./core/client/v1/tx";
import * as _117 from "./core/commitment/v1/commitment";
import * as _118 from "./core/connection/v1/connection";
import * as _119 from "./core/connection/v1/genesis";
import * as _120 from "./core/connection/v1/tx";
import * as _121 from "./core/types/v1/genesis";
import * as _122 from "./lightclients/localhost/v1/localhost";
import * as _123 from "./lightclients/solomachine/v1/solomachine";
import * as _124 from "./lightclients/solomachine/v2/solomachine";
import * as _125 from "./lightclients/tendermint/v1/tendermint";
export namespace ibc {
  export namespace applications {
    export namespace transfer {
      export const v1 = {
        ..._107,
        ..._108,
        ..._109
      };
      export const v2 = {
        ..._110
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._111,
        ..._112,
        ..._113
      };
    }
    export namespace client {
      export const v1 = {
        ..._114,
        ..._115,
        ..._116
      };
    }
    export namespace commitment {
      export const v1 = {
        ..._117
      };
    }
    export namespace connection {
      export const v1 = {
        ..._118,
        ..._119,
        ..._120
      };
    }
    export namespace types {
      export const v1 = {
        ..._121
      };
    }
  }
  export namespace lightclients {
    export namespace localhost {
      export const v1 = {
        ..._122
      };
    }
    export namespace solomachine {
      export const v1 = {
        ..._123
      };
      export const v2 = {
        ..._124
      };
    }
    export namespace tendermint {
      export const v1 = {
        ..._125
      };
    }
  }
}