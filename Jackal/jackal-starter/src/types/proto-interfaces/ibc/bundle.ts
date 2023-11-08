import * as _122 from "./applications/transfer/v1/genesis";
import * as _123 from "./applications/transfer/v1/transfer";
import * as _124 from "./applications/transfer/v1/tx";
import * as _125 from "./applications/transfer/v2/packet";
import * as _126 from "./core/channel/v1/channel";
import * as _127 from "./core/channel/v1/genesis";
import * as _128 from "./core/channel/v1/tx";
import * as _129 from "./core/client/v1/client";
import * as _130 from "./core/client/v1/genesis";
import * as _131 from "./core/client/v1/tx";
import * as _132 from "./core/commitment/v1/commitment";
import * as _133 from "./core/connection/v1/connection";
import * as _134 from "./core/connection/v1/genesis";
import * as _135 from "./core/connection/v1/tx";
import * as _136 from "./core/types/v1/genesis";
import * as _137 from "./lightclients/localhost/v1/localhost";
import * as _138 from "./lightclients/solomachine/v1/solomachine";
import * as _139 from "./lightclients/solomachine/v2/solomachine";
import * as _140 from "./lightclients/tendermint/v1/tendermint";
export namespace ibc {
  export namespace applications {
    export namespace transfer {
      export const v1 = {
        ..._122,
        ..._123,
        ..._124
      };
      export const v2 = {
        ..._125
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._126,
        ..._127,
        ..._128
      };
    }
    export namespace client {
      export const v1 = {
        ..._129,
        ..._130,
        ..._131
      };
    }
    export namespace commitment {
      export const v1 = {
        ..._132
      };
    }
    export namespace connection {
      export const v1 = {
        ..._133,
        ..._134,
        ..._135
      };
    }
    export namespace types {
      export const v1 = {
        ..._136
      };
    }
  }
  export namespace lightclients {
    export namespace localhost {
      export const v1 = {
        ..._137
      };
    }
    export namespace solomachine {
      export const v1 = {
        ..._138
      };
      export const v2 = {
        ..._139
      };
    }
    export namespace tendermint {
      export const v1 = {
        ..._140
      };
    }
  }
}