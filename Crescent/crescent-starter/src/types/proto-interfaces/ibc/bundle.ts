import * as _144 from "./applications/transfer/v1/genesis";
import * as _145 from "./applications/transfer/v1/transfer";
import * as _146 from "./applications/transfer/v1/tx";
import * as _147 from "./applications/transfer/v2/packet";
import * as _148 from "./core/channel/v1/channel";
import * as _149 from "./core/channel/v1/genesis";
import * as _150 from "./core/channel/v1/tx";
import * as _151 from "./core/client/v1/client";
import * as _152 from "./core/client/v1/genesis";
import * as _153 from "./core/client/v1/tx";
import * as _154 from "./core/commitment/v1/commitment";
import * as _155 from "./core/connection/v1/connection";
import * as _156 from "./core/connection/v1/genesis";
import * as _157 from "./core/connection/v1/tx";
import * as _158 from "./core/types/v1/genesis";
import * as _159 from "./lightclients/localhost/v1/localhost";
import * as _160 from "./lightclients/solomachine/v1/solomachine";
import * as _161 from "./lightclients/solomachine/v2/solomachine";
import * as _162 from "./lightclients/tendermint/v1/tendermint";
export namespace ibc {
  export namespace applications {
    export namespace transfer {
      export const v1 = {
        ..._144,
        ..._145,
        ..._146
      };
      export const v2 = {
        ..._147
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._148,
        ..._149,
        ..._150
      };
    }
    export namespace client {
      export const v1 = {
        ..._151,
        ..._152,
        ..._153
      };
    }
    export namespace commitment {
      export const v1 = {
        ..._154
      };
    }
    export namespace connection {
      export const v1 = {
        ..._155,
        ..._156,
        ..._157
      };
    }
    export namespace types {
      export const v1 = {
        ..._158
      };
    }
  }
  export namespace lightclients {
    export namespace localhost {
      export const v1 = {
        ..._159
      };
    }
    export namespace solomachine {
      export const v1 = {
        ..._160
      };
      export const v2 = {
        ..._161
      };
    }
    export namespace tendermint {
      export const v1 = {
        ..._162
      };
    }
  }
}