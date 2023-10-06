const {toJsonObject} = require('@subql/common');
  const {writeFileSync} =  require('fs');
  const yaml = require('js-yaml');
  const project = toJsonObject((require('${scriptPath}')).default);
  const yamlOutput = yaml.dump(project);
  writeFileSync('/Users/ben/subql-workspace/starters/cosmos-subql-starter/Agoric/agoric-starter', `# // Auto-generated , DO NOT EDIT${yamlOutput}\`)