import * as _33 from "./app/v1alpha1/config";
import * as _34 from "./app/v1alpha1/module";
import * as _35 from "./auth/v1beta1/auth";
import * as _36 from "./auth/v1beta1/genesis";
import * as _37 from "./authz/v1beta1/authz";
import * as _38 from "./authz/v1beta1/event";
import * as _39 from "./authz/v1beta1/genesis";
import * as _40 from "./authz/v1beta1/tx";
import * as _41 from "./bank/v1beta1/authz";
import * as _42 from "./bank/v1beta1/bank";
import * as _43 from "./bank/v1beta1/genesis";
import * as _44 from "./bank/v1beta1/tx";
import * as _45 from "./base/abci/v1beta1/abci";
import * as _46 from "./base/kv/v1beta1/kv";
import * as _47 from "./base/query/v1beta1/pagination";
import * as _48 from "./base/reflection/v1beta1/reflection";
import * as _49 from "./base/reflection/v2alpha1/reflection";
import * as _50 from "./base/snapshots/v1beta1/snapshot";
import * as _51 from "./base/store/v1beta1/commit_info";
import * as _52 from "./base/store/v1beta1/listening";
import * as _53 from "./base/v1beta1/coin";
import * as _54 from "./capability/v1beta1/capability";
import * as _55 from "./capability/v1beta1/genesis";
import * as _56 from "./crisis/v1beta1/genesis";
import * as _57 from "./crisis/v1beta1/tx";
import * as _58 from "./crypto/ed25519/keys";
import * as _59 from "./crypto/hd/v1/hd";
import * as _60 from "./crypto/keyring/v1/record";
import * as _61 from "./crypto/multisig/keys";
import * as _62 from "./crypto/secp256k1/keys";
import * as _63 from "./crypto/secp256r1/keys";
import * as _64 from "./distribution/v1beta1/distribution";
import * as _65 from "./distribution/v1beta1/genesis";
import * as _66 from "./distribution/v1beta1/tx";
import * as _67 from "./evidence/v1beta1/evidence";
import * as _68 from "./evidence/v1beta1/genesis";
import * as _69 from "./evidence/v1beta1/tx";
import * as _70 from "./feegrant/v1beta1/feegrant";
import * as _71 from "./feegrant/v1beta1/genesis";
import * as _72 from "./feegrant/v1beta1/tx";
import * as _73 from "./genutil/v1beta1/genesis";
import * as _74 from "./gov/v1/genesis";
import * as _75 from "./gov/v1/gov";
import * as _76 from "./gov/v1/tx";
import * as _77 from "./gov/v1beta1/genesis";
import * as _78 from "./gov/v1beta1/gov";
import * as _79 from "./gov/v1beta1/tx";
import * as _80 from "./group/v1/events";
import * as _81 from "./group/v1/genesis";
import * as _82 from "./group/v1/tx";
import * as _83 from "./group/v1/types";
import * as _84 from "./mint/v1beta1/genesis";
import * as _85 from "./mint/v1beta1/mint";
import * as _86 from "./msg/v1/msg";
import * as _87 from "./slashing/v1beta1/msg";
import * as _88 from "./nft/v1beta1/event";
import * as _89 from "./nft/v1beta1/genesis";
import * as _90 from "./nft/v1beta1/nft";
import * as _91 from "./nft/v1beta1/tx";
import * as _92 from "./orm/v1/orm";
import * as _93 from "./orm/v1alpha1/schema";
import * as _94 from "./params/v1beta1/params";
import * as _95 from "./slashing/v1beta1/genesis";
import * as _96 from "./slashing/v1beta1/slashing";
import * as _97 from "./slashing/v1beta1/tx";
import * as _98 from "./staking/v1beta1/authz";
import * as _99 from "./staking/v1beta1/genesis";
import * as _100 from "./staking/v1beta1/staking";
import * as _101 from "./staking/v1beta1/tx";
import * as _102 from "./tx/signing/v1beta1/signing";
import * as _103 from "./tx/v1beta1/service";
import * as _104 from "./tx/v1beta1/tx";
import * as _105 from "./upgrade/v1beta1/tx";
import * as _106 from "./upgrade/v1beta1/upgrade";
import * as _107 from "./vesting/v1beta1/tx";
import * as _108 from "./vesting/v1beta1/vesting";
export namespace cosmos {
  export namespace app {
    export const v1alpha1 = {
      ..._33,
      ..._34
    };
  }
  export namespace auth {
    export const v1beta1 = {
      ..._35,
      ..._36
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._37,
      ..._38,
      ..._39,
      ..._40
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._41,
      ..._42,
      ..._43,
      ..._44
    };
  }
  export namespace base {
    export namespace abci {
      export const v1beta1 = {
        ..._45
      };
    }
    export namespace kv {
      export const v1beta1 = {
        ..._46
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._47
      };
    }
    export namespace reflection {
      export const v1beta1 = {
        ..._48
      };
      export const v2alpha1 = {
        ..._49
      };
    }
    export namespace snapshots {
      export const v1beta1 = {
        ..._50
      };
    }
    export namespace store {
      export const v1beta1 = {
        ..._51,
        ..._52
      };
    }
    export const v1beta1 = {
      ..._53
    };
  }
  export namespace capability {
    export const v1beta1 = {
      ..._54,
      ..._55
    };
  }
  export namespace crisis {
    export const v1beta1 = {
      ..._56,
      ..._57
    };
  }
  export namespace crypto {
    export const ed25519 = {
      ..._58
    };
    export namespace hd {
      export const v1 = {
        ..._59
      };
    }
    export namespace keyring {
      export const v1 = {
        ..._60
      };
    }
    export const multisig = {
      ..._61
    };
    export const secp256k1 = {
      ..._62
    };
    export const secp256r1 = {
      ..._63
    };
  }
  export namespace distribution {
    export const v1beta1 = {
      ..._64,
      ..._65,
      ..._66
    };
  }
  export namespace evidence {
    export const v1beta1 = {
      ..._67,
      ..._68,
      ..._69
    };
  }
  export namespace feegrant {
    export const v1beta1 = {
      ..._70,
      ..._71,
      ..._72
    };
  }
  export namespace genutil {
    export const v1beta1 = {
      ..._73
    };
  }
  export namespace gov {
    export const v1 = {
      ..._74,
      ..._75,
      ..._76
    };
    export const v1beta1 = {
      ..._77,
      ..._78,
      ..._79
    };
  }
  export namespace group {
    export const v1 = {
      ..._80,
      ..._81,
      ..._82,
      ..._83
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._84,
      ..._85
    };
  }
  export namespace msg {
    export const v1 = {
      ..._86,
      ..._87
    };
  }
  export namespace nft {
    export const v1beta1 = {
      ..._88,
      ..._89,
      ..._90,
      ..._91
    };
  }
  export namespace orm {
    export const v1 = {
      ..._92
    };
    export const v1alpha1 = {
      ..._93
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._94
    };
  }
  export namespace slashing {
    export const v1beta1 = {
      ..._95,
      ..._96,
      ..._97
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._98,
      ..._99,
      ..._100,
      ..._101
    };
  }
  export namespace tx {
    export namespace signing {
      export const v1beta1 = {
        ..._102
      };
    }
    export const v1beta1 = {
      ..._103,
      ..._104
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._105,
      ..._106
    };
  }
  export namespace vesting {
    export const v1beta1 = {
      ..._107,
      ..._108
    };
  }
}