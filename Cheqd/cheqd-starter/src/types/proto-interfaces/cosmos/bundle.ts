import * as _18 from "./app/v1alpha1/config";
import * as _19 from "./app/v1alpha1/module";
import * as _20 from "./auth/v1beta1/auth";
import * as _21 from "./auth/v1beta1/genesis";
import * as _22 from "./authz/v1beta1/authz";
import * as _23 from "./authz/v1beta1/event";
import * as _24 from "./authz/v1beta1/genesis";
import * as _25 from "./authz/v1beta1/tx";
import * as _26 from "./bank/v1beta1/authz";
import * as _27 from "./bank/v1beta1/bank";
import * as _28 from "./bank/v1beta1/genesis";
import * as _29 from "./bank/v1beta1/tx";
import * as _30 from "./base/abci/v1beta1/abci";
import * as _31 from "./base/kv/v1beta1/kv";
import * as _32 from "./base/query/v1beta1/pagination";
import * as _33 from "./base/reflection/v1beta1/reflection";
import * as _34 from "./base/reflection/v2alpha1/reflection";
import * as _35 from "./base/snapshots/v1beta1/snapshot";
import * as _36 from "./base/store/v1beta1/commit_info";
import * as _37 from "./base/store/v1beta1/listening";
import * as _38 from "./base/v1beta1/coin";
import * as _39 from "./capability/v1beta1/capability";
import * as _40 from "./capability/v1beta1/genesis";
import * as _41 from "./crisis/v1beta1/genesis";
import * as _42 from "./crisis/v1beta1/tx";
import * as _43 from "./crypto/ed25519/keys";
import * as _44 from "./crypto/hd/v1/hd";
import * as _45 from "./crypto/keyring/v1/record";
import * as _46 from "./crypto/multisig/keys";
import * as _47 from "./crypto/secp256k1/keys";
import * as _48 from "./crypto/secp256r1/keys";
import * as _49 from "./distribution/v1beta1/distribution";
import * as _50 from "./distribution/v1beta1/genesis";
import * as _51 from "./distribution/v1beta1/tx";
import * as _52 from "./evidence/v1beta1/evidence";
import * as _53 from "./evidence/v1beta1/genesis";
import * as _54 from "./evidence/v1beta1/tx";
import * as _55 from "./feegrant/v1beta1/feegrant";
import * as _56 from "./feegrant/v1beta1/genesis";
import * as _57 from "./feegrant/v1beta1/tx";
import * as _58 from "./genutil/v1beta1/genesis";
import * as _59 from "./gov/v1/genesis";
import * as _60 from "./gov/v1/gov";
import * as _61 from "./gov/v1/tx";
import * as _62 from "./gov/v1beta1/genesis";
import * as _63 from "./gov/v1beta1/gov";
import * as _64 from "./gov/v1beta1/tx";
import * as _65 from "./group/v1/events";
import * as _66 from "./group/v1/genesis";
import * as _67 from "./group/v1/tx";
import * as _68 from "./group/v1/types";
import * as _69 from "./mint/v1beta1/genesis";
import * as _70 from "./mint/v1beta1/mint";
import * as _71 from "./msg/v1/msg";
import * as _72 from "./slashing/v1beta1/msg";
import * as _73 from "./nft/v1beta1/event";
import * as _74 from "./nft/v1beta1/genesis";
import * as _75 from "./nft/v1beta1/nft";
import * as _76 from "./nft/v1beta1/tx";
import * as _77 from "./orm/v1/orm";
import * as _78 from "./orm/v1alpha1/schema";
import * as _79 from "./params/v1beta1/params";
import * as _80 from "./slashing/v1beta1/genesis";
import * as _81 from "./slashing/v1beta1/slashing";
import * as _82 from "./slashing/v1beta1/tx";
import * as _83 from "./staking/v1beta1/authz";
import * as _84 from "./staking/v1beta1/genesis";
import * as _85 from "./staking/v1beta1/staking";
import * as _86 from "./staking/v1beta1/tx";
import * as _87 from "./tx/signing/v1beta1/signing";
import * as _88 from "./tx/v1beta1/service";
import * as _89 from "./tx/v1beta1/tx";
import * as _90 from "./upgrade/v1beta1/tx";
import * as _91 from "./upgrade/v1beta1/upgrade";
import * as _92 from "./vesting/v1beta1/tx";
import * as _93 from "./vesting/v1beta1/vesting";
export namespace cosmos {
  export namespace app {
    export const v1alpha1 = {
      ..._18,
      ..._19,
    };
  }
  export namespace auth {
    export const v1beta1 = {
      ..._20,
      ..._21,
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._22,
      ..._23,
      ..._24,
      ..._25,
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._26,
      ..._27,
      ..._28,
      ..._29,
    };
  }
  export namespace base {
    export namespace abci {
      export const v1beta1 = {
        ..._30,
      };
    }
    export namespace kv {
      export const v1beta1 = {
        ..._31,
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._32,
      };
    }
    export namespace reflection {
      export const v1beta1 = {
        ..._33,
      };
      export const v2alpha1 = {
        ..._34,
      };
    }
    export namespace snapshots {
      export const v1beta1 = {
        ..._35,
      };
    }
    export namespace store {
      export const v1beta1 = {
        ..._36,
        ..._37,
      };
    }
    export const v1beta1 = {
      ..._38,
    };
  }
  export namespace capability {
    export const v1beta1 = {
      ..._39,
      ..._40,
    };
  }
  export namespace crisis {
    export const v1beta1 = {
      ..._41,
      ..._42,
    };
  }
  export namespace crypto {
    export const ed25519 = {
      ..._43,
    };
    export namespace hd {
      export const v1 = {
        ..._44,
      };
    }
    export namespace keyring {
      export const v1 = {
        ..._45,
      };
    }
    export const multisig = {
      ..._46,
    };
    export const secp256k1 = {
      ..._47,
    };
    export const secp256r1 = {
      ..._48,
    };
  }
  export namespace distribution {
    export const v1beta1 = {
      ..._49,
      ..._50,
      ..._51,
    };
  }
  export namespace evidence {
    export const v1beta1 = {
      ..._52,
      ..._53,
      ..._54,
    };
  }
  export namespace feegrant {
    export const v1beta1 = {
      ..._55,
      ..._56,
      ..._57,
    };
  }
  export namespace genutil {
    export const v1beta1 = {
      ..._58,
    };
  }
  export namespace gov {
    export const v1 = {
      ..._59,
      ..._60,
      ..._61,
    };
    export const v1beta1 = {
      ..._62,
      ..._63,
      ..._64,
    };
  }
  export namespace group {
    export const v1 = {
      ..._65,
      ..._66,
      ..._67,
      ..._68,
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._69,
      ..._70,
    };
  }
  export namespace msg {
    export const v1 = {
      ..._71,
      ..._72,
    };
  }
  export namespace nft {
    export const v1beta1 = {
      ..._73,
      ..._74,
      ..._75,
      ..._76,
    };
  }
  export namespace orm {
    export const v1 = {
      ..._77,
    };
    export const v1alpha1 = {
      ..._78,
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._79,
    };
  }
  export namespace slashing {
    export const v1beta1 = {
      ..._80,
      ..._81,
      ..._82,
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._83,
      ..._84,
      ..._85,
      ..._86,
    };
  }
  export namespace tx {
    export namespace signing {
      export const v1beta1 = {
        ..._87,
      };
    }
    export const v1beta1 = {
      ..._88,
      ..._89,
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._90,
      ..._91,
    };
  }
  export namespace vesting {
    export const v1beta1 = {
      ..._92,
      ..._93,
    };
  }
}
