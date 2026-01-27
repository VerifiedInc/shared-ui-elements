const domainCom = [
  'duck',
  'gmail',
  'yahoo',
  'hotmail',
  'aol',
  'outlook',
  'icloud',
  'msn',
  'live',
  'me',
  'mac',
  'rocketmail',
  'mail',
  'superhuman',
];

const domainNet = ['comcast', 'verizon', 'sbcglobal', 'charter', 'att'];

const domainRu = ['mail'];

export const emailRegexPattern =
  '^[a-zA-Z0-9._%+-]+@(?!(' +
  domainCom.map((domain) => domain + '\\.com').join('|') +
  '|' +
  domainNet.map((domain) => domain + '\\.net').join('|') +
  '|' +
  domainRu.map((domain) => domain + '\\.ru').join('|') +
  ')$)[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

export const emailInputPattern = `((?!@(${
  domainCom.map((domain) => domain + '.com').join('|') +
  '|' +
  domainNet.map((domain) => domain + '.net').join('|') +
  '|' +
  domainRu.map((domain) => domain + '.ru').join('|')
})).)*`;
