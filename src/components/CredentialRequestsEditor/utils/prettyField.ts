// This pattern will split camel cased string out of the credential,
// when a camel word contain a sequence of uppercase character it is kept to maintain consistency of that word.
const schemaNamePattern = /([A-Z][a-z0-9]+)/gm;

// Format the camel cased text to a human-readable.
export const prettyField = (field: string) =>
  field
    .split(schemaNamePattern)
    .map((word) => {
      if (word === 'Id') return 'ID';
      if (word === 'Zip') return 'ZIP';
      if (word === 'Ssn') return 'SSN';
      return word;
    })
    .filter((e) => e !== 'Credential')
    .join(' ');
