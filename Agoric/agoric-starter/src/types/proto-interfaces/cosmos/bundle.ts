import * as _13 from "./app/v1alpha1/config";
import * as _14 from "./app/v1alpha1/module";
import * as _15 from "./auth/v1beta1/auth";
import * as _16 from "./auth/v1beta1/genesis";
import * as _17 from "./authz/v1beta1/authz";
import * as _18 from "./authz/v1beta1/event";
import * as _19 from "./authz/v1beta1/genesis";
import * as _20 from "./authz/v1beta1/tx";
import * as _21 from "./bank/v1beta1/authz";
import * as _22 from "./bank/v1beta1/bank";
import * as _23 from "./bank/v1beta1/genesis";
import * as _24 from "./bank/v1beta1/tx";
import * as _25 from "./base/abci/v1beta1/abci";
import * as _26 from "./base/kv/v1beta1/kv";
import * as _27 from "./base/query/v1beta1/pagination";
import * as _28 from "./base/reflection/v1beta1/reflection";
import * as _29 from "./base/reflection/v2alpha1/reflection";
import * as _30 from "./base/snapshots/v1beta1/snapshot";
import * as _31 from "./base/store/v1beta1/commit_info";
import * as _32 from "./base/store/v1beta1/listening";
import * as _33 from "./base/v1beta1/coin";
import * as _34 from "./capability/v1beta1/capability";
import * as _35 from "./capability/v1beta1/genesis";
import * as _36 from "./crisis/v1beta1/genesis";
import * as _37 from "./crisis/v1beta1/tx";
import * as _38 from "./crypto/ed25519/keys";
import * as _39 from "./crypto/hd/v1/hd";
import * as _40 from "./crypto/keyring/v1/record";
import * as _41 from "./crypto/multisig/keys";
import * as _42 from "./crypto/secp256k1/keys";
import * as _43 from "./crypto/secp256r1/keys";
import * as _44 from "./distribution/v1beta1/distribution";
import * as _45 from "./distribution/v1beta1/genesis";
import * as _46 from "./distribution/v1beta1/tx";
import * as _47 from "./evidence/v1beta1/evidence";
import * as _48 from "./evidence/v1beta1/genesis";
import * as _49 from "./evidence/v1beta1/tx";
import * as _50 from "./feegrant/v1beta1/feegrant";
import * as _51 from "./feegrant/v1beta1/genesis";
import * as _52 from "./feegrant/v1beta1/tx";
import * as _53 from "./genutil/v1beta1/genesis";
import * as _54 from "./gov/v1/genesis";
import * as _55 from "./gov/v1/gov";
import * as _56 from "./gov/v1/tx";
import * as _57 from "./gov/v1beta1/genesis";
import * as _58 from "./gov/v1beta1/gov";
import * as _59 from "./gov/v1beta1/tx";
import * as _60 from "./group/v1/events";
import * as _61 from "./group/v1/genesis";
import * as _62 from "./group/v1/tx";
import * as _63 from "./group/v1/types";
import * as _64 from "./mint/v1beta1/genesis";
import * as _65 from "./mint/v1beta1/mint";
import * as _66 from "./msg/v1/msg";
import * as _67 from "./slashing/v1beta1/msg";
import * as _68 from "./nft/v1beta1/event";
import * as _69 from "./nft/v1beta1/genesis";
import * as _70 from "./nft/v1beta1/nft";
import * as _71 from "./nft/v1beta1/tx";
import * as _72 from "./orm/v1/orm";
import * as _73 from "./orm/v1alpha1/schema";
import * as _74 from "./params/v1beta1/params";
import * as _75 from "./slashing/v1beta1/genesis";
import * as _76 from "./slashing/v1beta1/slashing";
import * as _77 from "./slashing/v1beta1/tx";
import * as _78 from "./staking/v1beta1/authz";
import * as _79 from "./staking/v1beta1/genesis";
import * as _80 from "./staking/v1beta1/staking";
import * as _81 from "./staking/v1beta1/tx";
import * as _82 from "./tx/signing/v1beta1/signing";
import * as _83 from "./tx/v1beta1/service";
import * as _84 from "./tx/v1beta1/tx";
import * as _85 from "./upgrade/v1beta1/tx";
import * as _86 from "./upgrade/v1beta1/upgrade";
import * as _87 from "./vesting/v1beta1/tx";
import * as _88 from "./vesting/v1beta1/vesting";
export namespace cosmos {
  export namespace app {
    export const v1alpha1 = {
      ..._13,
      ..._14
    };
  }
  export namespace auth {
    export const v1beta1 = {
      ..._15,
      ..._16
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._17,
      ..._18,
      ..._19,
      ..._20
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._21,
      ..._22,
      ..._23,
      ..._24
    };
  }
  export namespace base {
    export namespace abci {
      export const v1beta1 = {
        ..._25
      };
    }
    export namespace kv {
      export const v1beta1 = {
        ..._26
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._27
      };
    }
    export namespace reflection {
      export const v1beta1 = {
        ..._28
      };
      export const v2alpha1 = {
        ..._29
      };
    }
    export namespace snapshots {
      export const v1beta1 = {
        ..._30
      };
    }
    export namespace store {
      export const v1beta1 = {
        ..._31,
        ..._32
      };
    }
    export const v1beta1 = {
      ..._33
    };
  }
  export namespace capability {
    export const v1beta1 = {
      ..._34,
      ..._35
    };
  }
  export namespace crisis {
    export const v1beta1 = {
      ..._36,
      ..._37
    };
  }
  export namespace crypto {
    export const ed25519 = {
      ..._38
    };
    export namespace hd {
      export const v1 = {
        ..._39
      };
    }
    export namespace keyring {
      export const v1 = {
        ..._40
      };
    }
    export const multisig = {
      ..._41
    };
    export const secp256k1 = {
      ..._42
    };
    export const secp256r1 = {
      ..._43
    };
  }
  export namespace distribution {
    export const v1beta1 = {
      ..._44,
      ..._45,
      ..._46
    };
  }
  export namespace evidence {
    export const v1beta1 = {
      ..._47,
      ..._48,
      ..._49
    };
  }
  export namespace feegrant {
    export const v1beta1 = {
      ..._50,
      ..._51,
      ..._52
    };
  }
  export namespace genutil {
    export const v1beta1 = {
      ..._53
    };
  }
  export namespace gov {
    export const v1 = {
      ..._54,
      ..._55,
      ..._56
    };
    export const v1beta1 = {
      ..._57,
      ..._58,
      ..._59
    };
  }
  export namespace group {
    export const v1 = {
      ..._60,
      ..._61,
      ..._62,
      ..._63
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._64,
      ..._65
    };
  }
  export namespace msg {
    export const v1 = {
      ..._66,
      ..._67
    };
  }
  export namespace nft {
    export const v1beta1 = {
      ..._68,
      ..._69,
      ..._70,
      ..._71
    };
  }
  export namespace orm {
    export const v1 = {
      ..._72
    };
    export const v1alpha1 = {
      ..._73
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._74
    };
  }
  export namespace slashing {
    export const v1beta1 = {
      ..._75,
      ..._76,
      ..._77
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._78,
      ..._79,
      ..._80,
      ..._81
    };
  }
  export namespace tx {
    export namespace signing {
      export const v1beta1 = {
        ..._82
      };
    }
    export const v1beta1 = {
      ..._83,
      ..._84
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._85,
      ..._86
    };
  }
  export namespace vesting {
    export const v1beta1 = {
      ..._87,
      ..._88
    };
  }
}