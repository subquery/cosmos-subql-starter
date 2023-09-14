import * as _110 from "./envoy/v1beta1/genesis";
import * as _111 from "./envoy/v1beta1/tx";
import * as _112 from "./incentives/v1beta1/genesis";
import * as _113 from "./incentives/v1beta1/store";
import * as _114 from "./incentives/v1beta1/tx";
import * as _115 from "./safety/v1beta1/genesis";
import * as _116 from "./safety/v1beta1/tx";
export namespace mars {
  export namespace envoy {
    export const v1beta1 = {
      ..._110,
      ..._111,
    };
  }
  export namespace incentives {
    export const v1beta1 = {
      ..._112,
      ..._113,
      ..._114,
    };
  }
  export namespace safety {
    export const v1beta1 = {
      ..._115,
      ..._116,
    };
  }
}
