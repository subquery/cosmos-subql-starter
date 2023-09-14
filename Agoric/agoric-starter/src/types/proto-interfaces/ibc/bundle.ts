import * as _102 from "./applications/transfer/v1/genesis";
import * as _103 from "./applications/transfer/v1/transfer";
import * as _104 from "./applications/transfer/v1/tx";
import * as _105 from "./applications/transfer/v2/packet";
import * as _106 from "./core/channel/v1/channel";
import * as _107 from "./core/channel/v1/genesis";
import * as _108 from "./core/channel/v1/tx";
import * as _109 from "./core/client/v1/client";
import * as _110 from "./core/client/v1/genesis";
import * as _111 from "./core/client/v1/tx";
import * as _112 from "./core/commitment/v1/commitment";
import * as _113 from "./core/connection/v1/connection";
import * as _114 from "./core/connection/v1/genesis";
import * as _115 from "./core/connection/v1/tx";
import * as _116 from "./core/types/v1/genesis";
import * as _117 from "./lightclients/localhost/v1/localhost";
import * as _118 from "./lightclients/solomachine/v1/solomachine";
import * as _119 from "./lightclients/solomachine/v2/solomachine";
import * as _120 from "./lightclients/tendermint/v1/tendermint";
export namespace ibc {
  export namespace applications {
    export namespace transfer {
      export const v1 = {
        ..._102,
        ..._103,
        ..._104
      };
      export const v2 = {
        ..._105
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._106,
        ..._107,
        ..._108
      };
    }
    export namespace client {
      export const v1 = {
        ..._109,
        ..._110,
        ..._111
      };
    }
    export namespace commitment {
      export const v1 = {
        ..._112
      };
    }
    export namespace connection {
      export const v1 = {
        ..._113,
        ..._114,
        ..._115
      };
    }
    export namespace types {
      export const v1 = {
        ..._116
      };
    }
  }
  export namespace lightclients {
    export namespace localhost {
      export const v1 = {
        ..._117
      };
    }
    export namespace solomachine {
      export const v1 = {
        ..._118
      };
      export const v2 = {
        ..._119
      };
    }
    export namespace tendermint {
      export const v1 = {
        ..._120
      };
    }
  }
}