import * as _2 from "./app/v1alpha1/config";
import * as _3 from "./app/v1alpha1/module";
import * as _4 from "./auth/v1beta1/auth";
import * as _5 from "./auth/v1beta1/genesis";
import * as _6 from "./authz/v1beta1/authz";
import * as _7 from "./authz/v1beta1/event";
import * as _8 from "./authz/v1beta1/genesis";
import * as _9 from "./authz/v1beta1/tx";
import * as _10 from "./bank/v1beta1/authz";
import * as _11 from "./bank/v1beta1/bank";
import * as _12 from "./bank/v1beta1/genesis";
import * as _13 from "./bank/v1beta1/tx";
import * as _14 from "./base/abci/v1beta1/abci";
import * as _15 from "./base/kv/v1beta1/kv";
import * as _16 from "./base/query/v1beta1/pagination";
import * as _17 from "./base/reflection/v1beta1/reflection";
import * as _18 from "./base/reflection/v2alpha1/reflection";
import * as _19 from "./base/snapshots/v1beta1/snapshot";
import * as _20 from "./base/store/v1beta1/commit_info";
import * as _21 from "./base/store/v1beta1/listening";
import * as _22 from "./base/v1beta1/coin";
import * as _23 from "./capability/v1beta1/capability";
import * as _24 from "./capability/v1beta1/genesis";
import * as _25 from "./crisis/v1beta1/genesis";
import * as _26 from "./crisis/v1beta1/tx";
import * as _27 from "./crypto/ed25519/keys";
import * as _28 from "./crypto/hd/v1/hd";
import * as _29 from "./crypto/keyring/v1/record";
import * as _30 from "./crypto/multisig/keys";
import * as _31 from "./crypto/secp256k1/keys";
import * as _32 from "./crypto/secp256r1/keys";
import * as _33 from "./distribution/v1beta1/distribution";
import * as _34 from "./distribution/v1beta1/genesis";
import * as _35 from "./distribution/v1beta1/tx";
import * as _36 from "./evidence/v1beta1/evidence";
import * as _37 from "./evidence/v1beta1/genesis";
import * as _38 from "./evidence/v1beta1/tx";
import * as _39 from "./feegrant/v1beta1/feegrant";
import * as _40 from "./feegrant/v1beta1/genesis";
import * as _41 from "./feegrant/v1beta1/tx";
import * as _42 from "./genutil/v1beta1/genesis";
import * as _43 from "./gov/v1/genesis";
import * as _44 from "./gov/v1/gov";
import * as _45 from "./gov/v1/tx";
import * as _46 from "./gov/v1beta1/genesis";
import * as _47 from "./gov/v1beta1/gov";
import * as _48 from "./gov/v1beta1/tx";
import * as _49 from "./group/v1/events";
import * as _50 from "./group/v1/genesis";
import * as _51 from "./group/v1/tx";
import * as _52 from "./group/v1/types";
import * as _53 from "./mint/v1beta1/genesis";
import * as _54 from "./mint/v1beta1/mint";
import * as _55 from "./msg/v1/msg";
import * as _56 from "./slashing/v1beta1/msg";
import * as _57 from "./nft/v1beta1/event";
import * as _58 from "./nft/v1beta1/genesis";
import * as _59 from "./nft/v1beta1/nft";
import * as _60 from "./nft/v1beta1/tx";
import * as _61 from "./orm/v1/orm";
import * as _62 from "./orm/v1alpha1/schema";
import * as _63 from "./params/v1beta1/params";
import * as _64 from "./slashing/v1beta1/genesis";
import * as _65 from "./slashing/v1beta1/slashing";
import * as _66 from "./slashing/v1beta1/tx";
import * as _67 from "./staking/v1beta1/authz";
import * as _68 from "./staking/v1beta1/genesis";
import * as _69 from "./staking/v1beta1/staking";
import * as _70 from "./staking/v1beta1/tx";
import * as _71 from "./tx/signing/v1beta1/signing";
import * as _72 from "./tx/v1beta1/service";
import * as _73 from "./tx/v1beta1/tx";
import * as _74 from "./upgrade/v1beta1/tx";
import * as _75 from "./upgrade/v1beta1/upgrade";
import * as _76 from "./vesting/v1beta1/tx";
import * as _77 from "./vesting/v1beta1/vesting";
import * as _78 from "../tendermint/budget/v1beta1/budget";
import * as _79 from "../tendermint/budget/v1beta1/genesis";
export namespace cosmos {
  export namespace app {
    export const v1alpha1 = {
      ..._2,
      ..._3
    };
  }
  export namespace auth {
    export const v1beta1 = {
      ..._4,
      ..._5
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._6,
      ..._7,
      ..._8,
      ..._9
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._10,
      ..._11,
      ..._12,
      ..._13
    };
  }
  export namespace base {
    export namespace abci {
      export const v1beta1 = {
        ..._14
      };
    }
    export namespace kv {
      export const v1beta1 = {
        ..._15
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._16
      };
    }
    export namespace reflection {
      export const v1beta1 = {
        ..._17
      };
      export const v2alpha1 = {
        ..._18
      };
    }
    export namespace snapshots {
      export const v1beta1 = {
        ..._19
      };
    }
    export namespace store {
      export const v1beta1 = {
        ..._20,
        ..._21
      };
    }
    export const v1beta1 = {
      ..._22
    };
  }
  export namespace capability {
    export const v1beta1 = {
      ..._23,
      ..._24
    };
  }
  export namespace crisis {
    export const v1beta1 = {
      ..._25,
      ..._26
    };
  }
  export namespace crypto {
    export const ed25519 = {
      ..._27
    };
    export namespace hd {
      export const v1 = {
        ..._28
      };
    }
    export namespace keyring {
      export const v1 = {
        ..._29
      };
    }
    export const multisig = {
      ..._30
    };
    export const secp256k1 = {
      ..._31
    };
    export const secp256r1 = {
      ..._32
    };
  }
  export namespace distribution {
    export const v1beta1 = {
      ..._33,
      ..._34,
      ..._35
    };
  }
  export namespace evidence {
    export const v1beta1 = {
      ..._36,
      ..._37,
      ..._38
    };
  }
  export namespace feegrant {
    export const v1beta1 = {
      ..._39,
      ..._40,
      ..._41
    };
  }
  export namespace genutil {
    export const v1beta1 = {
      ..._42
    };
  }
  export namespace gov {
    export const v1 = {
      ..._43,
      ..._44,
      ..._45
    };
    export const v1beta1 = {
      ..._46,
      ..._47,
      ..._48
    };
  }
  export namespace group {
    export const v1 = {
      ..._49,
      ..._50,
      ..._51,
      ..._52
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._53,
      ..._54
    };
  }
  export namespace msg {
    export const v1 = {
      ..._55,
      ..._56
    };
  }
  export namespace nft {
    export const v1beta1 = {
      ..._57,
      ..._58,
      ..._59,
      ..._60
    };
  }
  export namespace orm {
    export const v1 = {
      ..._61
    };
    export const v1alpha1 = {
      ..._62
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._63
    };
  }
  export namespace slashing {
    export const v1beta1 = {
      ..._64,
      ..._65,
      ..._66
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._67,
      ..._68,
      ..._69,
      ..._70
    };
  }
  export namespace tx {
    export namespace signing {
      export const v1beta1 = {
        ..._71
      };
    }
    export const v1beta1 = {
      ..._72,
      ..._73
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._74,
      ..._75
    };
  }
  export namespace vesting {
    export const v1beta1 = {
      ..._76,
      ..._77
    };
  }
  export namespace budget {
    export const v1beta1 = {
      ..._78,
      ..._79
    };
  }
}