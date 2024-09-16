import { createContext, type PropsWithChildren, useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { type CredentialRequestsWithNew } from './types/form';

export interface CredentialRequestsEditorContext {
  credentialRequests: CredentialRequestsWithNew[];
  schemas: Record<string, any>;
}

const Context = createContext<CredentialRequestsEditorContext | null>(null);

export function useCredentialRequestsEditor(): CredentialRequestsEditorContext {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      'useCredentialRequestsEditor must be used within a CredentialRequestsEditorProvider',
    );
  }
  return context;
}

const schemas = {
  CityCredential: {
    $id: 'CityCredential',
    type: 'object',
    properties: {
      city: {
        description: 'The city of the address.',
        examples: ['San Francisco', 'New York', 'Atlanta'],
        title: 'City',
        displayFormat: 'String',
        input: {
          type: 'Text',
        },
        type: 'string',
      },
    },
    required: ['city'],
  },
  CountryCredential: {
    $id: 'CountryCredential',
    type: 'object',
    properties: {
      country: {
        format: 'iso3361Alpha2',
        examples: ['US', 'CA', 'MX'],
        description: "A country's ISO 3166-1 alpha-2 code.",
        title: 'Country',
        displayFormat: 'String',
        input: {
          type: 'Select',
          options: [
            {
              value: 'US',
              label: 'United States of America',
            },
            {
              value: 'CA',
              label: 'Canada',
            },
            {
              value: 'AF',
              label: 'Afghanistan',
            },
            {
              value: 'AL',
              label: 'Albania',
            },
            {
              value: 'DZ',
              label: 'Algeria',
            },
            {
              value: 'AS',
              label: 'American Samoa',
            },
            {
              value: 'AD',
              label: 'Andorra',
            },
            {
              value: 'AO',
              label: 'Angola',
            },
            {
              value: 'AI',
              label: 'Anguilla',
            },
            {
              value: 'AQ',
              label: 'Antarctica',
            },
            {
              value: 'AG',
              label: 'Antigua and Barbuda',
            },
            {
              value: 'AR',
              label: 'Argentina',
            },
            {
              value: 'AM',
              label: 'Armenia',
            },
            {
              value: 'AW',
              label: 'Aruba',
            },
            {
              value: 'AU',
              label: 'Australia',
            },
            {
              value: 'AT',
              label: 'Austria',
            },
            {
              value: 'AZ',
              label: 'Azerbaijan',
            },
            {
              value: 'BS',
              label: 'Bahamas',
            },
            {
              value: 'BH',
              label: 'Bahrain',
            },
            {
              value: 'BD',
              label: 'Bangladesh',
            },
            {
              value: 'BB',
              label: 'Barbados',
            },
            {
              value: 'BY',
              label: 'Belarus',
            },
            {
              value: 'BE',
              label: 'Belgium',
            },
            {
              value: 'BZ',
              label: 'Belize',
            },
            {
              value: 'BJ',
              label: 'Benin',
            },
            {
              value: 'BM',
              label: 'Bermuda',
            },
            {
              value: 'BT',
              label: 'Bhutan',
            },
            {
              value: 'BO',
              label: 'Bolivia (Plurinational State of)',
            },
            {
              value: 'BQ',
              label: 'Bonaire, Sint Eustatius and Saba',
            },
            {
              value: 'BA',
              label: 'Bosnia and Herzegovina',
            },
            {
              value: 'BW',
              label: 'Botswana',
            },
            {
              value: 'BV',
              label: 'Bouvet Island',
            },
            {
              value: 'BR',
              label: 'Brazil',
            },
            {
              value: 'IO',
              label: 'British Indian Ocean Territory',
            },
            {
              value: 'BN',
              label: 'Brunei Darussalam',
            },
            {
              value: 'BG',
              label: 'Bulgaria',
            },
            {
              value: 'BF',
              label: 'Burkina Faso',
            },
            {
              value: 'BI',
              label: 'Burundi',
            },
            {
              value: 'CV',
              label: 'Cabo Verde',
            },
            {
              value: 'KH',
              label: 'Cambodia',
            },
            {
              value: 'CM',
              label: 'Cameroon',
            },
            {
              value: 'KY',
              label: 'Cayman Islands',
            },
            {
              value: 'CF',
              label: 'Central African Republic',
            },
            {
              value: 'TD',
              label: 'Chad',
            },
            {
              value: 'CL',
              label: 'Chile',
            },
            {
              value: 'CN',
              label: 'China',
            },
            {
              value: 'CX',
              label: 'Christmas Island',
            },
            {
              value: 'CC',
              label: 'Cocos (Keeling) Islands',
            },
            {
              value: 'CO',
              label: 'Colombia',
            },
            {
              value: 'KM',
              label: 'Comoros',
            },
            {
              value: 'CG',
              label: 'Congo',
            },
            {
              value: 'CD',
              label: 'Congo (Democratic Republic of the)',
            },
            {
              value: 'CK',
              label: 'Cook Islands',
            },
            {
              value: 'CR',
              label: 'Costa Rica',
            },
            {
              value: 'CI',
              label: "Côte d'Ivoire",
            },
            {
              value: 'HR',
              label: 'Croatia',
            },
            {
              value: 'CU',
              label: 'Cuba',
            },
            {
              value: 'CW',
              label: 'Curaçao',
            },
            {
              value: 'CY',
              label: 'Cyprus',
            },
            {
              value: 'CZ',
              label: 'Czechia',
            },
            {
              value: 'DK',
              label: 'Denmark',
            },
            {
              value: 'DJ',
              label: 'Djibouti',
            },
            {
              value: 'DM',
              label: 'Dominica',
            },
            {
              value: 'DO',
              label: 'Dominican Republic',
            },
            {
              value: 'EC',
              label: 'Ecuador',
            },
            {
              value: 'EG',
              label: 'Egypt',
            },
            {
              value: 'SV',
              label: 'El Salvador',
            },
            {
              value: 'GQ',
              label: 'Equatorial Guinea',
            },
            {
              value: 'ER',
              label: 'Eritrea',
            },
            {
              value: 'EE',
              label: 'Estonia',
            },
            {
              value: 'SZ',
              label: 'Eswatini',
            },
            {
              value: 'ET',
              label: 'Ethiopia',
            },
            {
              value: 'FK',
              label: 'Falkland Islands (Malvinas)',
            },
            {
              value: 'FO',
              label: 'Faroe Islands',
            },
            {
              value: 'FJ',
              label: 'Fiji',
            },
            {
              value: 'FI',
              label: 'Finland',
            },
            {
              value: 'FR',
              label: 'France',
            },
            {
              value: 'GF',
              label: 'French Guiana',
            },
            {
              value: 'PF',
              label: 'French Polynesia',
            },
            {
              value: 'TF',
              label: 'French Southern Territories',
            },
            {
              value: 'GA',
              label: 'Gabon',
            },
            {
              value: 'GM',
              label: 'Gambia',
            },
            {
              value: 'GE',
              label: 'Georgia',
            },
            {
              value: 'DE',
              label: 'Germany',
            },
            {
              value: 'GH',
              label: 'Ghana',
            },
            {
              value: 'GI',
              label: 'Gibraltar',
            },
            {
              value: 'GR',
              label: 'Greece',
            },
            {
              value: 'GL',
              label: 'Greenland',
            },
            {
              value: 'GD',
              label: 'Grenada',
            },
            {
              value: 'GP',
              label: 'Guadeloupe',
            },
            {
              value: 'GU',
              label: 'Guam',
            },
            {
              value: 'GT',
              label: 'Guatemala',
            },
            {
              value: 'GG',
              label: 'Guernsey',
            },
            {
              value: 'GN',
              label: 'Guinea',
            },
            {
              value: 'GW',
              label: 'Guinea-Bissau',
            },
            {
              value: 'GY',
              label: 'Guyana',
            },
            {
              value: 'HT',
              label: 'Haiti',
            },
            {
              value: 'HM',
              label: 'Heard Island and McDonald Islands',
            },
            {
              value: 'VA',
              label: 'Holy See',
            },
            {
              value: 'HN',
              label: 'Honduras',
            },
            {
              value: 'HK',
              label: 'Hong Kong',
            },
            {
              value: 'HU',
              label: 'Hungary',
            },
            {
              value: 'IS',
              label: 'Iceland',
            },
            {
              value: 'IN',
              label: 'India',
            },
            {
              value: 'ID',
              label: 'Indonesia',
            },
            {
              value: 'IR',
              label: 'Iran (Islamic Republic of)',
            },
            {
              value: 'IQ',
              label: 'Iraq',
            },
            {
              value: 'IE',
              label: 'Ireland',
            },
            {
              value: 'IM',
              label: 'Isle of Man',
            },
            {
              value: 'IL',
              label: 'Israel',
            },
            {
              value: 'IT',
              label: 'Italy',
            },
            {
              value: 'JM',
              label: 'Jamaica',
            },
            {
              value: 'JP',
              label: 'Japan',
            },
            {
              value: 'JE',
              label: 'Jersey',
            },
            {
              value: 'JO',
              label: 'Jordan',
            },
            {
              value: 'KZ',
              label: 'Kazakhstan',
            },
            {
              value: 'KE',
              label: 'Kenya',
            },
            {
              value: 'KI',
              label: 'Kiribati',
            },
            {
              value: 'KP',
              label: "Korea (Democratic People's Republic of)",
            },
            {
              value: 'KR',
              label: 'Korea (Republic of)',
            },
            {
              value: 'KW',
              label: 'Kuwait',
            },
            {
              value: 'KG',
              label: 'Kyrgyzstan',
            },
            {
              value: 'LA',
              label: "Lao People's Democratic Republic",
            },
            {
              value: 'LV',
              label: 'Latvia',
            },
            {
              value: 'LB',
              label: 'Lebanon',
            },
            {
              value: 'LS',
              label: 'Lesotho',
            },
            {
              value: 'LR',
              label: 'Liberia',
            },
            {
              value: 'LY',
              label: 'Libya',
            },
            {
              value: 'LI',
              label: 'Liechtenstein',
            },
            {
              value: 'LT',
              label: 'Lithuania',
            },
            {
              value: 'LU',
              label: 'Luxembourg',
            },
            {
              value: 'MO',
              label: 'Macao',
            },
            {
              value: 'MG',
              label: 'Madagascar',
            },
            {
              value: 'MW',
              label: 'Malawi',
            },
            {
              value: 'MY',
              label: 'Malaysia',
            },
            {
              value: 'MV',
              label: 'Maldives',
            },
            {
              value: 'ML',
              label: 'Mali',
            },
            {
              value: 'MT',
              label: 'Malta',
            },
            {
              value: 'MH',
              label: 'Marshall Islands',
            },
            {
              value: 'MQ',
              label: 'Martinique',
            },
            {
              value: 'MR',
              label: 'Mauritania',
            },
            {
              value: 'MU',
              label: 'Mauritius',
            },
            {
              value: 'YT',
              label: 'Mayotte',
            },
            {
              value: 'MX',
              label: 'Mexico',
            },
            {
              value: 'FM',
              label: 'Micronesia (Federated States of)',
            },
            {
              value: 'MD',
              label: 'Moldova (Republic of)',
            },
            {
              value: 'MC',
              label: 'Monaco',
            },
            {
              value: 'MN',
              label: 'Mongolia',
            },
            {
              value: 'ME',
              label: 'Montenegro',
            },
            {
              value: 'MS',
              label: 'Montserrat',
            },
            {
              value: 'MA',
              label: 'Morocco',
            },
            {
              value: 'MZ',
              label: 'Mozambique',
            },
            {
              value: 'MM',
              label: 'Myanmar',
            },
            {
              value: 'NA',
              label: 'Namibia',
            },
            {
              value: 'NR',
              label: 'Nauru',
            },
            {
              value: 'NP',
              label: 'Nepal',
            },
            {
              value: 'NL',
              label: 'Netherlands',
            },
            {
              value: 'NC',
              label: 'New Caledonia',
            },
            {
              value: 'NZ',
              label: 'New Zealand',
            },
            {
              value: 'NI',
              label: 'Nicaragua',
            },
            {
              value: 'NE',
              label: 'Niger',
            },
            {
              value: 'NG',
              label: 'Nigeria',
            },
            {
              value: 'NU',
              label: 'Niue',
            },
            {
              value: 'NF',
              label: 'Norfolk Island',
            },
            {
              value: 'MK',
              label: 'North Macedonia',
            },
            {
              value: 'MP',
              label: 'Northern Mariana Islands',
            },
            {
              value: 'NO',
              label: 'Norway',
            },
            {
              value: 'OM',
              label: 'Oman',
            },
            {
              value: 'PK',
              label: 'Pakistan',
            },
            {
              value: 'PW',
              label: 'Palau',
            },
            {
              value: 'PS',
              label: 'Palestine, State of',
            },
            {
              value: 'PA',
              label: 'Panama',
            },
            {
              value: 'PG',
              label: 'Papua New Guinea',
            },
            {
              value: 'PY',
              label: 'Paraguay',
            },
            {
              value: 'PE',
              label: 'Peru',
            },
            {
              value: 'PH',
              label: 'Philippines',
            },
            {
              value: 'PN',
              label: 'Pitcairn',
            },
            {
              value: 'PL',
              label: 'Poland',
            },
            {
              value: 'PT',
              label: 'Portugal',
            },
            {
              value: 'PR',
              label: 'Puerto Rico',
            },
            {
              value: 'QA',
              label: 'Qatar',
            },
            {
              value: 'RE',
              label: 'Réunion',
            },
            {
              value: 'RO',
              label: 'Romania',
            },
            {
              value: 'RU',
              label: 'Russian Federation',
            },
            {
              value: 'RW',
              label: 'Rwanda',
            },
            {
              value: 'BL',
              label: 'Saint Barthélemy',
            },
            {
              value: 'SH',
              label: 'Saint Helena, Ascension and Tristan da Cunha',
            },
            {
              value: 'KN',
              label: 'Saint Kitts and Nevis',
            },
            {
              value: 'LC',
              label: 'Saint Lucia',
            },
            {
              value: 'MF',
              label: 'Saint Martin (French part)',
            },
            {
              value: 'PM',
              label: 'Saint Pierre and Miquelon',
            },
            {
              value: 'VC',
              label: 'Saint Vincent and the Grenadines',
            },
            {
              value: 'WS',
              label: 'Samoa',
            },
            {
              value: 'SM',
              label: 'San Marino',
            },
            {
              value: 'ST',
              label: 'Sao Tome and Principe',
            },
            {
              value: 'SA',
              label: 'Saudi Arabia',
            },
            {
              value: 'SN',
              label: 'Senegal',
            },
            {
              value: 'RS',
              label: 'Serbia',
            },
            {
              value: 'SC',
              label: 'Seychelles',
            },
            {
              value: 'SL',
              label: 'Sierra Leone',
            },
            {
              value: 'SG',
              label: 'Singapore',
            },
            {
              value: 'SX',
              label: 'Sint Maarten (Dutch part)',
            },
            {
              value: 'SK',
              label: 'Slovakia',
            },
            {
              value: 'SI',
              label: 'Slovenia',
            },
            {
              value: 'SB',
              label: 'Solomon Islands',
            },
            {
              value: 'SO',
              label: 'Somalia',
            },
            {
              value: 'ZA',
              label: 'South Africa',
            },
            {
              value: 'GS',
              label: 'South Georgia and the South Sandwich Islands',
            },
            {
              value: 'SS',
              label: 'South Sudan',
            },
            {
              value: 'ES',
              label: 'Spain',
            },
            {
              value: 'LK',
              label: 'Sri Lanka',
            },
            {
              value: 'SD',
              label: 'Sudan',
            },
            {
              value: 'SR',
              label: 'Suriname',
            },
            {
              value: 'SJ',
              label: 'Svalbard and Jan Mayen',
            },
            {
              value: 'SE',
              label: 'Sweden',
            },
            {
              value: 'CH',
              label: 'Switzerland',
            },
            {
              value: 'SY',
              label: 'Syrian Arab Republic',
            },
            {
              value: 'TW',
              label: 'Taiwan',
            },
            {
              value: 'TJ',
              label: 'Tajikistan',
            },
            {
              value: 'TZ',
              label: 'Tanzania, United Republic of',
            },
            {
              value: 'TH',
              label: 'Thailand',
            },
            {
              value: 'TL',
              label: 'Timor-Leste',
            },
            {
              value: 'TG',
              label: 'Togo',
            },
            {
              value: 'TK',
              label: 'Tokelau',
            },
            {
              value: 'TO',
              label: 'Tonga',
            },
            {
              value: 'TT',
              label: 'Trinidad and Tobago',
            },
            {
              value: 'TN',
              label: 'Tunisia',
            },
            {
              value: 'TR',
              label: 'Turkey',
            },
            {
              value: 'TM',
              label: 'Turkmenistan',
            },
            {
              value: 'TC',
              label: 'Turks and Caicos Islands',
            },
            {
              value: 'TV',
              label: 'Tuvalu',
            },
            {
              value: 'UG',
              label: 'Uganda',
            },
            {
              value: 'UA',
              label: 'Ukraine',
            },
            {
              value: 'AE',
              label: 'United Arab Emirates',
            },
            {
              value: 'GB',
              label: 'United Kingdom of Great Britain and Northern Ireland',
            },
            {
              value: 'UM',
              label: 'United States Minor Outlying Islands',
            },
            {
              value: 'UY',
              label: 'Uruguay',
            },
            {
              value: 'UZ',
              label: 'Uzbekistan',
            },
            {
              value: 'VU',
              label: 'Vanuatu',
            },
            {
              value: 'VE',
              label: 'Venezuela (Bolivarian Republic of)',
            },
            {
              value: 'VN',
              label: 'Viet Nam',
            },
            {
              value: 'VG',
              label: 'Virgin Islands (British)',
            },
            {
              value: 'VI',
              label: 'Virgin Islands (U.S.)',
            },
            {
              value: 'WF',
              label: 'Wallis and Futuna',
            },
            {
              value: 'EH',
              label: 'Western Sahara',
            },
            {
              value: 'YE',
              label: 'Yemen',
            },
            {
              value: 'ZM',
              label: 'Zambia',
            },
            {
              value: 'ZW',
              label: 'Zimbabwe',
            },
          ],
          default: 'US',
        },
        type: 'string',
      },
    },
    required: ['country'],
  },
  Line1Credential: {
    $id: 'Line1Credential',
    type: 'object',
    properties: {
      line1: {
        description: 'The first line of the address.',
        examples: ['10 Downing Street', '307 3rd Ave', '1234 Main St'],
        title: 'Address Line 1',
        displayFormat: 'String',
        input: {
          type: 'Text',
        },
        type: 'string',
      },
    },
    required: ['line1'],
  },
  Line2Credential: {
    $id: 'Line2Credential',
    type: 'object',
    properties: {
      line2: {
        description: 'The second line of the address.',
        examples: ['Apt #4', 'Suite 200'],
        title: 'Address Line 2',
        displayFormat: 'String',
        input: {
          type: 'Text',
        },
        type: 'string',
      },
    },
    required: ['line2'],
  },
  StateCredential: {
    $id: 'StateCredential',
    if: {
      type: 'object',
      properties: {
        country: {
          description: 'If the country from Address Credential is the US.',
          const: 'US',
          type: 'string',
        },
      },
      required: ['country'],
    },
    then: {
      type: 'object',
      properties: {
        state: {
          description: 'Then the state must be a valid US state.',
          format: 'iso3166USRegionCode',
          title: 'State',
          input: {
            type: 'Select',
            options: [
              {
                value: 'AL',
                label: 'Alabama',
              },
              {
                value: 'AK',
                label: 'Alaska',
              },
              {
                value: 'AZ',
                label: 'Arizona',
              },
              {
                value: 'AR',
                label: 'Arkansas',
              },
              {
                value: 'CA',
                label: 'California',
              },
              {
                value: 'CO',
                label: 'Colorado',
              },
              {
                value: 'CT',
                label: 'Connecticut',
              },
              {
                value: 'DE',
                label: 'Delaware',
              },
              {
                value: 'DC',
                label: 'District of Columbia',
              },
              {
                value: 'FL',
                label: 'Florida',
              },
              {
                value: 'GA',
                label: 'Georgia',
              },
              {
                value: 'HI',
                label: 'Hawaii',
              },
              {
                value: 'ID',
                label: 'Idaho',
              },
              {
                value: 'IL',
                label: 'Illinois',
              },
              {
                value: 'IN',
                label: 'Indiana',
              },
              {
                value: 'IA',
                label: 'Iowa',
              },
              {
                value: 'KS',
                label: 'Kansas',
              },
              {
                value: 'KY',
                label: 'Kentucky',
              },
              {
                value: 'LA',
                label: 'Louisiana',
              },
              {
                value: 'ME',
                label: 'Maine',
              },
              {
                value: 'MD',
                label: 'Maryland',
              },
              {
                value: 'MA',
                label: 'Massachusetts',
              },
              {
                value: 'MI',
                label: 'Michigan',
              },
              {
                value: 'MN',
                label: 'Minnesota',
              },
              {
                value: 'MS',
                label: 'Mississippi',
              },
              {
                value: 'MO',
                label: 'Missouri',
              },
              {
                value: 'MT',
                label: 'Montana',
              },
              {
                value: 'NE',
                label: 'Nebraska',
              },
              {
                value: 'NV',
                label: 'Nevada',
              },
              {
                value: 'NH',
                label: 'New Hampshire',
              },
              {
                value: 'NJ',
                label: 'New Jersey',
              },
              {
                value: 'NM',
                label: 'New Mexico',
              },
              {
                value: 'NY',
                label: 'New York',
              },
              {
                value: 'NC',
                label: 'North Carolina',
              },
              {
                value: 'ND',
                label: 'North Dakota',
              },
              {
                value: 'OH',
                label: 'Ohio',
              },
              {
                value: 'OK',
                label: 'Oklahoma',
              },
              {
                value: 'OR',
                label: 'Oregon',
              },
              {
                value: 'PA',
                label: 'Pennsylvania',
              },
              {
                value: 'RI',
                label: 'Rhode Island',
              },
              {
                value: 'SC',
                label: 'South Carolina',
              },
              {
                value: 'SD',
                label: 'South Dakota',
              },
              {
                value: 'TN',
                label: 'Tennessee',
              },
              {
                value: 'TX',
                label: 'Texas',
              },
              {
                value: 'UT',
                label: 'Utah',
              },
              {
                value: 'VT',
                label: 'Vermont',
              },
              {
                value: 'VI',
                label: 'Virgin Islands',
              },
              {
                value: 'VA',
                label: 'Virginia',
              },
              {
                value: 'WA',
                label: 'Washington',
              },
              {
                value: 'WV',
                label: 'West Virginia',
              },
              {
                value: 'WI',
                label: 'Wisconsin',
              },
              {
                value: 'WY',
                label: 'Wyoming',
              },
            ],
          },
          type: 'string',
        },
      },
      required: ['state'],
    },
    type: 'object',
    properties: {
      state: {
        description: "A state's ISO 3166-2 code.",
        examples: ['CA', 'GA', 'SP'],
        format: 'iso3166RegionCode',
        title: 'State or Region',
        displayFormat: 'State',
        input: {
          type: 'Text',
        },
        type: 'string',
      },
    },
    required: ['state'],
  },
  ZipCodeCredential: {
    $id: 'ZipCodeCredential',
    if: {
      type: 'object',
      properties: {
        country: {
          description: 'If the country from Address Credential is the US.',
          const: 'US',
          type: 'string',
        },
      },
      required: ['country'],
    },
    then: {
      type: 'object',
      properties: {
        zipCode: {
          description: 'Then the zip code must be a valid US Zip Code.',
          format: 'usZipCode',
          input: {
            type: 'Text',
            pattern: '^[0-9]{5}(?:-[0-9]{4})?$',
          },
          type: 'string',
        },
      },
      required: ['zipCode'],
    },
    type: 'object',
    properties: {
      zipCode: {
        description: 'The zip code of the address.',
        examples: ['94103', '94103-1234'],
        title: 'Zip Code',
        displayFormat: 'String',
        input: {
          type: 'Text',
        },
        type: 'string',
      },
    },
    required: ['zipCode'],
  },
  AmountCredential: {
    $id: 'AmountCredential',
    type: 'object',
    properties: {
      amount: {
        description: 'The amount of the something, i.e. a currency.',
        examples: ['100000', '200000', '300000'],
        title: 'Amount',
        format: 'digits',
        displayFormat: 'Number',
        input: {
          type: 'Text',
          pattern: '^-?\\d+$',
        },
        type: 'string',
      },
    },
    required: ['amount'],
  },
  CurrencyCredential: {
    $id: 'CurrencyCredential',
    type: 'object',
    properties: {
      currency: {
        description: 'The iso4217 currency code',
        examples: ['USD', 'EUR', 'GBP'],
        title: 'Currency',
        format: 'iso4217',
        displayFormat: 'String',
        input: {
          type: 'Select',
          options: [
            {
              value: 'USD',
              label: 'USD (US Dollar)',
            },
            {
              value: 'CAD',
              label: 'CAD (Canadian Dollar)',
            },
            {
              value: 'AED',
              label: 'AED (UAE Dirham)',
            },
            {
              value: 'AFN',
              label: 'AFN (Afghani)',
            },
            {
              value: 'ALL',
              label: 'ALL (Lek)',
            },
            {
              value: 'AMD',
              label: 'AMD (Armenian Dram)',
            },
            {
              value: 'ANG',
              label: 'ANG (Netherlands Antillean Guilder)',
            },
            {
              value: 'AOA',
              label: 'AOA (Kwanza)',
            },
            {
              value: 'ARS',
              label: 'ARS (Argentine Peso)',
            },
            {
              value: 'AUD',
              label: 'AUD (Australian Dollar)',
            },
            {
              value: 'AWG',
              label: 'AWG (Aruban Florin)',
            },
            {
              value: 'AZN',
              label: 'AZN (Azerbaijan Manat)',
            },
            {
              value: 'BAM',
              label: 'BAM (Convertible Mark)',
            },
            {
              value: 'BBD',
              label: 'BBD (Barbados Dollar)',
            },
            {
              value: 'BDT',
              label: 'BDT (Taka)',
            },
            {
              value: 'BGN',
              label: 'BGN (Bulgarian Lev)',
            },
            {
              value: 'BHD',
              label: 'BHD (Bahraini Dinar)',
            },
            {
              value: 'BIF',
              label: 'BIF (Burundi Franc)',
            },
            {
              value: 'BMD',
              label: 'BMD (Bermudian Dollar)',
            },
            {
              value: 'BND',
              label: 'BND (Brunei Dollar)',
            },
            {
              value: 'BOB',
              label: 'BOB (Boliviano)',
            },
            {
              value: 'BOV',
              label: 'BOV (Mvdol)',
            },
            {
              value: 'BRL',
              label: 'BRL (Brazilian Real)',
            },
            {
              value: 'BSD',
              label: 'BSD (Bahamian Dollar)',
            },
            {
              value: 'BTN',
              label: 'BTN (Ngultrum)',
            },
            {
              value: 'BWP',
              label: 'BWP (Pula)',
            },
            {
              value: 'BYN',
              label: 'BYN (Belarusian Ruble)',
            },
            {
              value: 'BZD',
              label: 'BZD (Belize Dollar)',
            },
            {
              value: 'CDF',
              label: 'CDF (Congolese Franc)',
            },
            {
              value: 'CHE',
              label: 'CHE (WIR Euro)',
            },
            {
              value: 'CHF',
              label: 'CHF (Swiss Franc)',
            },
            {
              value: 'CHW',
              label: 'CHW (WIR Franc)',
            },
            {
              value: 'CLF',
              label: 'CLF (Unidad de Fomento)',
            },
            {
              value: 'CLP',
              label: 'CLP (Chilean Peso)',
            },
            {
              value: 'CNY',
              label: 'CNY (Yuan Renminbi)',
            },
            {
              value: 'COP',
              label: 'COP (Colombian Peso)',
            },
            {
              value: 'COU',
              label: 'COU (Unidad de Valor Real)',
            },
            {
              value: 'CRC',
              label: 'CRC (Costa Rican Colon)',
            },
            {
              value: 'CUC',
              label: 'CUC (Peso Convertible)',
            },
            {
              value: 'CUP',
              label: 'CUP (Cuban Peso)',
            },
            {
              value: 'CVE',
              label: 'CVE (Cabo Verde Escudo)',
            },
            {
              value: 'CZK',
              label: 'CZK (Czech Koruna)',
            },
            {
              value: 'DJF',
              label: 'DJF (Djibouti Franc)',
            },
            {
              value: 'DKK',
              label: 'DKK (Danish Krone)',
            },
            {
              value: 'DOP',
              label: 'DOP (Dominican Peso)',
            },
            {
              value: 'DZD',
              label: 'DZD (Algerian Dinar)',
            },
            {
              value: 'EGP',
              label: 'EGP (Egyptian Pound)',
            },
            {
              value: 'ERN',
              label: 'ERN (Nakfa)',
            },
            {
              value: 'ETB',
              label: 'ETB (Ethiopian Birr)',
            },
            {
              value: 'EUR',
              label: 'EUR (Euro)',
            },
            {
              value: 'FJD',
              label: 'FJD (Fiji Dollar)',
            },
            {
              value: 'FKP',
              label: 'FKP (Falkland Islands Pound)',
            },
            {
              value: 'GBP',
              label: 'GBP (Pound Sterling)',
            },
            {
              value: 'GEL',
              label: 'GEL (Lari)',
            },
            {
              value: 'GHS',
              label: 'GHS (Ghana Cedi)',
            },
            {
              value: 'GIP',
              label: 'GIP (Gibraltar Pound)',
            },
            {
              value: 'GMD',
              label: 'GMD (Dalasi)',
            },
            {
              value: 'GNF',
              label: 'GNF (Guinean Franc)',
            },
            {
              value: 'GTQ',
              label: 'GTQ (Quetzal)',
            },
            {
              value: 'GYD',
              label: 'GYD (Guyana Dollar)',
            },
            {
              value: 'HKD',
              label: 'HKD (Hong Kong Dollar)',
            },
            {
              value: 'HNL',
              label: 'HNL (Lempira)',
            },
            {
              value: 'HRK',
              label: 'HRK (Kuna)',
            },
            {
              value: 'HTG',
              label: 'HTG (Gourde)',
            },
            {
              value: 'HUF',
              label: 'HUF (Forint)',
            },
            {
              value: 'IDR',
              label: 'IDR (Rupiah)',
            },
            {
              value: 'ILS',
              label: 'ILS (New Israeli Sheqel)',
            },
            {
              value: 'INR',
              label: 'INR (Indian Rupee)',
            },
            {
              value: 'IQD',
              label: 'IQD (Iraqi Dinar)',
            },
            {
              value: 'IRR',
              label: 'IRR (Iranian Rial)',
            },
            {
              value: 'ISK',
              label: 'ISK (Iceland Krona)',
            },
            {
              value: 'JMD',
              label: 'JMD (Jamaican Dollar)',
            },
            {
              value: 'JOD',
              label: 'JOD (Jordanian Dinar)',
            },
            {
              value: 'JPY',
              label: 'JPY (Yen)',
            },
            {
              value: 'KES',
              label: 'KES (Kenyan Shilling)',
            },
            {
              value: 'KGS',
              label: 'KGS (Som)',
            },
            {
              value: 'KHR',
              label: 'KHR (Riel)',
            },
            {
              value: 'KMF',
              label: 'KMF (Comoro Franc)',
            },
            {
              value: 'KPW',
              label: 'KPW (North Korean Won)',
            },
            {
              value: 'KRW',
              label: 'KRW (Won)',
            },
            {
              value: 'KWD',
              label: 'KWD (Kuwaiti Dinar)',
            },
            {
              value: 'KYD',
              label: 'KYD (Cayman Islands Dollar)',
            },
            {
              value: 'KZT',
              label: 'KZT (Tenge)',
            },
            {
              value: 'LAK',
              label: 'LAK (Lao Kip)',
            },
            {
              value: 'LBP',
              label: 'LBP (Lebanese Pound)',
            },
            {
              value: 'LKR',
              label: 'LKR (Sri Lanka Rupee)',
            },
            {
              value: 'LRD',
              label: 'LRD (Liberian Dollar)',
            },
            {
              value: 'LSL',
              label: 'LSL (Loti)',
            },
            {
              value: 'LYD',
              label: 'LYD (Libyan Dinar)',
            },
            {
              value: 'MAD',
              label: 'MAD (Moroccan Dirham)',
            },
            {
              value: 'MDL',
              label: 'MDL (Moldovan Leu)',
            },
            {
              value: 'MGA',
              label: 'MGA (Malagasy Ariary)',
            },
            {
              value: 'MKD',
              label: 'MKD (Denar)',
            },
            {
              value: 'MMK',
              label: 'MMK (Kyat)',
            },
            {
              value: 'MNT',
              label: 'MNT (Tugrik)',
            },
            {
              value: 'MOP',
              label: 'MOP (Pataca)',
            },
            {
              value: 'MRU',
              label: 'MRU (Ouguiya)',
            },
            {
              value: 'MUR',
              label: 'MUR (Mauritius Rupee)',
            },
            {
              value: 'MVR',
              label: 'MVR (Rufiyaa)',
            },
            {
              value: 'MWK',
              label: 'MWK (Malawi Kwacha)',
            },
            {
              value: 'MXN',
              label: 'MXN (Mexican Peso)',
            },
            {
              value: 'MXV',
              label: 'MXV (Mexican Unidad de Inversion (UDI))',
            },
            {
              value: 'MYR',
              label: 'MYR (Malaysian Ringgit)',
            },
            {
              value: 'MZN',
              label: 'MZN (Mozambique Metical)',
            },
            {
              value: 'NAD',
              label: 'NAD (Namibia Dollar)',
            },
            {
              value: 'NGN',
              label: 'NGN (Naira)',
            },
            {
              value: 'NIO',
              label: 'NIO (Cordoba Oro)',
            },
            {
              value: 'NOK',
              label: 'NOK (Norwegian Krone)',
            },
            {
              value: 'NPR',
              label: 'NPR (Nepalese Rupee)',
            },
            {
              value: 'NZD',
              label: 'NZD (New Zealand Dollar)',
            },
            {
              value: 'OMR',
              label: 'OMR (Rial Omani)',
            },
            {
              value: 'PAB',
              label: 'PAB (Balboa)',
            },
            {
              value: 'PEN',
              label: 'PEN (Nuevo Sol)',
            },
            {
              value: 'PGK',
              label: 'PGK (Kina)',
            },
            {
              value: 'PHP',
              label: 'PHP (Philippine Peso)',
            },
            {
              value: 'PKR',
              label: 'PKR (Pakistan Rupee)',
            },
            {
              value: 'PLN',
              label: 'PLN (Zloty)',
            },
            {
              value: 'PYG',
              label: 'PYG (Guarani)',
            },
            {
              value: 'QAR',
              label: 'QAR (Qatari Rial)',
            },
            {
              value: 'RON',
              label: 'RON (Romanian Leu)',
            },
            {
              value: 'RSD',
              label: 'RSD (Serbian Dinar)',
            },
            {
              value: 'RUB',
              label: 'RUB (Russian Ruble)',
            },
            {
              value: 'RWF',
              label: 'RWF (Rwanda Franc)',
            },
            {
              value: 'SAR',
              label: 'SAR (Saudi Riyal)',
            },
            {
              value: 'SBD',
              label: 'SBD (Solomon Islands Dollar)',
            },
            {
              value: 'SCR',
              label: 'SCR (Seychelles Rupee)',
            },
            {
              value: 'SDG',
              label: 'SDG (Sudanese Pound)',
            },
            {
              value: 'SEK',
              label: 'SEK (Swedish Krona)',
            },
            {
              value: 'SGD',
              label: 'SGD (Singapore Dollar)',
            },
            {
              value: 'SHP',
              label: 'SHP (Saint Helena Pound)',
            },
            {
              value: 'SLL',
              label: 'SLL (Leone)',
            },
            {
              value: 'SOS',
              label: 'SOS (Somali Shilling)',
            },
            {
              value: 'SRD',
              label: 'SRD (Surinam Dollar)',
            },
            {
              value: 'SSP',
              label: 'SSP (South Sudanese Pound)',
            },
            {
              value: 'STN',
              label: 'STN (Dobra)',
            },
            {
              value: 'SVC',
              label: 'SVC (El Salvador Colon)',
            },
            {
              value: 'SYP',
              label: 'SYP (Syrian Pound)',
            },
            {
              value: 'SZL',
              label: 'SZL (Lilangeni)',
            },
            {
              value: 'THB',
              label: 'THB (Baht)',
            },
            {
              value: 'TJS',
              label: 'TJS (Somoni)',
            },
            {
              value: 'TMT',
              label: 'TMT (Turkmenistan New Manat)',
            },
            {
              value: 'TND',
              label: 'TND (Tunisian Dinar)',
            },
            {
              value: 'TOP',
              label: 'TOP (Pa’anga)',
            },
            {
              value: 'TRY',
              label: 'TRY (Turkish Lira)',
            },
            {
              value: 'TTD',
              label: 'TTD (Trinidad and Tobago Dollar)',
            },
            {
              value: 'TWD',
              label: 'TWD (New Taiwan Dollar)',
            },
            {
              value: 'TZS',
              label: 'TZS (Tanzanian Shilling)',
            },
            {
              value: 'UAH',
              label: 'UAH (Hryvnia)',
            },
            {
              value: 'UGX',
              label: 'UGX (Uganda Shilling)',
            },
            {
              value: 'UYI',
              label: 'UYI (Uruguay Peso en Unidades Indexadas (URUIURUI))',
            },
            {
              value: 'UYU',
              label: 'UYU (Peso Uruguayo)',
            },
            {
              value: 'UYW',
              label: 'UYW (Unidad Previsional)',
            },
            {
              value: 'UZS',
              label: 'UZS (Uzbekistan Sum)',
            },
            {
              value: 'VED',
              label: 'VED (Bolívar Soberano)',
            },
            {
              value: 'VEF',
              label: 'VEF (Bolívar Soberano)',
            },
            {
              value: 'VND',
              label: 'VND (Dong)',
            },
            {
              value: 'VUV',
              label: 'VUV (Vatu)',
            },
            {
              value: 'WST',
              label: 'WST (Tala)',
            },
            {
              value: 'XAF',
              label: 'XAF (CFA Franc BEAC)',
            },
            {
              value: 'XCD',
              label: 'XCD (East Caribbean Dollar)',
            },
            {
              value: 'XDR',
              label: 'XDR (SDR (Special Drawing Right))',
            },
            {
              value: 'XOF',
              label: 'XOF (CFA Franc BCEAO)',
            },
            {
              value: 'XPF',
              label: 'XPF (CFP Franc)',
            },
            {
              value: 'XSU',
              label: 'XSU (Sucre)',
            },
            {
              value: 'XUA',
              label: 'XUA (ADB Unit of Account)',
            },
            {
              value: 'YER',
              label: 'YER (Yemeni Rial)',
            },
            {
              value: 'ZAR',
              label: 'ZAR (Rand)',
            },
            {
              value: 'ZMW',
              label: 'ZMW (Zambian Kwacha)',
            },
            {
              value: 'ZWL',
              label: 'ZWL (Zimbabwe Dollar)',
            },
          ],
          default: 'USD',
        },
        type: 'string',
      },
    },
    required: ['currency'],
  },
  IdentityCredential: {
    $id: 'IdentityCredential',
    additionalProperties: false,
    type: 'object',
    properties: {},
  },
  LivenessCredential: {
    $id: 'LivenessCredential',
    type: 'object',
    properties: {
      confidence: {
        format: 'confidenceLevel',
        description:
          "A person's liveliness confidence level during an IDV session",
        examples: ['Very High', 'High', 'Medium', 'Low', 'Very Low'],
        title: 'Liveness Confidence',
        displayFormat: 'String',
        type: 'string',
      },
    },
    required: ['confidence'],
  },
  MatchCredential: {
    $id: 'MatchCredential',
    type: 'object',
    properties: {
      confidence: {
        format: 'confidenceLevel',
        description:
          "A person's facial match confidence score during an IDV session",
        examples: ['Very High', 'High', 'Medium', 'Low', 'Very Low'],
        title: 'Match Confidence',
        displayFormat: 'String',
        type: 'string',
      },
    },
    required: ['confidence'],
  },
  LineTypeCredential: {
    $id: 'LineTypeCredential',
    type: 'object',
    properties: {
      type: {
        format: 'lineType',
        description: 'Line type associated with a phone number.',
        examples: [
          'Mobile',
          'Landline',
          'FixedVoIP',
          'NonFixVoIP',
          'Unknown',
          'Unlisted',
        ],
        title: 'Phone Line Type',
        displayFormat: 'String',
        type: 'string',
      },
    },
    required: ['type'],
  },
  AddressCredential: {
    $id: 'AddressCredential',
    unevaluatedProperties: false,
    errorMessage: {
      unevaluatedProperties: "AddressCredential doesn't match the schema",
    },
    anyOf: [
      {
        anyOf: [
          {
            $id: 'Line1Credential',
            type: 'object',
            properties: {
              line1: {
                description: 'The first line of the address.',
                examples: ['10 Downing Street', '307 3rd Ave', '1234 Main St'],
                title: 'Address Line 1',
                displayFormat: 'String',
                input: {
                  type: 'Text',
                },
                type: 'string',
              },
            },
            required: ['line1'],
          },
          {
            $id: 'Line2Credential',
            type: 'object',
            properties: {
              line2: {
                description: 'The second line of the address.',
                examples: ['Apt #4', 'Suite 200'],
                title: 'Address Line 2',
                displayFormat: 'String',
                input: {
                  type: 'Text',
                },
                type: 'string',
              },
            },
            required: ['line2'],
          },
          {
            $id: 'CityCredential',
            type: 'object',
            properties: {
              city: {
                description: 'The city of the address.',
                examples: ['San Francisco', 'New York', 'Atlanta'],
                title: 'City',
                displayFormat: 'String',
                input: {
                  type: 'Text',
                },
                type: 'string',
              },
            },
            required: ['city'],
          },
          {
            $id: 'CountryCredential',
            type: 'object',
            properties: {
              country: {
                format: 'iso3361Alpha2',
                examples: ['US', 'CA', 'MX'],
                description: "A country's ISO 3166-1 alpha-2 code.",
                title: 'Country',
                displayFormat: 'String',
                input: {
                  type: 'Select',
                  options: [
                    {
                      value: 'US',
                      label: 'United States of America',
                    },
                    {
                      value: 'CA',
                      label: 'Canada',
                    },
                    {
                      value: 'AF',
                      label: 'Afghanistan',
                    },
                    {
                      value: 'AL',
                      label: 'Albania',
                    },
                    {
                      value: 'DZ',
                      label: 'Algeria',
                    },
                    {
                      value: 'AS',
                      label: 'American Samoa',
                    },
                    {
                      value: 'AD',
                      label: 'Andorra',
                    },
                    {
                      value: 'AO',
                      label: 'Angola',
                    },
                    {
                      value: 'AI',
                      label: 'Anguilla',
                    },
                    {
                      value: 'AQ',
                      label: 'Antarctica',
                    },
                    {
                      value: 'AG',
                      label: 'Antigua and Barbuda',
                    },
                    {
                      value: 'AR',
                      label: 'Argentina',
                    },
                    {
                      value: 'AM',
                      label: 'Armenia',
                    },
                    {
                      value: 'AW',
                      label: 'Aruba',
                    },
                    {
                      value: 'AU',
                      label: 'Australia',
                    },
                    {
                      value: 'AT',
                      label: 'Austria',
                    },
                    {
                      value: 'AZ',
                      label: 'Azerbaijan',
                    },
                    {
                      value: 'BS',
                      label: 'Bahamas',
                    },
                    {
                      value: 'BH',
                      label: 'Bahrain',
                    },
                    {
                      value: 'BD',
                      label: 'Bangladesh',
                    },
                    {
                      value: 'BB',
                      label: 'Barbados',
                    },
                    {
                      value: 'BY',
                      label: 'Belarus',
                    },
                    {
                      value: 'BE',
                      label: 'Belgium',
                    },
                    {
                      value: 'BZ',
                      label: 'Belize',
                    },
                    {
                      value: 'BJ',
                      label: 'Benin',
                    },
                    {
                      value: 'BM',
                      label: 'Bermuda',
                    },
                    {
                      value: 'BT',
                      label: 'Bhutan',
                    },
                    {
                      value: 'BO',
                      label: 'Bolivia (Plurinational State of)',
                    },
                    {
                      value: 'BQ',
                      label: 'Bonaire, Sint Eustatius and Saba',
                    },
                    {
                      value: 'BA',
                      label: 'Bosnia and Herzegovina',
                    },
                    {
                      value: 'BW',
                      label: 'Botswana',
                    },
                    {
                      value: 'BV',
                      label: 'Bouvet Island',
                    },
                    {
                      value: 'BR',
                      label: 'Brazil',
                    },
                    {
                      value: 'IO',
                      label: 'British Indian Ocean Territory',
                    },
                    {
                      value: 'BN',
                      label: 'Brunei Darussalam',
                    },
                    {
                      value: 'BG',
                      label: 'Bulgaria',
                    },
                    {
                      value: 'BF',
                      label: 'Burkina Faso',
                    },
                    {
                      value: 'BI',
                      label: 'Burundi',
                    },
                    {
                      value: 'CV',
                      label: 'Cabo Verde',
                    },
                    {
                      value: 'KH',
                      label: 'Cambodia',
                    },
                    {
                      value: 'CM',
                      label: 'Cameroon',
                    },
                    {
                      value: 'KY',
                      label: 'Cayman Islands',
                    },
                    {
                      value: 'CF',
                      label: 'Central African Republic',
                    },
                    {
                      value: 'TD',
                      label: 'Chad',
                    },
                    {
                      value: 'CL',
                      label: 'Chile',
                    },
                    {
                      value: 'CN',
                      label: 'China',
                    },
                    {
                      value: 'CX',
                      label: 'Christmas Island',
                    },
                    {
                      value: 'CC',
                      label: 'Cocos (Keeling) Islands',
                    },
                    {
                      value: 'CO',
                      label: 'Colombia',
                    },
                    {
                      value: 'KM',
                      label: 'Comoros',
                    },
                    {
                      value: 'CG',
                      label: 'Congo',
                    },
                    {
                      value: 'CD',
                      label: 'Congo (Democratic Republic of the)',
                    },
                    {
                      value: 'CK',
                      label: 'Cook Islands',
                    },
                    {
                      value: 'CR',
                      label: 'Costa Rica',
                    },
                    {
                      value: 'CI',
                      label: "Côte d'Ivoire",
                    },
                    {
                      value: 'HR',
                      label: 'Croatia',
                    },
                    {
                      value: 'CU',
                      label: 'Cuba',
                    },
                    {
                      value: 'CW',
                      label: 'Curaçao',
                    },
                    {
                      value: 'CY',
                      label: 'Cyprus',
                    },
                    {
                      value: 'CZ',
                      label: 'Czechia',
                    },
                    {
                      value: 'DK',
                      label: 'Denmark',
                    },
                    {
                      value: 'DJ',
                      label: 'Djibouti',
                    },
                    {
                      value: 'DM',
                      label: 'Dominica',
                    },
                    {
                      value: 'DO',
                      label: 'Dominican Republic',
                    },
                    {
                      value: 'EC',
                      label: 'Ecuador',
                    },
                    {
                      value: 'EG',
                      label: 'Egypt',
                    },
                    {
                      value: 'SV',
                      label: 'El Salvador',
                    },
                    {
                      value: 'GQ',
                      label: 'Equatorial Guinea',
                    },
                    {
                      value: 'ER',
                      label: 'Eritrea',
                    },
                    {
                      value: 'EE',
                      label: 'Estonia',
                    },
                    {
                      value: 'SZ',
                      label: 'Eswatini',
                    },
                    {
                      value: 'ET',
                      label: 'Ethiopia',
                    },
                    {
                      value: 'FK',
                      label: 'Falkland Islands (Malvinas)',
                    },
                    {
                      value: 'FO',
                      label: 'Faroe Islands',
                    },
                    {
                      value: 'FJ',
                      label: 'Fiji',
                    },
                    {
                      value: 'FI',
                      label: 'Finland',
                    },
                    {
                      value: 'FR',
                      label: 'France',
                    },
                    {
                      value: 'GF',
                      label: 'French Guiana',
                    },
                    {
                      value: 'PF',
                      label: 'French Polynesia',
                    },
                    {
                      value: 'TF',
                      label: 'French Southern Territories',
                    },
                    {
                      value: 'GA',
                      label: 'Gabon',
                    },
                    {
                      value: 'GM',
                      label: 'Gambia',
                    },
                    {
                      value: 'GE',
                      label: 'Georgia',
                    },
                    {
                      value: 'DE',
                      label: 'Germany',
                    },
                    {
                      value: 'GH',
                      label: 'Ghana',
                    },
                    {
                      value: 'GI',
                      label: 'Gibraltar',
                    },
                    {
                      value: 'GR',
                      label: 'Greece',
                    },
                    {
                      value: 'GL',
                      label: 'Greenland',
                    },
                    {
                      value: 'GD',
                      label: 'Grenada',
                    },
                    {
                      value: 'GP',
                      label: 'Guadeloupe',
                    },
                    {
                      value: 'GU',
                      label: 'Guam',
                    },
                    {
                      value: 'GT',
                      label: 'Guatemala',
                    },
                    {
                      value: 'GG',
                      label: 'Guernsey',
                    },
                    {
                      value: 'GN',
                      label: 'Guinea',
                    },
                    {
                      value: 'GW',
                      label: 'Guinea-Bissau',
                    },
                    {
                      value: 'GY',
                      label: 'Guyana',
                    },
                    {
                      value: 'HT',
                      label: 'Haiti',
                    },
                    {
                      value: 'HM',
                      label: 'Heard Island and McDonald Islands',
                    },
                    {
                      value: 'VA',
                      label: 'Holy See',
                    },
                    {
                      value: 'HN',
                      label: 'Honduras',
                    },
                    {
                      value: 'HK',
                      label: 'Hong Kong',
                    },
                    {
                      value: 'HU',
                      label: 'Hungary',
                    },
                    {
                      value: 'IS',
                      label: 'Iceland',
                    },
                    {
                      value: 'IN',
                      label: 'India',
                    },
                    {
                      value: 'ID',
                      label: 'Indonesia',
                    },
                    {
                      value: 'IR',
                      label: 'Iran (Islamic Republic of)',
                    },
                    {
                      value: 'IQ',
                      label: 'Iraq',
                    },
                    {
                      value: 'IE',
                      label: 'Ireland',
                    },
                    {
                      value: 'IM',
                      label: 'Isle of Man',
                    },
                    {
                      value: 'IL',
                      label: 'Israel',
                    },
                    {
                      value: 'IT',
                      label: 'Italy',
                    },
                    {
                      value: 'JM',
                      label: 'Jamaica',
                    },
                    {
                      value: 'JP',
                      label: 'Japan',
                    },
                    {
                      value: 'JE',
                      label: 'Jersey',
                    },
                    {
                      value: 'JO',
                      label: 'Jordan',
                    },
                    {
                      value: 'KZ',
                      label: 'Kazakhstan',
                    },
                    {
                      value: 'KE',
                      label: 'Kenya',
                    },
                    {
                      value: 'KI',
                      label: 'Kiribati',
                    },
                    {
                      value: 'KP',
                      label: "Korea (Democratic People's Republic of)",
                    },
                    {
                      value: 'KR',
                      label: 'Korea (Republic of)',
                    },
                    {
                      value: 'KW',
                      label: 'Kuwait',
                    },
                    {
                      value: 'KG',
                      label: 'Kyrgyzstan',
                    },
                    {
                      value: 'LA',
                      label: "Lao People's Democratic Republic",
                    },
                    {
                      value: 'LV',
                      label: 'Latvia',
                    },
                    {
                      value: 'LB',
                      label: 'Lebanon',
                    },
                    {
                      value: 'LS',
                      label: 'Lesotho',
                    },
                    {
                      value: 'LR',
                      label: 'Liberia',
                    },
                    {
                      value: 'LY',
                      label: 'Libya',
                    },
                    {
                      value: 'LI',
                      label: 'Liechtenstein',
                    },
                    {
                      value: 'LT',
                      label: 'Lithuania',
                    },
                    {
                      value: 'LU',
                      label: 'Luxembourg',
                    },
                    {
                      value: 'MO',
                      label: 'Macao',
                    },
                    {
                      value: 'MG',
                      label: 'Madagascar',
                    },
                    {
                      value: 'MW',
                      label: 'Malawi',
                    },
                    {
                      value: 'MY',
                      label: 'Malaysia',
                    },
                    {
                      value: 'MV',
                      label: 'Maldives',
                    },
                    {
                      value: 'ML',
                      label: 'Mali',
                    },
                    {
                      value: 'MT',
                      label: 'Malta',
                    },
                    {
                      value: 'MH',
                      label: 'Marshall Islands',
                    },
                    {
                      value: 'MQ',
                      label: 'Martinique',
                    },
                    {
                      value: 'MR',
                      label: 'Mauritania',
                    },
                    {
                      value: 'MU',
                      label: 'Mauritius',
                    },
                    {
                      value: 'YT',
                      label: 'Mayotte',
                    },
                    {
                      value: 'MX',
                      label: 'Mexico',
                    },
                    {
                      value: 'FM',
                      label: 'Micronesia (Federated States of)',
                    },
                    {
                      value: 'MD',
                      label: 'Moldova (Republic of)',
                    },
                    {
                      value: 'MC',
                      label: 'Monaco',
                    },
                    {
                      value: 'MN',
                      label: 'Mongolia',
                    },
                    {
                      value: 'ME',
                      label: 'Montenegro',
                    },
                    {
                      value: 'MS',
                      label: 'Montserrat',
                    },
                    {
                      value: 'MA',
                      label: 'Morocco',
                    },
                    {
                      value: 'MZ',
                      label: 'Mozambique',
                    },
                    {
                      value: 'MM',
                      label: 'Myanmar',
                    },
                    {
                      value: 'NA',
                      label: 'Namibia',
                    },
                    {
                      value: 'NR',
                      label: 'Nauru',
                    },
                    {
                      value: 'NP',
                      label: 'Nepal',
                    },
                    {
                      value: 'NL',
                      label: 'Netherlands',
                    },
                    {
                      value: 'NC',
                      label: 'New Caledonia',
                    },
                    {
                      value: 'NZ',
                      label: 'New Zealand',
                    },
                    {
                      value: 'NI',
                      label: 'Nicaragua',
                    },
                    {
                      value: 'NE',
                      label: 'Niger',
                    },
                    {
                      value: 'NG',
                      label: 'Nigeria',
                    },
                    {
                      value: 'NU',
                      label: 'Niue',
                    },
                    {
                      value: 'NF',
                      label: 'Norfolk Island',
                    },
                    {
                      value: 'MK',
                      label: 'North Macedonia',
                    },
                    {
                      value: 'MP',
                      label: 'Northern Mariana Islands',
                    },
                    {
                      value: 'NO',
                      label: 'Norway',
                    },
                    {
                      value: 'OM',
                      label: 'Oman',
                    },
                    {
                      value: 'PK',
                      label: 'Pakistan',
                    },
                    {
                      value: 'PW',
                      label: 'Palau',
                    },
                    {
                      value: 'PS',
                      label: 'Palestine, State of',
                    },
                    {
                      value: 'PA',
                      label: 'Panama',
                    },
                    {
                      value: 'PG',
                      label: 'Papua New Guinea',
                    },
                    {
                      value: 'PY',
                      label: 'Paraguay',
                    },
                    {
                      value: 'PE',
                      label: 'Peru',
                    },
                    {
                      value: 'PH',
                      label: 'Philippines',
                    },
                    {
                      value: 'PN',
                      label: 'Pitcairn',
                    },
                    {
                      value: 'PL',
                      label: 'Poland',
                    },
                    {
                      value: 'PT',
                      label: 'Portugal',
                    },
                    {
                      value: 'PR',
                      label: 'Puerto Rico',
                    },
                    {
                      value: 'QA',
                      label: 'Qatar',
                    },
                    {
                      value: 'RE',
                      label: 'Réunion',
                    },
                    {
                      value: 'RO',
                      label: 'Romania',
                    },
                    {
                      value: 'RU',
                      label: 'Russian Federation',
                    },
                    {
                      value: 'RW',
                      label: 'Rwanda',
                    },
                    {
                      value: 'BL',
                      label: 'Saint Barthélemy',
                    },
                    {
                      value: 'SH',
                      label: 'Saint Helena, Ascension and Tristan da Cunha',
                    },
                    {
                      value: 'KN',
                      label: 'Saint Kitts and Nevis',
                    },
                    {
                      value: 'LC',
                      label: 'Saint Lucia',
                    },
                    {
                      value: 'MF',
                      label: 'Saint Martin (French part)',
                    },
                    {
                      value: 'PM',
                      label: 'Saint Pierre and Miquelon',
                    },
                    {
                      value: 'VC',
                      label: 'Saint Vincent and the Grenadines',
                    },
                    {
                      value: 'WS',
                      label: 'Samoa',
                    },
                    {
                      value: 'SM',
                      label: 'San Marino',
                    },
                    {
                      value: 'ST',
                      label: 'Sao Tome and Principe',
                    },
                    {
                      value: 'SA',
                      label: 'Saudi Arabia',
                    },
                    {
                      value: 'SN',
                      label: 'Senegal',
                    },
                    {
                      value: 'RS',
                      label: 'Serbia',
                    },
                    {
                      value: 'SC',
                      label: 'Seychelles',
                    },
                    {
                      value: 'SL',
                      label: 'Sierra Leone',
                    },
                    {
                      value: 'SG',
                      label: 'Singapore',
                    },
                    {
                      value: 'SX',
                      label: 'Sint Maarten (Dutch part)',
                    },
                    {
                      value: 'SK',
                      label: 'Slovakia',
                    },
                    {
                      value: 'SI',
                      label: 'Slovenia',
                    },
                    {
                      value: 'SB',
                      label: 'Solomon Islands',
                    },
                    {
                      value: 'SO',
                      label: 'Somalia',
                    },
                    {
                      value: 'ZA',
                      label: 'South Africa',
                    },
                    {
                      value: 'GS',
                      label: 'South Georgia and the South Sandwich Islands',
                    },
                    {
                      value: 'SS',
                      label: 'South Sudan',
                    },
                    {
                      value: 'ES',
                      label: 'Spain',
                    },
                    {
                      value: 'LK',
                      label: 'Sri Lanka',
                    },
                    {
                      value: 'SD',
                      label: 'Sudan',
                    },
                    {
                      value: 'SR',
                      label: 'Suriname',
                    },
                    {
                      value: 'SJ',
                      label: 'Svalbard and Jan Mayen',
                    },
                    {
                      value: 'SE',
                      label: 'Sweden',
                    },
                    {
                      value: 'CH',
                      label: 'Switzerland',
                    },
                    {
                      value: 'SY',
                      label: 'Syrian Arab Republic',
                    },
                    {
                      value: 'TW',
                      label: 'Taiwan',
                    },
                    {
                      value: 'TJ',
                      label: 'Tajikistan',
                    },
                    {
                      value: 'TZ',
                      label: 'Tanzania, United Republic of',
                    },
                    {
                      value: 'TH',
                      label: 'Thailand',
                    },
                    {
                      value: 'TL',
                      label: 'Timor-Leste',
                    },
                    {
                      value: 'TG',
                      label: 'Togo',
                    },
                    {
                      value: 'TK',
                      label: 'Tokelau',
                    },
                    {
                      value: 'TO',
                      label: 'Tonga',
                    },
                    {
                      value: 'TT',
                      label: 'Trinidad and Tobago',
                    },
                    {
                      value: 'TN',
                      label: 'Tunisia',
                    },
                    {
                      value: 'TR',
                      label: 'Turkey',
                    },
                    {
                      value: 'TM',
                      label: 'Turkmenistan',
                    },
                    {
                      value: 'TC',
                      label: 'Turks and Caicos Islands',
                    },
                    {
                      value: 'TV',
                      label: 'Tuvalu',
                    },
                    {
                      value: 'UG',
                      label: 'Uganda',
                    },
                    {
                      value: 'UA',
                      label: 'Ukraine',
                    },
                    {
                      value: 'AE',
                      label: 'United Arab Emirates',
                    },
                    {
                      value: 'GB',
                      label:
                        'United Kingdom of Great Britain and Northern Ireland',
                    },
                    {
                      value: 'UM',
                      label: 'United States Minor Outlying Islands',
                    },
                    {
                      value: 'UY',
                      label: 'Uruguay',
                    },
                    {
                      value: 'UZ',
                      label: 'Uzbekistan',
                    },
                    {
                      value: 'VU',
                      label: 'Vanuatu',
                    },
                    {
                      value: 'VE',
                      label: 'Venezuela (Bolivarian Republic of)',
                    },
                    {
                      value: 'VN',
                      label: 'Viet Nam',
                    },
                    {
                      value: 'VG',
                      label: 'Virgin Islands (British)',
                    },
                    {
                      value: 'VI',
                      label: 'Virgin Islands (U.S.)',
                    },
                    {
                      value: 'WF',
                      label: 'Wallis and Futuna',
                    },
                    {
                      value: 'EH',
                      label: 'Western Sahara',
                    },
                    {
                      value: 'YE',
                      label: 'Yemen',
                    },
                    {
                      value: 'ZM',
                      label: 'Zambia',
                    },
                    {
                      value: 'ZW',
                      label: 'Zimbabwe',
                    },
                  ],
                  default: 'US',
                },
                type: 'string',
              },
            },
            required: ['country'],
          },
          {
            $id: 'StateCredential',
            if: {
              type: 'object',
              properties: {
                country: {
                  description:
                    'If the country from Address Credential is the US.',
                  const: 'US',
                  type: 'string',
                },
              },
              required: ['country'],
            },
            then: {
              type: 'object',
              properties: {
                state: {
                  description: 'Then the state must be a valid US state.',
                  format: 'iso3166USRegionCode',
                  title: 'State',
                  input: {
                    type: 'Select',
                    options: [
                      {
                        value: 'AL',
                        label: 'Alabama',
                      },
                      {
                        value: 'AK',
                        label: 'Alaska',
                      },
                      {
                        value: 'AZ',
                        label: 'Arizona',
                      },
                      {
                        value: 'AR',
                        label: 'Arkansas',
                      },
                      {
                        value: 'CA',
                        label: 'California',
                      },
                      {
                        value: 'CO',
                        label: 'Colorado',
                      },
                      {
                        value: 'CT',
                        label: 'Connecticut',
                      },
                      {
                        value: 'DE',
                        label: 'Delaware',
                      },
                      {
                        value: 'DC',
                        label: 'District of Columbia',
                      },
                      {
                        value: 'FL',
                        label: 'Florida',
                      },
                      {
                        value: 'GA',
                        label: 'Georgia',
                      },
                      {
                        value: 'HI',
                        label: 'Hawaii',
                      },
                      {
                        value: 'ID',
                        label: 'Idaho',
                      },
                      {
                        value: 'IL',
                        label: 'Illinois',
                      },
                      {
                        value: 'IN',
                        label: 'Indiana',
                      },
                      {
                        value: 'IA',
                        label: 'Iowa',
                      },
                      {
                        value: 'KS',
                        label: 'Kansas',
                      },
                      {
                        value: 'KY',
                        label: 'Kentucky',
                      },
                      {
                        value: 'LA',
                        label: 'Louisiana',
                      },
                      {
                        value: 'ME',
                        label: 'Maine',
                      },
                      {
                        value: 'MD',
                        label: 'Maryland',
                      },
                      {
                        value: 'MA',
                        label: 'Massachusetts',
                      },
                      {
                        value: 'MI',
                        label: 'Michigan',
                      },
                      {
                        value: 'MN',
                        label: 'Minnesota',
                      },
                      {
                        value: 'MS',
                        label: 'Mississippi',
                      },
                      {
                        value: 'MO',
                        label: 'Missouri',
                      },
                      {
                        value: 'MT',
                        label: 'Montana',
                      },
                      {
                        value: 'NE',
                        label: 'Nebraska',
                      },
                      {
                        value: 'NV',
                        label: 'Nevada',
                      },
                      {
                        value: 'NH',
                        label: 'New Hampshire',
                      },
                      {
                        value: 'NJ',
                        label: 'New Jersey',
                      },
                      {
                        value: 'NM',
                        label: 'New Mexico',
                      },
                      {
                        value: 'NY',
                        label: 'New York',
                      },
                      {
                        value: 'NC',
                        label: 'North Carolina',
                      },
                      {
                        value: 'ND',
                        label: 'North Dakota',
                      },
                      {
                        value: 'OH',
                        label: 'Ohio',
                      },
                      {
                        value: 'OK',
                        label: 'Oklahoma',
                      },
                      {
                        value: 'OR',
                        label: 'Oregon',
                      },
                      {
                        value: 'PA',
                        label: 'Pennsylvania',
                      },
                      {
                        value: 'RI',
                        label: 'Rhode Island',
                      },
                      {
                        value: 'SC',
                        label: 'South Carolina',
                      },
                      {
                        value: 'SD',
                        label: 'South Dakota',
                      },
                      {
                        value: 'TN',
                        label: 'Tennessee',
                      },
                      {
                        value: 'TX',
                        label: 'Texas',
                      },
                      {
                        value: 'UT',
                        label: 'Utah',
                      },
                      {
                        value: 'VT',
                        label: 'Vermont',
                      },
                      {
                        value: 'VI',
                        label: 'Virgin Islands',
                      },
                      {
                        value: 'VA',
                        label: 'Virginia',
                      },
                      {
                        value: 'WA',
                        label: 'Washington',
                      },
                      {
                        value: 'WV',
                        label: 'West Virginia',
                      },
                      {
                        value: 'WI',
                        label: 'Wisconsin',
                      },
                      {
                        value: 'WY',
                        label: 'Wyoming',
                      },
                    ],
                  },
                  type: 'string',
                },
              },
              required: ['state'],
            },
            type: 'object',
            properties: {
              state: {
                description: "A state's ISO 3166-2 code.",
                examples: ['CA', 'GA', 'SP'],
                format: 'iso3166RegionCode',
                title: 'State or Region',
                displayFormat: 'State',
                input: {
                  type: 'Text',
                },
                type: 'string',
              },
            },
            required: ['state'],
          },
          {
            $id: 'ZipCodeCredential',
            if: {
              type: 'object',
              properties: {
                country: {
                  description:
                    'If the country from Address Credential is the US.',
                  const: 'US',
                  type: 'string',
                },
              },
              required: ['country'],
            },
            then: {
              type: 'object',
              properties: {
                zipCode: {
                  description: 'Then the zip code must be a valid US Zip Code.',
                  format: 'usZipCode',
                  input: {
                    type: 'Text',
                    pattern: '^[0-9]{5}(?:-[0-9]{4})?$',
                  },
                  type: 'string',
                },
              },
              required: ['zipCode'],
            },
            type: 'object',
            properties: {
              zipCode: {
                description: 'The zip code of the address.',
                examples: ['94103', '94103-1234'],
                title: 'Zip Code',
                displayFormat: 'String',
                input: {
                  type: 'Text',
                },
                type: 'string',
              },
            },
            required: ['zipCode'],
          },
        ],
      },
      {
        type: 'object',
        properties: {
          address: {
            format: 'address',
            description:
              'Address in the format of: street, city, iso3166-code postal-code',
            examples: [
              '10 Downing Street, London, GB-ENG SW1A 2AA',
              '307 3rd Ave, Apt #4, San Austin, US-GA 18025-9876',
            ],
            title: 'Street Address',
            displayFormat: 'Address',
            type: 'string',
          },
        },
        required: ['address'],
      },
    ],
  },
  AnnualIncomeCredential: {
    $id: 'AnnualIncomeCredential',
    unevaluatedProperties: false,
    errorMessage: {
      unevaluatedProperties: "AnnualIncomeCredential doesn't match the schema",
    },
    if: {
      additionalProperties: false,
      type: 'object',
      properties: {
        income: {
          type: 'string',
        },
      },
      required: ['income'],
    },
    then: {
      type: 'object',
      properties: {
        income: {
          format: 'iso4217Amount',
          type: 'string',
        },
      },
      required: ['income'],
    },
    anyOf: [
      {
        type: 'object',
        allOf: [
          {
            $ref: 'CurrencyCredential',
          },
          {
            $ref: 'AmountCredential',
          },
        ],
      },
      {
        additionalProperties: true,
        type: 'object',
        properties: {
          income: {
            format: 'iso4217Amount',
            description:
              'Annual income with the preceding ISO4217 currency format.',
            examples: ['USD 101000', 'GBP 46000'],
            title: 'Annual Income',
            displayFormat: 'CurrencyAmount',
            type: 'string',
          },
        },
        required: ['income'],
      },
    ],
  },
  EmployerCredential: {
    anyOf: [
      {
        $id: 'EmployerNameCredential',
        type: 'object',
        properties: {
          employer: {
            description: 'Employer name',
            examples: ['Acme Corp', 'Piped Piper', 'Hooli'],
            title: 'Employer',
            displayFormat: 'String',
            input: {
              type: 'Text',
            },
            type: 'string',
          },
        },
        required: ['employer'],
      },
      {
        $id: 'EmploymentStartDateCredential',
        type: 'object',
        properties: {
          startDate: {
            format: 'unixMsEpochDayFormat',
            description:
              'Unix time in milliseconds since epoch, or a negative number of milliseconds before the Unix epoch, which equates to 12:00:00:000 UTC of the date',
            examples: ['631195200000', '-331560000000'],
            title: 'Employment Start Date',
            displayFormat: 'Date',
            input: {
              type: 'Date',
            },
            type: 'string',
          },
        },
        required: ['startDate'],
      },
      {
        $id: 'TitleCredential',
        type: 'object',
        properties: {
          title: {
            description: 'Job title',
            examples: ['Software Engineer', 'Designer', 'Construction Worker'],
            title: 'Job Title',
            displayFormat: 'String',
            input: {
              type: 'Text',
            },
            type: 'string',
          },
        },
        required: ['title'],
      },
      {
        $id: 'IncomeRangeCredential',
        type: 'object',
        properties: {
          incomeRange: {
            format: 'iso4217AmountRange',
            description:
              'Annual income range with the preceding ISO4217 currency code followed by min<value>_max<value>.',
            examples: ['USD min100000_max200000', 'GBP min40000_max50000'],
            title: 'Income Range',
            displayFormat: 'CurrencyRange',
            input: {
              type: 'Select',
              options: [
                {
                  value: 'USD min0_max25000',
                  label: 'Under $25,000',
                },
                {
                  value: 'USD min25000_max50000',
                  label: '$25,000 - $50,000',
                },
                {
                  value: 'USD min50000_max100000',
                  label: '$50,000 - $100,000',
                },
                {
                  value: 'USD min100000_max200000',
                  label: '$100,000 - $200,000',
                },
                {
                  value: 'USD min200000_max300000',
                  label: '$200,000 - $300,000',
                },
                {
                  value: 'USD min300000_max500000',
                  label: '$300,000 - $500,000',
                },
                {
                  value: 'USD min500000_max1200000',
                  label: '$500,000 - $1,200,000',
                },
                {
                  value: 'USD min1200000_max9999999',
                  label: '$1,200,000 - $9,999,999',
                },
              ],
            },
            type: 'string',
          },
        },
        required: ['incomeRange'],
      },
      {
        $id: 'AnnualIncomeCredential',
        unevaluatedProperties: false,
        errorMessage: {
          unevaluatedProperties:
            "AnnualIncomeCredential doesn't match the schema",
        },
        if: {
          additionalProperties: false,
          type: 'object',
          properties: {
            income: {
              type: 'string',
            },
          },
          required: ['income'],
        },
        then: {
          type: 'object',
          properties: {
            income: {
              format: 'iso4217Amount',
              type: 'string',
            },
          },
          required: ['income'],
        },
        anyOf: [
          {
            type: 'object',
            allOf: [
              {
                $ref: 'CurrencyCredential',
              },
              {
                $ref: 'AmountCredential',
              },
            ],
          },
          {
            additionalProperties: true,
            type: 'object',
            properties: {
              income: {
                format: 'iso4217Amount',
                description:
                  'Annual income with the preceding ISO4217 currency format.',
                examples: ['USD 101000', 'GBP 46000'],
                title: 'Annual Income',
                displayFormat: 'CurrencyAmount',
                type: 'string',
              },
            },
            required: ['income'],
          },
        ],
      },
    ],
    $id: 'EmployerCredential',
    unevaluatedProperties: false,
    errorMessage: {
      unevaluatedProperties: "EmployerCredential doesn't match the schema",
    },
  },
  FullNameCredential: {
    $id: 'FullNameCredential',
    unevaluatedProperties: false,
    errorMessage: {
      unevaluatedProperties: "FullNameCredential doesn't match the schema",
    },
    anyOf: [
      {
        anyOf: [
          {
            $id: 'FirstNameCredential',
            type: 'object',
            properties: {
              firstName: {
                description: "A person's first name",
                examples: ['John', 'Mary Kate'],
                title: 'First Name',
                displayFormat: 'String',
                input: {
                  type: 'Text',
                },
                type: 'string',
              },
            },
            required: ['firstName'],
          },
          {
            $id: 'MiddleNameCredential',
            type: 'object',
            properties: {
              middleName: {
                description: "A person's middle name",
                examples: ['Henry', 'Fitzgerald'],
                title: 'Middle Name',
                displayFormat: 'String',
                input: {
                  type: 'Text',
                },
                type: 'string',
              },
            },
            required: ['middleName'],
          },
          {
            $id: 'LastNameCredential',
            type: 'object',
            properties: {
              lastName: {
                description: "A person's last name",
                examples: ['Smith', 'Garcia-Tony'],
                title: 'Last Name',
                displayFormat: 'String',
                input: {
                  type: 'Text',
                },
                type: 'string',
              },
            },
            required: ['lastName'],
          },
        ],
      },
      {
        type: 'object',
        properties: {
          fullName: {
            description: "A person's full name",
            examples: [
              'John Smith',
              'John Michael Smith',
              'Mary Kate Sierra Garcia-Tony',
            ],
            title: 'Full Name',
            displayFormat: 'String',
            type: 'string',
          },
        },
        required: ['fullName'],
      },
    ],
  },
  GovernmentIdCredential: {
    $id: 'GovernmentIdCredential',
    unevaluatedProperties: false,
    errorMessage: {
      unevaluatedProperties: "GovernmentIdCredential doesn't match the schema",
    },
    anyOf: [
      {
        $id: 'DocumentBackImageCredential',
        type: 'object',
        properties: {
          documentBackImage: {
            format: 'dataUriBase64Image',
            description:
              'Base64 encoded back of government identification document image with the Data URI scheme prefix, i.e. data:image/<format>;base64,<encoded-data>',
            examples: [
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
            ],
            title: 'Back of Document Image',
            displayFormat: 'Image',
            input: {
              type: 'Image',
            },
            type: 'string',
          },
        },
        required: ['documentBackImage'],
      },
      {
        $id: 'DocumentImageCredential',
        type: 'object',
        properties: {
          documentImage: {
            format: 'dataUriBase64Image',
            description:
              'Base64 encoded government identification document image with the Data URI scheme prefix, i.e. data:image/<format>;base64,<encoded-data>',
            examples: [
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
            ],
            title: 'Document Image',
            displayFormat: 'Image',
            input: {
              type: 'Image',
            },
            type: 'string',
          },
        },
        required: ['documentImage'],
      },
      {
        $id: 'DocumentTypeCredential',
        type: 'object',
        properties: {
          documentType: {
            format: 'documentType',
            description: "A person's government identification document type",
            examples: [
              'Drivers License',
              'Passport',
              'State ID',
              'Military ID',
              'National ID',
              'Birth Certificate',
              'Voter Registration Card',
              'Other',
            ],
            title: 'Document Type',
            displayFormat: 'String',
            input: {
              type: 'Select',
              options: [
                'Drivers License',
                'Passport',
                'State ID',
                'Military ID',
                'National ID',
                'Birth Certificate',
                'Voter Registration Card',
                'Other',
              ],
            },
            type: 'string',
          },
        },
        required: ['documentType'],
      },
      {
        $id: 'DocumentNumberCredential',
        type: 'object',
        properties: {
          idNumber: {
            description:
              'Government identification document number. Note, it can be alphanumeric.',
            examples: ['801322-1117621', 'F4698E1'],
            title: 'Document ID',
            displayFormat: 'String',
            input: {
              type: 'Text',
            },
            type: 'string',
          },
        },
        required: ['idNumber'],
      },
      {
        $id: 'ExpirationDateCredential',
        type: 'object',
        properties: {
          expirationDate: {
            format: 'unixMsEpochDayFormat',
            description:
              'Unix time in milliseconds since epoch, or a negative number of milliseconds before the Unix epoch, which equates to 12:00:00:000 UTC of the date',
            examples: ['631195200000', '-331560000000'],
            title: 'Expiration Date',
            displayFormat: 'Date',
            input: {
              type: 'Date',
            },
            type: 'string',
          },
        },
        required: ['expirationDate'],
      },
      {
        $id: 'IssuanceDateCredential',
        type: 'object',
        properties: {
          issuanceDate: {
            format: 'unixMsEpochDayFormat',
            description:
              'Unix time in milliseconds since epoch, or a negative number of milliseconds before the Unix epoch, which equates to 12:00:00:000 UTC of the date',
            examples: ['631195200000', '-331560000000'],
            title: 'Issuance Date',
            displayFormat: 'Date',
            input: {
              type: 'Date',
            },
            type: 'string',
          },
        },
        required: ['issuanceDate'],
      },
      {
        $id: 'StateCredential',
        if: {
          type: 'object',
          properties: {
            country: {
              description: 'If the country from Address Credential is the US.',
              const: 'US',
              type: 'string',
            },
          },
          required: ['country'],
        },
        then: {
          type: 'object',
          properties: {
            state: {
              description: 'Then the state must be a valid US state.',
              format: 'iso3166USRegionCode',
              title: 'State',
              input: {
                type: 'Select',
                options: [
                  {
                    value: 'AL',
                    label: 'Alabama',
                  },
                  {
                    value: 'AK',
                    label: 'Alaska',
                  },
                  {
                    value: 'AZ',
                    label: 'Arizona',
                  },
                  {
                    value: 'AR',
                    label: 'Arkansas',
                  },
                  {
                    value: 'CA',
                    label: 'California',
                  },
                  {
                    value: 'CO',
                    label: 'Colorado',
                  },
                  {
                    value: 'CT',
                    label: 'Connecticut',
                  },
                  {
                    value: 'DE',
                    label: 'Delaware',
                  },
                  {
                    value: 'DC',
                    label: 'District of Columbia',
                  },
                  {
                    value: 'FL',
                    label: 'Florida',
                  },
                  {
                    value: 'GA',
                    label: 'Georgia',
                  },
                  {
                    value: 'HI',
                    label: 'Hawaii',
                  },
                  {
                    value: 'ID',
                    label: 'Idaho',
                  },
                  {
                    value: 'IL',
                    label: 'Illinois',
                  },
                  {
                    value: 'IN',
                    label: 'Indiana',
                  },
                  {
                    value: 'IA',
                    label: 'Iowa',
                  },
                  {
                    value: 'KS',
                    label: 'Kansas',
                  },
                  {
                    value: 'KY',
                    label: 'Kentucky',
                  },
                  {
                    value: 'LA',
                    label: 'Louisiana',
                  },
                  {
                    value: 'ME',
                    label: 'Maine',
                  },
                  {
                    value: 'MD',
                    label: 'Maryland',
                  },
                  {
                    value: 'MA',
                    label: 'Massachusetts',
                  },
                  {
                    value: 'MI',
                    label: 'Michigan',
                  },
                  {
                    value: 'MN',
                    label: 'Minnesota',
                  },
                  {
                    value: 'MS',
                    label: 'Mississippi',
                  },
                  {
                    value: 'MO',
                    label: 'Missouri',
                  },
                  {
                    value: 'MT',
                    label: 'Montana',
                  },
                  {
                    value: 'NE',
                    label: 'Nebraska',
                  },
                  {
                    value: 'NV',
                    label: 'Nevada',
                  },
                  {
                    value: 'NH',
                    label: 'New Hampshire',
                  },
                  {
                    value: 'NJ',
                    label: 'New Jersey',
                  },
                  {
                    value: 'NM',
                    label: 'New Mexico',
                  },
                  {
                    value: 'NY',
                    label: 'New York',
                  },
                  {
                    value: 'NC',
                    label: 'North Carolina',
                  },
                  {
                    value: 'ND',
                    label: 'North Dakota',
                  },
                  {
                    value: 'OH',
                    label: 'Ohio',
                  },
                  {
                    value: 'OK',
                    label: 'Oklahoma',
                  },
                  {
                    value: 'OR',
                    label: 'Oregon',
                  },
                  {
                    value: 'PA',
                    label: 'Pennsylvania',
                  },
                  {
                    value: 'RI',
                    label: 'Rhode Island',
                  },
                  {
                    value: 'SC',
                    label: 'South Carolina',
                  },
                  {
                    value: 'SD',
                    label: 'South Dakota',
                  },
                  {
                    value: 'TN',
                    label: 'Tennessee',
                  },
                  {
                    value: 'TX',
                    label: 'Texas',
                  },
                  {
                    value: 'UT',
                    label: 'Utah',
                  },
                  {
                    value: 'VT',
                    label: 'Vermont',
                  },
                  {
                    value: 'VI',
                    label: 'Virgin Islands',
                  },
                  {
                    value: 'VA',
                    label: 'Virginia',
                  },
                  {
                    value: 'WA',
                    label: 'Washington',
                  },
                  {
                    value: 'WV',
                    label: 'West Virginia',
                  },
                  {
                    value: 'WI',
                    label: 'Wisconsin',
                  },
                  {
                    value: 'WY',
                    label: 'Wyoming',
                  },
                ],
              },
              type: 'string',
            },
          },
          required: ['state'],
        },
        type: 'object',
        properties: {
          state: {
            description: "A state's ISO 3166-2 code.",
            examples: ['CA', 'GA', 'SP'],
            format: 'iso3166RegionCode',
            title: 'State or Region',
            displayFormat: 'State',
            input: {
              type: 'Text',
            },
            type: 'string',
          },
        },
        required: ['state'],
      },
    ],
  },
  PhoneInfoCredential: {
    anyOf: [
      {
        $id: 'PhoneCredential',
        type: 'object',
        properties: {
          phone: {
            format: 'phone',
            description:
              'A phone number in the E.164 format, [+][country code][number].',
            examples: ['+16175551212', '+14041238686'],
            title: 'Phone',
            displayFormat: 'Phone',
            input: {
              type: 'Phone',
            },
            type: 'string',
          },
        },
        required: ['phone'],
      },
      {
        $id: 'LineTypeCredential',
        type: 'object',
        properties: {
          type: {
            format: 'lineType',
            description: 'Line type associated with a phone number.',
            examples: [
              'Mobile',
              'Landline',
              'FixedVoIP',
              'NonFixVoIP',
              'Unknown',
              'Unlisted',
            ],
            title: 'Phone Line Type',
            displayFormat: 'String',
            type: 'string',
          },
        },
        required: ['type'],
      },
    ],
    $id: 'PhoneInfoCredential',
    unevaluatedProperties: false,
    errorMessage: {
      unevaluatedProperties: "PhoneInfoCredential doesn't match the schema",
    },
  },
  EmploymentStartDateCredential: {
    $id: 'EmploymentStartDateCredential',
    type: 'object',
    properties: {
      startDate: {
        format: 'unixMsEpochDayFormat',
        description:
          'Unix time in milliseconds since epoch, or a negative number of milliseconds before the Unix epoch, which equates to 12:00:00:000 UTC of the date',
        examples: ['631195200000', '-331560000000'],
        title: 'Employment Start Date',
        displayFormat: 'Date',
        input: {
          type: 'Date',
        },
        type: 'string',
      },
    },
    required: ['startDate'],
  },
  IncomeRangeCredential: {
    $id: 'IncomeRangeCredential',
    type: 'object',
    properties: {
      incomeRange: {
        format: 'iso4217AmountRange',
        description:
          'Annual income range with the preceding ISO4217 currency code followed by min<value>_max<value>.',
        examples: ['USD min100000_max200000', 'GBP min40000_max50000'],
        title: 'Income Range',
        displayFormat: 'CurrencyRange',
        input: {
          type: 'Select',
          options: [
            {
              value: 'USD min0_max25000',
              label: 'Under $25,000',
            },
            {
              value: 'USD min25000_max50000',
              label: '$25,000 - $50,000',
            },
            {
              value: 'USD min50000_max100000',
              label: '$50,000 - $100,000',
            },
            {
              value: 'USD min100000_max200000',
              label: '$100,000 - $200,000',
            },
            {
              value: 'USD min200000_max300000',
              label: '$200,000 - $300,000',
            },
            {
              value: 'USD min300000_max500000',
              label: '$300,000 - $500,000',
            },
            {
              value: 'USD min500000_max1200000',
              label: '$500,000 - $1,200,000',
            },
            {
              value: 'USD min1200000_max9999999',
              label: '$1,200,000 - $9,999,999',
            },
          ],
        },
        type: 'string',
      },
    },
    required: ['incomeRange'],
  },
  TitleCredential: {
    $id: 'TitleCredential',
    type: 'object',
    properties: {
      title: {
        description: 'Job title',
        examples: ['Software Engineer', 'Designer', 'Construction Worker'],
        title: 'Job Title',
        displayFormat: 'String',
        input: {
          type: 'Text',
        },
        type: 'string',
      },
    },
    required: ['title'],
  },
  EmployerNameCredential: {
    $id: 'EmployerNameCredential',
    type: 'object',
    properties: {
      employer: {
        description: 'Employer name',
        examples: ['Acme Corp', 'Piped Piper', 'Hooli'],
        title: 'Employer',
        displayFormat: 'String',
        input: {
          type: 'Text',
        },
        type: 'string',
      },
    },
    required: ['employer'],
  },
  DocumentBackImageCredential: {
    $id: 'DocumentBackImageCredential',
    type: 'object',
    properties: {
      documentBackImage: {
        format: 'dataUriBase64Image',
        description:
          'Base64 encoded back of government identification document image with the Data URI scheme prefix, i.e. data:image/<format>;base64,<encoded-data>',
        examples: [
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
        ],
        title: 'Back of Document Image',
        displayFormat: 'Image',
        input: {
          type: 'Image',
        },
        type: 'string',
      },
    },
    required: ['documentBackImage'],
  },
  DocumentImageCredential: {
    $id: 'DocumentImageCredential',
    type: 'object',
    properties: {
      documentImage: {
        format: 'dataUriBase64Image',
        description:
          'Base64 encoded government identification document image with the Data URI scheme prefix, i.e. data:image/<format>;base64,<encoded-data>',
        examples: [
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
        ],
        title: 'Document Image',
        displayFormat: 'Image',
        input: {
          type: 'Image',
        },
        type: 'string',
      },
    },
    required: ['documentImage'],
  },
  DocumentNumberCredential: {
    $id: 'DocumentNumberCredential',
    type: 'object',
    properties: {
      idNumber: {
        description:
          'Government identification document number. Note, it can be alphanumeric.',
        examples: ['801322-1117621', 'F4698E1'],
        title: 'Document ID',
        displayFormat: 'String',
        input: {
          type: 'Text',
        },
        type: 'string',
      },
    },
    required: ['idNumber'],
  },
  DocumentTypeCredential: {
    $id: 'DocumentTypeCredential',
    type: 'object',
    properties: {
      documentType: {
        format: 'documentType',
        description: "A person's government identification document type",
        examples: [
          'Drivers License',
          'Passport',
          'State ID',
          'Military ID',
          'National ID',
          'Birth Certificate',
          'Voter Registration Card',
          'Other',
        ],
        title: 'Document Type',
        displayFormat: 'String',
        input: {
          type: 'Select',
          options: [
            'Drivers License',
            'Passport',
            'State ID',
            'Military ID',
            'National ID',
            'Birth Certificate',
            'Voter Registration Card',
            'Other',
          ],
        },
        type: 'string',
      },
    },
    required: ['documentType'],
  },
  ExpirationDateCredential: {
    $id: 'ExpirationDateCredential',
    type: 'object',
    properties: {
      expirationDate: {
        format: 'unixMsEpochDayFormat',
        description:
          'Unix time in milliseconds since epoch, or a negative number of milliseconds before the Unix epoch, which equates to 12:00:00:000 UTC of the date',
        examples: ['631195200000', '-331560000000'],
        title: 'Expiration Date',
        displayFormat: 'Date',
        input: {
          type: 'Date',
        },
        type: 'string',
      },
    },
    required: ['expirationDate'],
  },
  IssuanceDateCredential: {
    $id: 'IssuanceDateCredential',
    type: 'object',
    properties: {
      issuanceDate: {
        format: 'unixMsEpochDayFormat',
        description:
          'Unix time in milliseconds since epoch, or a negative number of milliseconds before the Unix epoch, which equates to 12:00:00:000 UTC of the date',
        examples: ['631195200000', '-331560000000'],
        title: 'Issuance Date',
        displayFormat: 'Date',
        input: {
          type: 'Date',
        },
        type: 'string',
      },
    },
    required: ['issuanceDate'],
  },
  BirthDateCredential: {
    $id: 'BirthDateCredential',
    type: 'object',
    properties: {
      birthDate: {
        format: 'unixMsEpochDayFormat',
        description:
          'Unix time in milliseconds since epoch, or a negative number of milliseconds before the Unix epoch, which equates to 12:00:00:000 UTC of the date',
        examples: ['631195200000', '-331560000000'],
        title: 'Birthday',
        displayFormat: 'Date',
        input: {
          type: 'Date',
        },
        type: 'string',
      },
    },
    required: ['birthDate'],
  },
  CountryResidenceCredential: {
    $id: 'CountryResidenceCredential',
    type: 'object',
    properties: {
      country: {
        format: 'iso3361Alpha2',
        description:
          "A person's country of residence in ISO 3166-1 alpha-2 format.",
        examples: ['US', 'CA', 'MX'],
        title: 'Country',
        displayFormat: 'String',
        input: {
          type: 'Select',
          options: [
            {
              value: 'US',
              label: 'United States of America',
            },
            {
              value: 'CA',
              label: 'Canada',
            },
            {
              value: 'AF',
              label: 'Afghanistan',
            },
            {
              value: 'AL',
              label: 'Albania',
            },
            {
              value: 'DZ',
              label: 'Algeria',
            },
            {
              value: 'AS',
              label: 'American Samoa',
            },
            {
              value: 'AD',
              label: 'Andorra',
            },
            {
              value: 'AO',
              label: 'Angola',
            },
            {
              value: 'AI',
              label: 'Anguilla',
            },
            {
              value: 'AQ',
              label: 'Antarctica',
            },
            {
              value: 'AG',
              label: 'Antigua and Barbuda',
            },
            {
              value: 'AR',
              label: 'Argentina',
            },
            {
              value: 'AM',
              label: 'Armenia',
            },
            {
              value: 'AW',
              label: 'Aruba',
            },
            {
              value: 'AU',
              label: 'Australia',
            },
            {
              value: 'AT',
              label: 'Austria',
            },
            {
              value: 'AZ',
              label: 'Azerbaijan',
            },
            {
              value: 'BS',
              label: 'Bahamas',
            },
            {
              value: 'BH',
              label: 'Bahrain',
            },
            {
              value: 'BD',
              label: 'Bangladesh',
            },
            {
              value: 'BB',
              label: 'Barbados',
            },
            {
              value: 'BY',
              label: 'Belarus',
            },
            {
              value: 'BE',
              label: 'Belgium',
            },
            {
              value: 'BZ',
              label: 'Belize',
            },
            {
              value: 'BJ',
              label: 'Benin',
            },
            {
              value: 'BM',
              label: 'Bermuda',
            },
            {
              value: 'BT',
              label: 'Bhutan',
            },
            {
              value: 'BO',
              label: 'Bolivia (Plurinational State of)',
            },
            {
              value: 'BQ',
              label: 'Bonaire, Sint Eustatius and Saba',
            },
            {
              value: 'BA',
              label: 'Bosnia and Herzegovina',
            },
            {
              value: 'BW',
              label: 'Botswana',
            },
            {
              value: 'BV',
              label: 'Bouvet Island',
            },
            {
              value: 'BR',
              label: 'Brazil',
            },
            {
              value: 'IO',
              label: 'British Indian Ocean Territory',
            },
            {
              value: 'BN',
              label: 'Brunei Darussalam',
            },
            {
              value: 'BG',
              label: 'Bulgaria',
            },
            {
              value: 'BF',
              label: 'Burkina Faso',
            },
            {
              value: 'BI',
              label: 'Burundi',
            },
            {
              value: 'CV',
              label: 'Cabo Verde',
            },
            {
              value: 'KH',
              label: 'Cambodia',
            },
            {
              value: 'CM',
              label: 'Cameroon',
            },
            {
              value: 'KY',
              label: 'Cayman Islands',
            },
            {
              value: 'CF',
              label: 'Central African Republic',
            },
            {
              value: 'TD',
              label: 'Chad',
            },
            {
              value: 'CL',
              label: 'Chile',
            },
            {
              value: 'CN',
              label: 'China',
            },
            {
              value: 'CX',
              label: 'Christmas Island',
            },
            {
              value: 'CC',
              label: 'Cocos (Keeling) Islands',
            },
            {
              value: 'CO',
              label: 'Colombia',
            },
            {
              value: 'KM',
              label: 'Comoros',
            },
            {
              value: 'CG',
              label: 'Congo',
            },
            {
              value: 'CD',
              label: 'Congo (Democratic Republic of the)',
            },
            {
              value: 'CK',
              label: 'Cook Islands',
            },
            {
              value: 'CR',
              label: 'Costa Rica',
            },
            {
              value: 'CI',
              label: "Côte d'Ivoire",
            },
            {
              value: 'HR',
              label: 'Croatia',
            },
            {
              value: 'CU',
              label: 'Cuba',
            },
            {
              value: 'CW',
              label: 'Curaçao',
            },
            {
              value: 'CY',
              label: 'Cyprus',
            },
            {
              value: 'CZ',
              label: 'Czechia',
            },
            {
              value: 'DK',
              label: 'Denmark',
            },
            {
              value: 'DJ',
              label: 'Djibouti',
            },
            {
              value: 'DM',
              label: 'Dominica',
            },
            {
              value: 'DO',
              label: 'Dominican Republic',
            },
            {
              value: 'EC',
              label: 'Ecuador',
            },
            {
              value: 'EG',
              label: 'Egypt',
            },
            {
              value: 'SV',
              label: 'El Salvador',
            },
            {
              value: 'GQ',
              label: 'Equatorial Guinea',
            },
            {
              value: 'ER',
              label: 'Eritrea',
            },
            {
              value: 'EE',
              label: 'Estonia',
            },
            {
              value: 'SZ',
              label: 'Eswatini',
            },
            {
              value: 'ET',
              label: 'Ethiopia',
            },
            {
              value: 'FK',
              label: 'Falkland Islands (Malvinas)',
            },
            {
              value: 'FO',
              label: 'Faroe Islands',
            },
            {
              value: 'FJ',
              label: 'Fiji',
            },
            {
              value: 'FI',
              label: 'Finland',
            },
            {
              value: 'FR',
              label: 'France',
            },
            {
              value: 'GF',
              label: 'French Guiana',
            },
            {
              value: 'PF',
              label: 'French Polynesia',
            },
            {
              value: 'TF',
              label: 'French Southern Territories',
            },
            {
              value: 'GA',
              label: 'Gabon',
            },
            {
              value: 'GM',
              label: 'Gambia',
            },
            {
              value: 'GE',
              label: 'Georgia',
            },
            {
              value: 'DE',
              label: 'Germany',
            },
            {
              value: 'GH',
              label: 'Ghana',
            },
            {
              value: 'GI',
              label: 'Gibraltar',
            },
            {
              value: 'GR',
              label: 'Greece',
            },
            {
              value: 'GL',
              label: 'Greenland',
            },
            {
              value: 'GD',
              label: 'Grenada',
            },
            {
              value: 'GP',
              label: 'Guadeloupe',
            },
            {
              value: 'GU',
              label: 'Guam',
            },
            {
              value: 'GT',
              label: 'Guatemala',
            },
            {
              value: 'GG',
              label: 'Guernsey',
            },
            {
              value: 'GN',
              label: 'Guinea',
            },
            {
              value: 'GW',
              label: 'Guinea-Bissau',
            },
            {
              value: 'GY',
              label: 'Guyana',
            },
            {
              value: 'HT',
              label: 'Haiti',
            },
            {
              value: 'HM',
              label: 'Heard Island and McDonald Islands',
            },
            {
              value: 'VA',
              label: 'Holy See',
            },
            {
              value: 'HN',
              label: 'Honduras',
            },
            {
              value: 'HK',
              label: 'Hong Kong',
            },
            {
              value: 'HU',
              label: 'Hungary',
            },
            {
              value: 'IS',
              label: 'Iceland',
            },
            {
              value: 'IN',
              label: 'India',
            },
            {
              value: 'ID',
              label: 'Indonesia',
            },
            {
              value: 'IR',
              label: 'Iran (Islamic Republic of)',
            },
            {
              value: 'IQ',
              label: 'Iraq',
            },
            {
              value: 'IE',
              label: 'Ireland',
            },
            {
              value: 'IM',
              label: 'Isle of Man',
            },
            {
              value: 'IL',
              label: 'Israel',
            },
            {
              value: 'IT',
              label: 'Italy',
            },
            {
              value: 'JM',
              label: 'Jamaica',
            },
            {
              value: 'JP',
              label: 'Japan',
            },
            {
              value: 'JE',
              label: 'Jersey',
            },
            {
              value: 'JO',
              label: 'Jordan',
            },
            {
              value: 'KZ',
              label: 'Kazakhstan',
            },
            {
              value: 'KE',
              label: 'Kenya',
            },
            {
              value: 'KI',
              label: 'Kiribati',
            },
            {
              value: 'KP',
              label: "Korea (Democratic People's Republic of)",
            },
            {
              value: 'KR',
              label: 'Korea (Republic of)',
            },
            {
              value: 'KW',
              label: 'Kuwait',
            },
            {
              value: 'KG',
              label: 'Kyrgyzstan',
            },
            {
              value: 'LA',
              label: "Lao People's Democratic Republic",
            },
            {
              value: 'LV',
              label: 'Latvia',
            },
            {
              value: 'LB',
              label: 'Lebanon',
            },
            {
              value: 'LS',
              label: 'Lesotho',
            },
            {
              value: 'LR',
              label: 'Liberia',
            },
            {
              value: 'LY',
              label: 'Libya',
            },
            {
              value: 'LI',
              label: 'Liechtenstein',
            },
            {
              value: 'LT',
              label: 'Lithuania',
            },
            {
              value: 'LU',
              label: 'Luxembourg',
            },
            {
              value: 'MO',
              label: 'Macao',
            },
            {
              value: 'MG',
              label: 'Madagascar',
            },
            {
              value: 'MW',
              label: 'Malawi',
            },
            {
              value: 'MY',
              label: 'Malaysia',
            },
            {
              value: 'MV',
              label: 'Maldives',
            },
            {
              value: 'ML',
              label: 'Mali',
            },
            {
              value: 'MT',
              label: 'Malta',
            },
            {
              value: 'MH',
              label: 'Marshall Islands',
            },
            {
              value: 'MQ',
              label: 'Martinique',
            },
            {
              value: 'MR',
              label: 'Mauritania',
            },
            {
              value: 'MU',
              label: 'Mauritius',
            },
            {
              value: 'YT',
              label: 'Mayotte',
            },
            {
              value: 'MX',
              label: 'Mexico',
            },
            {
              value: 'FM',
              label: 'Micronesia (Federated States of)',
            },
            {
              value: 'MD',
              label: 'Moldova (Republic of)',
            },
            {
              value: 'MC',
              label: 'Monaco',
            },
            {
              value: 'MN',
              label: 'Mongolia',
            },
            {
              value: 'ME',
              label: 'Montenegro',
            },
            {
              value: 'MS',
              label: 'Montserrat',
            },
            {
              value: 'MA',
              label: 'Morocco',
            },
            {
              value: 'MZ',
              label: 'Mozambique',
            },
            {
              value: 'MM',
              label: 'Myanmar',
            },
            {
              value: 'NA',
              label: 'Namibia',
            },
            {
              value: 'NR',
              label: 'Nauru',
            },
            {
              value: 'NP',
              label: 'Nepal',
            },
            {
              value: 'NL',
              label: 'Netherlands',
            },
            {
              value: 'NC',
              label: 'New Caledonia',
            },
            {
              value: 'NZ',
              label: 'New Zealand',
            },
            {
              value: 'NI',
              label: 'Nicaragua',
            },
            {
              value: 'NE',
              label: 'Niger',
            },
            {
              value: 'NG',
              label: 'Nigeria',
            },
            {
              value: 'NU',
              label: 'Niue',
            },
            {
              value: 'NF',
              label: 'Norfolk Island',
            },
            {
              value: 'MK',
              label: 'North Macedonia',
            },
            {
              value: 'MP',
              label: 'Northern Mariana Islands',
            },
            {
              value: 'NO',
              label: 'Norway',
            },
            {
              value: 'OM',
              label: 'Oman',
            },
            {
              value: 'PK',
              label: 'Pakistan',
            },
            {
              value: 'PW',
              label: 'Palau',
            },
            {
              value: 'PS',
              label: 'Palestine, State of',
            },
            {
              value: 'PA',
              label: 'Panama',
            },
            {
              value: 'PG',
              label: 'Papua New Guinea',
            },
            {
              value: 'PY',
              label: 'Paraguay',
            },
            {
              value: 'PE',
              label: 'Peru',
            },
            {
              value: 'PH',
              label: 'Philippines',
            },
            {
              value: 'PN',
              label: 'Pitcairn',
            },
            {
              value: 'PL',
              label: 'Poland',
            },
            {
              value: 'PT',
              label: 'Portugal',
            },
            {
              value: 'PR',
              label: 'Puerto Rico',
            },
            {
              value: 'QA',
              label: 'Qatar',
            },
            {
              value: 'RE',
              label: 'Réunion',
            },
            {
              value: 'RO',
              label: 'Romania',
            },
            {
              value: 'RU',
              label: 'Russian Federation',
            },
            {
              value: 'RW',
              label: 'Rwanda',
            },
            {
              value: 'BL',
              label: 'Saint Barthélemy',
            },
            {
              value: 'SH',
              label: 'Saint Helena, Ascension and Tristan da Cunha',
            },
            {
              value: 'KN',
              label: 'Saint Kitts and Nevis',
            },
            {
              value: 'LC',
              label: 'Saint Lucia',
            },
            {
              value: 'MF',
              label: 'Saint Martin (French part)',
            },
            {
              value: 'PM',
              label: 'Saint Pierre and Miquelon',
            },
            {
              value: 'VC',
              label: 'Saint Vincent and the Grenadines',
            },
            {
              value: 'WS',
              label: 'Samoa',
            },
            {
              value: 'SM',
              label: 'San Marino',
            },
            {
              value: 'ST',
              label: 'Sao Tome and Principe',
            },
            {
              value: 'SA',
              label: 'Saudi Arabia',
            },
            {
              value: 'SN',
              label: 'Senegal',
            },
            {
              value: 'RS',
              label: 'Serbia',
            },
            {
              value: 'SC',
              label: 'Seychelles',
            },
            {
              value: 'SL',
              label: 'Sierra Leone',
            },
            {
              value: 'SG',
              label: 'Singapore',
            },
            {
              value: 'SX',
              label: 'Sint Maarten (Dutch part)',
            },
            {
              value: 'SK',
              label: 'Slovakia',
            },
            {
              value: 'SI',
              label: 'Slovenia',
            },
            {
              value: 'SB',
              label: 'Solomon Islands',
            },
            {
              value: 'SO',
              label: 'Somalia',
            },
            {
              value: 'ZA',
              label: 'South Africa',
            },
            {
              value: 'GS',
              label: 'South Georgia and the South Sandwich Islands',
            },
            {
              value: 'SS',
              label: 'South Sudan',
            },
            {
              value: 'ES',
              label: 'Spain',
            },
            {
              value: 'LK',
              label: 'Sri Lanka',
            },
            {
              value: 'SD',
              label: 'Sudan',
            },
            {
              value: 'SR',
              label: 'Suriname',
            },
            {
              value: 'SJ',
              label: 'Svalbard and Jan Mayen',
            },
            {
              value: 'SE',
              label: 'Sweden',
            },
            {
              value: 'CH',
              label: 'Switzerland',
            },
            {
              value: 'SY',
              label: 'Syrian Arab Republic',
            },
            {
              value: 'TW',
              label: 'Taiwan',
            },
            {
              value: 'TJ',
              label: 'Tajikistan',
            },
            {
              value: 'TZ',
              label: 'Tanzania, United Republic of',
            },
            {
              value: 'TH',
              label: 'Thailand',
            },
            {
              value: 'TL',
              label: 'Timor-Leste',
            },
            {
              value: 'TG',
              label: 'Togo',
            },
            {
              value: 'TK',
              label: 'Tokelau',
            },
            {
              value: 'TO',
              label: 'Tonga',
            },
            {
              value: 'TT',
              label: 'Trinidad and Tobago',
            },
            {
              value: 'TN',
              label: 'Tunisia',
            },
            {
              value: 'TR',
              label: 'Turkey',
            },
            {
              value: 'TM',
              label: 'Turkmenistan',
            },
            {
              value: 'TC',
              label: 'Turks and Caicos Islands',
            },
            {
              value: 'TV',
              label: 'Tuvalu',
            },
            {
              value: 'UG',
              label: 'Uganda',
            },
            {
              value: 'UA',
              label: 'Ukraine',
            },
            {
              value: 'AE',
              label: 'United Arab Emirates',
            },
            {
              value: 'GB',
              label: 'United Kingdom of Great Britain and Northern Ireland',
            },
            {
              value: 'UM',
              label: 'United States Minor Outlying Islands',
            },
            {
              value: 'UY',
              label: 'Uruguay',
            },
            {
              value: 'UZ',
              label: 'Uzbekistan',
            },
            {
              value: 'VU',
              label: 'Vanuatu',
            },
            {
              value: 'VE',
              label: 'Venezuela (Bolivarian Republic of)',
            },
            {
              value: 'VN',
              label: 'Viet Nam',
            },
            {
              value: 'VG',
              label: 'Virgin Islands (British)',
            },
            {
              value: 'VI',
              label: 'Virgin Islands (U.S.)',
            },
            {
              value: 'WF',
              label: 'Wallis and Futuna',
            },
            {
              value: 'EH',
              label: 'Western Sahara',
            },
            {
              value: 'YE',
              label: 'Yemen',
            },
            {
              value: 'ZM',
              label: 'Zambia',
            },
            {
              value: 'ZW',
              label: 'Zimbabwe',
            },
          ],
        },
        type: 'string',
      },
    },
    required: ['country'],
  },
  EmailCredential: {
    $id: 'EmailCredential',
    type: 'object',
    properties: {
      email: {
        format: 'email',
        description: 'Standard, valid email address format.',
        examples: ['test@verified.inc', 'you+me@piedpiper.net'],
        title: 'Email',
        displayFormat: 'String',
        input: {
          type: 'Email',
        },
        type: 'string',
      },
    },
    required: ['email'],
  },
  FacialImageCredential: {
    $id: 'FacialImageCredential',
    type: 'object',
    properties: {
      image: {
        format: 'dataUriBase64Image',
        description:
          'Base64 encoded facial image with the Data URI scheme prefix, i.e. data:image/<format>;base64,<encoded-data>',
        examples: [
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
        ],
        title: 'Facial Image',
        displayFormat: 'Image',
        input: {
          type: 'Image',
        },
        type: 'string',
      },
    },
    required: ['image'],
  },
  FirstNameCredential: {
    $id: 'FirstNameCredential',
    type: 'object',
    properties: {
      firstName: {
        description: "A person's first name",
        examples: ['John', 'Mary Kate'],
        title: 'First Name',
        displayFormat: 'String',
        input: {
          type: 'Text',
        },
        type: 'string',
      },
    },
    required: ['firstName'],
  },
  GenderCredential: {
    $id: 'GenderCredential',
    type: 'object',
    properties: {
      gender: {
        format: 'gender',
        description: "A person's gender",
        examples: ['Male', 'Female', 'Other', 'Non-Binary'],
        title: 'Gender',
        displayFormat: 'String',
        input: {
          type: 'Select',
          options: ['Male', 'Female', 'Non-Binary', 'Other'],
        },
        type: 'string',
      },
    },
    required: ['gender'],
  },
  LastNameCredential: {
    $id: 'LastNameCredential',
    type: 'object',
    properties: {
      lastName: {
        description: "A person's last name",
        examples: ['Smith', 'Garcia-Tony'],
        title: 'Last Name',
        displayFormat: 'String',
        input: {
          type: 'Text',
        },
        type: 'string',
      },
    },
    required: ['lastName'],
  },
  MiddleNameCredential: {
    $id: 'MiddleNameCredential',
    type: 'object',
    properties: {
      middleName: {
        description: "A person's middle name",
        examples: ['Henry', 'Fitzgerald'],
        title: 'Middle Name',
        displayFormat: 'String',
        input: {
          type: 'Text',
        },
        type: 'string',
      },
    },
    required: ['middleName'],
  },
  NationalityCredential: {
    $id: 'NationalityCredential',
    type: 'object',
    properties: {
      nationality: {
        format: 'iso3361Alpha2',
        description:
          "A person's birth country or country of citizenship in ISO 3166-1 alpha-2 format.",
        examples: ['US', 'CA', 'MX'],
        title: 'Nationality',
        displayFormat: 'String',
        input: {
          type: 'Select',
          options: [
            {
              value: 'US',
              label: 'United States of America',
            },
            {
              value: 'CA',
              label: 'Canada',
            },
            {
              value: 'AF',
              label: 'Afghanistan',
            },
            {
              value: 'AL',
              label: 'Albania',
            },
            {
              value: 'DZ',
              label: 'Algeria',
            },
            {
              value: 'AS',
              label: 'American Samoa',
            },
            {
              value: 'AD',
              label: 'Andorra',
            },
            {
              value: 'AO',
              label: 'Angola',
            },
            {
              value: 'AI',
              label: 'Anguilla',
            },
            {
              value: 'AQ',
              label: 'Antarctica',
            },
            {
              value: 'AG',
              label: 'Antigua and Barbuda',
            },
            {
              value: 'AR',
              label: 'Argentina',
            },
            {
              value: 'AM',
              label: 'Armenia',
            },
            {
              value: 'AW',
              label: 'Aruba',
            },
            {
              value: 'AU',
              label: 'Australia',
            },
            {
              value: 'AT',
              label: 'Austria',
            },
            {
              value: 'AZ',
              label: 'Azerbaijan',
            },
            {
              value: 'BS',
              label: 'Bahamas',
            },
            {
              value: 'BH',
              label: 'Bahrain',
            },
            {
              value: 'BD',
              label: 'Bangladesh',
            },
            {
              value: 'BB',
              label: 'Barbados',
            },
            {
              value: 'BY',
              label: 'Belarus',
            },
            {
              value: 'BE',
              label: 'Belgium',
            },
            {
              value: 'BZ',
              label: 'Belize',
            },
            {
              value: 'BJ',
              label: 'Benin',
            },
            {
              value: 'BM',
              label: 'Bermuda',
            },
            {
              value: 'BT',
              label: 'Bhutan',
            },
            {
              value: 'BO',
              label: 'Bolivia (Plurinational State of)',
            },
            {
              value: 'BQ',
              label: 'Bonaire, Sint Eustatius and Saba',
            },
            {
              value: 'BA',
              label: 'Bosnia and Herzegovina',
            },
            {
              value: 'BW',
              label: 'Botswana',
            },
            {
              value: 'BV',
              label: 'Bouvet Island',
            },
            {
              value: 'BR',
              label: 'Brazil',
            },
            {
              value: 'IO',
              label: 'British Indian Ocean Territory',
            },
            {
              value: 'BN',
              label: 'Brunei Darussalam',
            },
            {
              value: 'BG',
              label: 'Bulgaria',
            },
            {
              value: 'BF',
              label: 'Burkina Faso',
            },
            {
              value: 'BI',
              label: 'Burundi',
            },
            {
              value: 'CV',
              label: 'Cabo Verde',
            },
            {
              value: 'KH',
              label: 'Cambodia',
            },
            {
              value: 'CM',
              label: 'Cameroon',
            },
            {
              value: 'KY',
              label: 'Cayman Islands',
            },
            {
              value: 'CF',
              label: 'Central African Republic',
            },
            {
              value: 'TD',
              label: 'Chad',
            },
            {
              value: 'CL',
              label: 'Chile',
            },
            {
              value: 'CN',
              label: 'China',
            },
            {
              value: 'CX',
              label: 'Christmas Island',
            },
            {
              value: 'CC',
              label: 'Cocos (Keeling) Islands',
            },
            {
              value: 'CO',
              label: 'Colombia',
            },
            {
              value: 'KM',
              label: 'Comoros',
            },
            {
              value: 'CG',
              label: 'Congo',
            },
            {
              value: 'CD',
              label: 'Congo (Democratic Republic of the)',
            },
            {
              value: 'CK',
              label: 'Cook Islands',
            },
            {
              value: 'CR',
              label: 'Costa Rica',
            },
            {
              value: 'CI',
              label: "Côte d'Ivoire",
            },
            {
              value: 'HR',
              label: 'Croatia',
            },
            {
              value: 'CU',
              label: 'Cuba',
            },
            {
              value: 'CW',
              label: 'Curaçao',
            },
            {
              value: 'CY',
              label: 'Cyprus',
            },
            {
              value: 'CZ',
              label: 'Czechia',
            },
            {
              value: 'DK',
              label: 'Denmark',
            },
            {
              value: 'DJ',
              label: 'Djibouti',
            },
            {
              value: 'DM',
              label: 'Dominica',
            },
            {
              value: 'DO',
              label: 'Dominican Republic',
            },
            {
              value: 'EC',
              label: 'Ecuador',
            },
            {
              value: 'EG',
              label: 'Egypt',
            },
            {
              value: 'SV',
              label: 'El Salvador',
            },
            {
              value: 'GQ',
              label: 'Equatorial Guinea',
            },
            {
              value: 'ER',
              label: 'Eritrea',
            },
            {
              value: 'EE',
              label: 'Estonia',
            },
            {
              value: 'SZ',
              label: 'Eswatini',
            },
            {
              value: 'ET',
              label: 'Ethiopia',
            },
            {
              value: 'FK',
              label: 'Falkland Islands (Malvinas)',
            },
            {
              value: 'FO',
              label: 'Faroe Islands',
            },
            {
              value: 'FJ',
              label: 'Fiji',
            },
            {
              value: 'FI',
              label: 'Finland',
            },
            {
              value: 'FR',
              label: 'France',
            },
            {
              value: 'GF',
              label: 'French Guiana',
            },
            {
              value: 'PF',
              label: 'French Polynesia',
            },
            {
              value: 'TF',
              label: 'French Southern Territories',
            },
            {
              value: 'GA',
              label: 'Gabon',
            },
            {
              value: 'GM',
              label: 'Gambia',
            },
            {
              value: 'GE',
              label: 'Georgia',
            },
            {
              value: 'DE',
              label: 'Germany',
            },
            {
              value: 'GH',
              label: 'Ghana',
            },
            {
              value: 'GI',
              label: 'Gibraltar',
            },
            {
              value: 'GR',
              label: 'Greece',
            },
            {
              value: 'GL',
              label: 'Greenland',
            },
            {
              value: 'GD',
              label: 'Grenada',
            },
            {
              value: 'GP',
              label: 'Guadeloupe',
            },
            {
              value: 'GU',
              label: 'Guam',
            },
            {
              value: 'GT',
              label: 'Guatemala',
            },
            {
              value: 'GG',
              label: 'Guernsey',
            },
            {
              value: 'GN',
              label: 'Guinea',
            },
            {
              value: 'GW',
              label: 'Guinea-Bissau',
            },
            {
              value: 'GY',
              label: 'Guyana',
            },
            {
              value: 'HT',
              label: 'Haiti',
            },
            {
              value: 'HM',
              label: 'Heard Island and McDonald Islands',
            },
            {
              value: 'VA',
              label: 'Holy See',
            },
            {
              value: 'HN',
              label: 'Honduras',
            },
            {
              value: 'HK',
              label: 'Hong Kong',
            },
            {
              value: 'HU',
              label: 'Hungary',
            },
            {
              value: 'IS',
              label: 'Iceland',
            },
            {
              value: 'IN',
              label: 'India',
            },
            {
              value: 'ID',
              label: 'Indonesia',
            },
            {
              value: 'IR',
              label: 'Iran (Islamic Republic of)',
            },
            {
              value: 'IQ',
              label: 'Iraq',
            },
            {
              value: 'IE',
              label: 'Ireland',
            },
            {
              value: 'IM',
              label: 'Isle of Man',
            },
            {
              value: 'IL',
              label: 'Israel',
            },
            {
              value: 'IT',
              label: 'Italy',
            },
            {
              value: 'JM',
              label: 'Jamaica',
            },
            {
              value: 'JP',
              label: 'Japan',
            },
            {
              value: 'JE',
              label: 'Jersey',
            },
            {
              value: 'JO',
              label: 'Jordan',
            },
            {
              value: 'KZ',
              label: 'Kazakhstan',
            },
            {
              value: 'KE',
              label: 'Kenya',
            },
            {
              value: 'KI',
              label: 'Kiribati',
            },
            {
              value: 'KP',
              label: "Korea (Democratic People's Republic of)",
            },
            {
              value: 'KR',
              label: 'Korea (Republic of)',
            },
            {
              value: 'KW',
              label: 'Kuwait',
            },
            {
              value: 'KG',
              label: 'Kyrgyzstan',
            },
            {
              value: 'LA',
              label: "Lao People's Democratic Republic",
            },
            {
              value: 'LV',
              label: 'Latvia',
            },
            {
              value: 'LB',
              label: 'Lebanon',
            },
            {
              value: 'LS',
              label: 'Lesotho',
            },
            {
              value: 'LR',
              label: 'Liberia',
            },
            {
              value: 'LY',
              label: 'Libya',
            },
            {
              value: 'LI',
              label: 'Liechtenstein',
            },
            {
              value: 'LT',
              label: 'Lithuania',
            },
            {
              value: 'LU',
              label: 'Luxembourg',
            },
            {
              value: 'MO',
              label: 'Macao',
            },
            {
              value: 'MG',
              label: 'Madagascar',
            },
            {
              value: 'MW',
              label: 'Malawi',
            },
            {
              value: 'MY',
              label: 'Malaysia',
            },
            {
              value: 'MV',
              label: 'Maldives',
            },
            {
              value: 'ML',
              label: 'Mali',
            },
            {
              value: 'MT',
              label: 'Malta',
            },
            {
              value: 'MH',
              label: 'Marshall Islands',
            },
            {
              value: 'MQ',
              label: 'Martinique',
            },
            {
              value: 'MR',
              label: 'Mauritania',
            },
            {
              value: 'MU',
              label: 'Mauritius',
            },
            {
              value: 'YT',
              label: 'Mayotte',
            },
            {
              value: 'MX',
              label: 'Mexico',
            },
            {
              value: 'FM',
              label: 'Micronesia (Federated States of)',
            },
            {
              value: 'MD',
              label: 'Moldova (Republic of)',
            },
            {
              value: 'MC',
              label: 'Monaco',
            },
            {
              value: 'MN',
              label: 'Mongolia',
            },
            {
              value: 'ME',
              label: 'Montenegro',
            },
            {
              value: 'MS',
              label: 'Montserrat',
            },
            {
              value: 'MA',
              label: 'Morocco',
            },
            {
              value: 'MZ',
              label: 'Mozambique',
            },
            {
              value: 'MM',
              label: 'Myanmar',
            },
            {
              value: 'NA',
              label: 'Namibia',
            },
            {
              value: 'NR',
              label: 'Nauru',
            },
            {
              value: 'NP',
              label: 'Nepal',
            },
            {
              value: 'NL',
              label: 'Netherlands',
            },
            {
              value: 'NC',
              label: 'New Caledonia',
            },
            {
              value: 'NZ',
              label: 'New Zealand',
            },
            {
              value: 'NI',
              label: 'Nicaragua',
            },
            {
              value: 'NE',
              label: 'Niger',
            },
            {
              value: 'NG',
              label: 'Nigeria',
            },
            {
              value: 'NU',
              label: 'Niue',
            },
            {
              value: 'NF',
              label: 'Norfolk Island',
            },
            {
              value: 'MK',
              label: 'North Macedonia',
            },
            {
              value: 'MP',
              label: 'Northern Mariana Islands',
            },
            {
              value: 'NO',
              label: 'Norway',
            },
            {
              value: 'OM',
              label: 'Oman',
            },
            {
              value: 'PK',
              label: 'Pakistan',
            },
            {
              value: 'PW',
              label: 'Palau',
            },
            {
              value: 'PS',
              label: 'Palestine, State of',
            },
            {
              value: 'PA',
              label: 'Panama',
            },
            {
              value: 'PG',
              label: 'Papua New Guinea',
            },
            {
              value: 'PY',
              label: 'Paraguay',
            },
            {
              value: 'PE',
              label: 'Peru',
            },
            {
              value: 'PH',
              label: 'Philippines',
            },
            {
              value: 'PN',
              label: 'Pitcairn',
            },
            {
              value: 'PL',
              label: 'Poland',
            },
            {
              value: 'PT',
              label: 'Portugal',
            },
            {
              value: 'PR',
              label: 'Puerto Rico',
            },
            {
              value: 'QA',
              label: 'Qatar',
            },
            {
              value: 'RE',
              label: 'Réunion',
            },
            {
              value: 'RO',
              label: 'Romania',
            },
            {
              value: 'RU',
              label: 'Russian Federation',
            },
            {
              value: 'RW',
              label: 'Rwanda',
            },
            {
              value: 'BL',
              label: 'Saint Barthélemy',
            },
            {
              value: 'SH',
              label: 'Saint Helena, Ascension and Tristan da Cunha',
            },
            {
              value: 'KN',
              label: 'Saint Kitts and Nevis',
            },
            {
              value: 'LC',
              label: 'Saint Lucia',
            },
            {
              value: 'MF',
              label: 'Saint Martin (French part)',
            },
            {
              value: 'PM',
              label: 'Saint Pierre and Miquelon',
            },
            {
              value: 'VC',
              label: 'Saint Vincent and the Grenadines',
            },
            {
              value: 'WS',
              label: 'Samoa',
            },
            {
              value: 'SM',
              label: 'San Marino',
            },
            {
              value: 'ST',
              label: 'Sao Tome and Principe',
            },
            {
              value: 'SA',
              label: 'Saudi Arabia',
            },
            {
              value: 'SN',
              label: 'Senegal',
            },
            {
              value: 'RS',
              label: 'Serbia',
            },
            {
              value: 'SC',
              label: 'Seychelles',
            },
            {
              value: 'SL',
              label: 'Sierra Leone',
            },
            {
              value: 'SG',
              label: 'Singapore',
            },
            {
              value: 'SX',
              label: 'Sint Maarten (Dutch part)',
            },
            {
              value: 'SK',
              label: 'Slovakia',
            },
            {
              value: 'SI',
              label: 'Slovenia',
            },
            {
              value: 'SB',
              label: 'Solomon Islands',
            },
            {
              value: 'SO',
              label: 'Somalia',
            },
            {
              value: 'ZA',
              label: 'South Africa',
            },
            {
              value: 'GS',
              label: 'South Georgia and the South Sandwich Islands',
            },
            {
              value: 'SS',
              label: 'South Sudan',
            },
            {
              value: 'ES',
              label: 'Spain',
            },
            {
              value: 'LK',
              label: 'Sri Lanka',
            },
            {
              value: 'SD',
              label: 'Sudan',
            },
            {
              value: 'SR',
              label: 'Suriname',
            },
            {
              value: 'SJ',
              label: 'Svalbard and Jan Mayen',
            },
            {
              value: 'SE',
              label: 'Sweden',
            },
            {
              value: 'CH',
              label: 'Switzerland',
            },
            {
              value: 'SY',
              label: 'Syrian Arab Republic',
            },
            {
              value: 'TW',
              label: 'Taiwan',
            },
            {
              value: 'TJ',
              label: 'Tajikistan',
            },
            {
              value: 'TZ',
              label: 'Tanzania, United Republic of',
            },
            {
              value: 'TH',
              label: 'Thailand',
            },
            {
              value: 'TL',
              label: 'Timor-Leste',
            },
            {
              value: 'TG',
              label: 'Togo',
            },
            {
              value: 'TK',
              label: 'Tokelau',
            },
            {
              value: 'TO',
              label: 'Tonga',
            },
            {
              value: 'TT',
              label: 'Trinidad and Tobago',
            },
            {
              value: 'TN',
              label: 'Tunisia',
            },
            {
              value: 'TR',
              label: 'Turkey',
            },
            {
              value: 'TM',
              label: 'Turkmenistan',
            },
            {
              value: 'TC',
              label: 'Turks and Caicos Islands',
            },
            {
              value: 'TV',
              label: 'Tuvalu',
            },
            {
              value: 'UG',
              label: 'Uganda',
            },
            {
              value: 'UA',
              label: 'Ukraine',
            },
            {
              value: 'AE',
              label: 'United Arab Emirates',
            },
            {
              value: 'GB',
              label: 'United Kingdom of Great Britain and Northern Ireland',
            },
            {
              value: 'UM',
              label: 'United States Minor Outlying Islands',
            },
            {
              value: 'UY',
              label: 'Uruguay',
            },
            {
              value: 'UZ',
              label: 'Uzbekistan',
            },
            {
              value: 'VU',
              label: 'Vanuatu',
            },
            {
              value: 'VE',
              label: 'Venezuela (Bolivarian Republic of)',
            },
            {
              value: 'VN',
              label: 'Viet Nam',
            },
            {
              value: 'VG',
              label: 'Virgin Islands (British)',
            },
            {
              value: 'VI',
              label: 'Virgin Islands (U.S.)',
            },
            {
              value: 'WF',
              label: 'Wallis and Futuna',
            },
            {
              value: 'EH',
              label: 'Western Sahara',
            },
            {
              value: 'YE',
              label: 'Yemen',
            },
            {
              value: 'ZM',
              label: 'Zambia',
            },
            {
              value: 'ZW',
              label: 'Zimbabwe',
            },
          ],
        },
        type: 'string',
      },
    },
    required: ['nationality'],
  },
  PhoneCredential: {
    $id: 'PhoneCredential',
    type: 'object',
    properties: {
      phone: {
        format: 'phone',
        description:
          'A phone number in the E.164 format, [+][country code][number].',
        examples: ['+16175551212', '+14041238686'],
        title: 'Phone',
        displayFormat: 'Phone',
        input: {
          type: 'Phone',
        },
        type: 'string',
      },
    },
    required: ['phone'],
  },
  SexCredential: {
    $id: 'SexCredential',
    type: 'object',
    properties: {
      sex: {
        format: 'gender',
        description: "A person's sex",
        examples: ['Male', 'Female'],
        title: 'Sex',
        displayFormat: 'String',
        input: {
          type: 'Select',
          options: ['Male', 'Female'],
        },
        type: 'string',
      },
    },
    required: ['sex'],
  },
  SsnCredential: {
    $id: 'SsnCredential',
    type: 'object',
    properties: {
      ssn: {
        format: 'ssn',
        description:
          '9 digit social security number, with no dashes, in the format of: 123456789',
        examples: ['123456789', '333224444'],
        title: 'Social Security Number',
        displayFormat: 'SSN',
        input: {
          type: 'SSN',
        },
        type: 'string',
      },
    },
    required: ['ssn'],
  },
  GovernmentIdDocumentImageCredential: {
    $id: 'GovernmentIdDocumentImageCredential',
    type: 'object',
    properties: {
      image: {
        format: 'dataUriBase64Image',
        description:
          'Base64 encoded government identification document image with the Data URI scheme prefix, i.e. data:image/<format>;base64,<encoded-data>',
        examples: [
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
        ],
        title: 'Government Document Image',
        displayFormat: 'Image',
        input: {
          type: 'Image',
        },
        type: 'string',
      },
    },
    required: ['image'],
  },
  GovernmentIdTypeCredential: {
    $id: 'GovernmentIdTypeCredential',
    type: 'object',
    properties: {
      documentType: {
        format: 'documentType',
        description: "A person's government identification document type",
        examples: [
          'Drivers License',
          'Passport',
          'State ID',
          'Military ID',
          'National ID',
          'Birth Certificate',
          'Voter Registration Card',
          'Other',
        ],
        title: 'Government Document Type',
        displayFormat: 'String',
        input: {
          type: 'Select',
          options: [
            'Drivers License',
            'Passport',
            'State ID',
            'Military ID',
            'National ID',
            'Birth Certificate',
            'Voter Registration Card',
            'Other',
          ],
        },
        type: 'string',
      },
    },
    required: ['documentType'],
  },
  GovernmentIdDocumentBackImageCredential: {
    $id: 'GovernmentIdDocumentBackImageCredential',
    type: 'object',
    properties: {
      image: {
        format: 'dataUriBase64Image',
        description:
          'Base64 encoded back of government identification document image with the Data URI scheme prefix, i.e. data:image/<format>;base64,<encoded-data>',
        examples: [
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
        ],
        title: 'Government Document Back Image',
        displayFormat: 'Image',
        input: {
          type: 'Image',
        },
        type: 'string',
      },
    },
    required: ['image'],
  },
  GovernmentIdStateCredential: {
    $id: 'GovernmentIdStateCredential',
    type: 'object',
    properties: {
      state: {
        format: 'iso3166',
        description:
          'The state or province of the government identification document',
        examples: ['US-CA', 'US-NY', 'US-TX', 'GB-ENG'],
        title: 'Government Document Region',
        displayFormat: 'State',
        input: {
          type: 'Select',
          options: [
            'AL',
            'AK',
            'AZ',
            'AR',
            'CA',
            'CO',
            'CT',
            'DE',
            'FL',
            'GA',
            'HI',
            'ID',
            'IL',
            'IN',
            'IA',
            'KS',
            'KY',
            'LA',
            'ME',
            'MD',
            'MA',
            'MI',
            'MN',
            'MS',
            'MO',
            'MT',
            'NE',
            'NV',
            'NH',
            'NJ',
            'NM',
            'NY',
            'NC',
            'ND',
            'OH',
            'OK',
            'OR',
            'PA',
            'RI',
            'SC',
            'SD',
            'TN',
            'TX',
            'UT',
            'VT',
            'VA',
            'WA',
            'WV',
            'WI',
            'WY',
            'DC',
            'AS',
            'GU',
            'MP',
            'PR',
            'UM',
            'VI',
          ],
        },
        type: 'string',
      },
    },
    required: ['state'],
  },
  GovernmentIdNumberCredential: {
    $id: 'GovernmentIdNumberCredential',
    type: 'object',
    properties: {
      idNumber: {
        description:
          'Government identification document number. Note, it can be alphanumeric.',
        examples: ['801322-1117621', 'F4698E1'],
        title: 'Government Document ID',
        displayFormat: 'String',
        type: 'string',
      },
    },
    required: ['idNumber'],
  },
  GovernmentIdIssuanceDateCredential: {
    $id: 'GovernmentIdIssuanceDateCredential',
    type: 'object',
    properties: {
      issuanceDate: {
        format: 'unixMsEpochDayFormat',
        description:
          'Unix time in milliseconds since epoch, or a negative number of milliseconds before the Unix epoch, which equates to 12:00:00:000 UTC of the date',
        examples: ['631195200000', '-331560000000'],
        title: 'Government Document Issuance Date',
        displayFormat: 'Date',
        input: {
          type: 'Date',
        },
        type: 'string',
      },
    },
    required: ['issuanceDate'],
  },
  GovernmentIdExpirationDateCredential: {
    $id: 'GovernmentIdExpirationDateCredential',
    type: 'object',
    properties: {
      expirationDate: {
        format: 'unixMsEpochDayFormat',
        description:
          'Unix time in milliseconds since epoch, or a negative number of milliseconds before the Unix epoch, which equates to 12:00:00:000 UTC of the date',
        examples: ['631195200000', '-331560000000'],
        title: 'Government Document Expiration Date',
        displayFormat: 'Date',
        input: {
          type: 'Date',
        },
        type: 'string',
      },
    },
    required: ['expirationDate'],
  },
  IncomeCurrencyCredential: {
    $id: 'IncomeCurrencyCredential',
    type: 'object',
    properties: {
      currency: {
        format: 'iso4217',
        description: 'ISO4217 currency format.',
        examples: ['USD', 'GBP', 'EUR'],
        title: 'Income Currency',
        displayFormat: 'String',
        input: {
          type: 'Select',
          options: [
            {
              value: 'USD',
              label: 'USD (US Dollar)',
            },
            {
              value: 'CAD',
              label: 'CAD (Canadian Dollar)',
            },
            {
              value: 'AED',
              label: 'AED (UAE Dirham)',
            },
            {
              value: 'AFN',
              label: 'AFN (Afghani)',
            },
            {
              value: 'ALL',
              label: 'ALL (Lek)',
            },
            {
              value: 'AMD',
              label: 'AMD (Armenian Dram)',
            },
            {
              value: 'ANG',
              label: 'ANG (Netherlands Antillean Guilder)',
            },
            {
              value: 'AOA',
              label: 'AOA (Kwanza)',
            },
            {
              value: 'ARS',
              label: 'ARS (Argentine Peso)',
            },
            {
              value: 'AUD',
              label: 'AUD (Australian Dollar)',
            },
            {
              value: 'AWG',
              label: 'AWG (Aruban Florin)',
            },
            {
              value: 'AZN',
              label: 'AZN (Azerbaijan Manat)',
            },
            {
              value: 'BAM',
              label: 'BAM (Convertible Mark)',
            },
            {
              value: 'BBD',
              label: 'BBD (Barbados Dollar)',
            },
            {
              value: 'BDT',
              label: 'BDT (Taka)',
            },
            {
              value: 'BGN',
              label: 'BGN (Bulgarian Lev)',
            },
            {
              value: 'BHD',
              label: 'BHD (Bahraini Dinar)',
            },
            {
              value: 'BIF',
              label: 'BIF (Burundi Franc)',
            },
            {
              value: 'BMD',
              label: 'BMD (Bermudian Dollar)',
            },
            {
              value: 'BND',
              label: 'BND (Brunei Dollar)',
            },
            {
              value: 'BOB',
              label: 'BOB (Boliviano)',
            },
            {
              value: 'BOV',
              label: 'BOV (Mvdol)',
            },
            {
              value: 'BRL',
              label: 'BRL (Brazilian Real)',
            },
            {
              value: 'BSD',
              label: 'BSD (Bahamian Dollar)',
            },
            {
              value: 'BTN',
              label: 'BTN (Ngultrum)',
            },
            {
              value: 'BWP',
              label: 'BWP (Pula)',
            },
            {
              value: 'BYN',
              label: 'BYN (Belarusian Ruble)',
            },
            {
              value: 'BZD',
              label: 'BZD (Belize Dollar)',
            },
            {
              value: 'CDF',
              label: 'CDF (Congolese Franc)',
            },
            {
              value: 'CHE',
              label: 'CHE (WIR Euro)',
            },
            {
              value: 'CHF',
              label: 'CHF (Swiss Franc)',
            },
            {
              value: 'CHW',
              label: 'CHW (WIR Franc)',
            },
            {
              value: 'CLF',
              label: 'CLF (Unidad de Fomento)',
            },
            {
              value: 'CLP',
              label: 'CLP (Chilean Peso)',
            },
            {
              value: 'CNY',
              label: 'CNY (Yuan Renminbi)',
            },
            {
              value: 'COP',
              label: 'COP (Colombian Peso)',
            },
            {
              value: 'COU',
              label: 'COU (Unidad de Valor Real)',
            },
            {
              value: 'CRC',
              label: 'CRC (Costa Rican Colon)',
            },
            {
              value: 'CUC',
              label: 'CUC (Peso Convertible)',
            },
            {
              value: 'CUP',
              label: 'CUP (Cuban Peso)',
            },
            {
              value: 'CVE',
              label: 'CVE (Cabo Verde Escudo)',
            },
            {
              value: 'CZK',
              label: 'CZK (Czech Koruna)',
            },
            {
              value: 'DJF',
              label: 'DJF (Djibouti Franc)',
            },
            {
              value: 'DKK',
              label: 'DKK (Danish Krone)',
            },
            {
              value: 'DOP',
              label: 'DOP (Dominican Peso)',
            },
            {
              value: 'DZD',
              label: 'DZD (Algerian Dinar)',
            },
            {
              value: 'EGP',
              label: 'EGP (Egyptian Pound)',
            },
            {
              value: 'ERN',
              label: 'ERN (Nakfa)',
            },
            {
              value: 'ETB',
              label: 'ETB (Ethiopian Birr)',
            },
            {
              value: 'EUR',
              label: 'EUR (Euro)',
            },
            {
              value: 'FJD',
              label: 'FJD (Fiji Dollar)',
            },
            {
              value: 'FKP',
              label: 'FKP (Falkland Islands Pound)',
            },
            {
              value: 'GBP',
              label: 'GBP (Pound Sterling)',
            },
            {
              value: 'GEL',
              label: 'GEL (Lari)',
            },
            {
              value: 'GHS',
              label: 'GHS (Ghana Cedi)',
            },
            {
              value: 'GIP',
              label: 'GIP (Gibraltar Pound)',
            },
            {
              value: 'GMD',
              label: 'GMD (Dalasi)',
            },
            {
              value: 'GNF',
              label: 'GNF (Guinean Franc)',
            },
            {
              value: 'GTQ',
              label: 'GTQ (Quetzal)',
            },
            {
              value: 'GYD',
              label: 'GYD (Guyana Dollar)',
            },
            {
              value: 'HKD',
              label: 'HKD (Hong Kong Dollar)',
            },
            {
              value: 'HNL',
              label: 'HNL (Lempira)',
            },
            {
              value: 'HRK',
              label: 'HRK (Kuna)',
            },
            {
              value: 'HTG',
              label: 'HTG (Gourde)',
            },
            {
              value: 'HUF',
              label: 'HUF (Forint)',
            },
            {
              value: 'IDR',
              label: 'IDR (Rupiah)',
            },
            {
              value: 'ILS',
              label: 'ILS (New Israeli Sheqel)',
            },
            {
              value: 'INR',
              label: 'INR (Indian Rupee)',
            },
            {
              value: 'IQD',
              label: 'IQD (Iraqi Dinar)',
            },
            {
              value: 'IRR',
              label: 'IRR (Iranian Rial)',
            },
            {
              value: 'ISK',
              label: 'ISK (Iceland Krona)',
            },
            {
              value: 'JMD',
              label: 'JMD (Jamaican Dollar)',
            },
            {
              value: 'JOD',
              label: 'JOD (Jordanian Dinar)',
            },
            {
              value: 'JPY',
              label: 'JPY (Yen)',
            },
            {
              value: 'KES',
              label: 'KES (Kenyan Shilling)',
            },
            {
              value: 'KGS',
              label: 'KGS (Som)',
            },
            {
              value: 'KHR',
              label: 'KHR (Riel)',
            },
            {
              value: 'KMF',
              label: 'KMF (Comoro Franc)',
            },
            {
              value: 'KPW',
              label: 'KPW (North Korean Won)',
            },
            {
              value: 'KRW',
              label: 'KRW (Won)',
            },
            {
              value: 'KWD',
              label: 'KWD (Kuwaiti Dinar)',
            },
            {
              value: 'KYD',
              label: 'KYD (Cayman Islands Dollar)',
            },
            {
              value: 'KZT',
              label: 'KZT (Tenge)',
            },
            {
              value: 'LAK',
              label: 'LAK (Lao Kip)',
            },
            {
              value: 'LBP',
              label: 'LBP (Lebanese Pound)',
            },
            {
              value: 'LKR',
              label: 'LKR (Sri Lanka Rupee)',
            },
            {
              value: 'LRD',
              label: 'LRD (Liberian Dollar)',
            },
            {
              value: 'LSL',
              label: 'LSL (Loti)',
            },
            {
              value: 'LYD',
              label: 'LYD (Libyan Dinar)',
            },
            {
              value: 'MAD',
              label: 'MAD (Moroccan Dirham)',
            },
            {
              value: 'MDL',
              label: 'MDL (Moldovan Leu)',
            },
            {
              value: 'MGA',
              label: 'MGA (Malagasy Ariary)',
            },
            {
              value: 'MKD',
              label: 'MKD (Denar)',
            },
            {
              value: 'MMK',
              label: 'MMK (Kyat)',
            },
            {
              value: 'MNT',
              label: 'MNT (Tugrik)',
            },
            {
              value: 'MOP',
              label: 'MOP (Pataca)',
            },
            {
              value: 'MRU',
              label: 'MRU (Ouguiya)',
            },
            {
              value: 'MUR',
              label: 'MUR (Mauritius Rupee)',
            },
            {
              value: 'MVR',
              label: 'MVR (Rufiyaa)',
            },
            {
              value: 'MWK',
              label: 'MWK (Malawi Kwacha)',
            },
            {
              value: 'MXN',
              label: 'MXN (Mexican Peso)',
            },
            {
              value: 'MXV',
              label: 'MXV (Mexican Unidad de Inversion (UDI))',
            },
            {
              value: 'MYR',
              label: 'MYR (Malaysian Ringgit)',
            },
            {
              value: 'MZN',
              label: 'MZN (Mozambique Metical)',
            },
            {
              value: 'NAD',
              label: 'NAD (Namibia Dollar)',
            },
            {
              value: 'NGN',
              label: 'NGN (Naira)',
            },
            {
              value: 'NIO',
              label: 'NIO (Cordoba Oro)',
            },
            {
              value: 'NOK',
              label: 'NOK (Norwegian Krone)',
            },
            {
              value: 'NPR',
              label: 'NPR (Nepalese Rupee)',
            },
            {
              value: 'NZD',
              label: 'NZD (New Zealand Dollar)',
            },
            {
              value: 'OMR',
              label: 'OMR (Rial Omani)',
            },
            {
              value: 'PAB',
              label: 'PAB (Balboa)',
            },
            {
              value: 'PEN',
              label: 'PEN (Nuevo Sol)',
            },
            {
              value: 'PGK',
              label: 'PGK (Kina)',
            },
            {
              value: 'PHP',
              label: 'PHP (Philippine Peso)',
            },
            {
              value: 'PKR',
              label: 'PKR (Pakistan Rupee)',
            },
            {
              value: 'PLN',
              label: 'PLN (Zloty)',
            },
            {
              value: 'PYG',
              label: 'PYG (Guarani)',
            },
            {
              value: 'QAR',
              label: 'QAR (Qatari Rial)',
            },
            {
              value: 'RON',
              label: 'RON (Romanian Leu)',
            },
            {
              value: 'RSD',
              label: 'RSD (Serbian Dinar)',
            },
            {
              value: 'RUB',
              label: 'RUB (Russian Ruble)',
            },
            {
              value: 'RWF',
              label: 'RWF (Rwanda Franc)',
            },
            {
              value: 'SAR',
              label: 'SAR (Saudi Riyal)',
            },
            {
              value: 'SBD',
              label: 'SBD (Solomon Islands Dollar)',
            },
            {
              value: 'SCR',
              label: 'SCR (Seychelles Rupee)',
            },
            {
              value: 'SDG',
              label: 'SDG (Sudanese Pound)',
            },
            {
              value: 'SEK',
              label: 'SEK (Swedish Krona)',
            },
            {
              value: 'SGD',
              label: 'SGD (Singapore Dollar)',
            },
            {
              value: 'SHP',
              label: 'SHP (Saint Helena Pound)',
            },
            {
              value: 'SLL',
              label: 'SLL (Leone)',
            },
            {
              value: 'SOS',
              label: 'SOS (Somali Shilling)',
            },
            {
              value: 'SRD',
              label: 'SRD (Surinam Dollar)',
            },
            {
              value: 'SSP',
              label: 'SSP (South Sudanese Pound)',
            },
            {
              value: 'STN',
              label: 'STN (Dobra)',
            },
            {
              value: 'SVC',
              label: 'SVC (El Salvador Colon)',
            },
            {
              value: 'SYP',
              label: 'SYP (Syrian Pound)',
            },
            {
              value: 'SZL',
              label: 'SZL (Lilangeni)',
            },
            {
              value: 'THB',
              label: 'THB (Baht)',
            },
            {
              value: 'TJS',
              label: 'TJS (Somoni)',
            },
            {
              value: 'TMT',
              label: 'TMT (Turkmenistan New Manat)',
            },
            {
              value: 'TND',
              label: 'TND (Tunisian Dinar)',
            },
            {
              value: 'TOP',
              label: 'TOP (Pa’anga)',
            },
            {
              value: 'TRY',
              label: 'TRY (Turkish Lira)',
            },
            {
              value: 'TTD',
              label: 'TTD (Trinidad and Tobago Dollar)',
            },
            {
              value: 'TWD',
              label: 'TWD (New Taiwan Dollar)',
            },
            {
              value: 'TZS',
              label: 'TZS (Tanzanian Shilling)',
            },
            {
              value: 'UAH',
              label: 'UAH (Hryvnia)',
            },
            {
              value: 'UGX',
              label: 'UGX (Uganda Shilling)',
            },
            {
              value: 'UYI',
              label: 'UYI (Uruguay Peso en Unidades Indexadas (URUIURUI))',
            },
            {
              value: 'UYU',
              label: 'UYU (Peso Uruguayo)',
            },
            {
              value: 'UYW',
              label: 'UYW (Unidad Previsional)',
            },
            {
              value: 'UZS',
              label: 'UZS (Uzbekistan Sum)',
            },
            {
              value: 'VED',
              label: 'VED (Bolívar Soberano)',
            },
            {
              value: 'VEF',
              label: 'VEF (Bolívar Soberano)',
            },
            {
              value: 'VND',
              label: 'VND (Dong)',
            },
            {
              value: 'VUV',
              label: 'VUV (Vatu)',
            },
            {
              value: 'WST',
              label: 'WST (Tala)',
            },
            {
              value: 'XAF',
              label: 'XAF (CFA Franc BEAC)',
            },
            {
              value: 'XCD',
              label: 'XCD (East Caribbean Dollar)',
            },
            {
              value: 'XDR',
              label: 'XDR (SDR (Special Drawing Right))',
            },
            {
              value: 'XOF',
              label: 'XOF (CFA Franc BCEAO)',
            },
            {
              value: 'XPF',
              label: 'XPF (CFP Franc)',
            },
            {
              value: 'XSU',
              label: 'XSU (Sucre)',
            },
            {
              value: 'XUA',
              label: 'XUA (ADB Unit of Account)',
            },
            {
              value: 'YER',
              label: 'YER (Yemeni Rial)',
            },
            {
              value: 'ZAR',
              label: 'ZAR (Rand)',
            },
            {
              value: 'ZMW',
              label: 'ZMW (Zambian Kwacha)',
            },
            {
              value: 'ZWL',
              label: 'ZWL (Zimbabwe Dollar)',
            },
          ],
        },
        type: 'string',
      },
    },
    required: ['currency'],
  },
  AnnualIncomeRangeCredential: {
    $id: 'AnnualIncomeRangeCredential',
    type: 'object',
    properties: {
      income: {
        format: 'iso4217AmountRange',
        description:
          'Annual income range with the preceding ISO4217 currency code followed by min<value>_max<value>.',
        examples: ['USD min100000_max200000', 'GBP min40000_max50000'],
        title: 'Annual Income Range',
        displayFormat: 'CurrencyRange',
        input: {
          type: 'Select',
          options: [
            {
              value: 'USD min0_max25000',
              label: 'Under $25,000',
            },
            {
              value: 'USD min25000_max50000',
              label: '$25,000 - $50,000',
            },
            {
              value: 'USD min50000_max100000',
              label: '$50,000 - $100,000',
            },
            {
              value: 'USD min100000_max200000',
              label: '$100,000 - $200,000',
            },
            {
              value: 'USD min200000_max300000',
              label: '$200,000 - $300,000',
            },
            {
              value: 'USD min300000_max500000',
              label: '$300,000 - $500,000',
            },
            {
              value: 'USD min500000_max1200000',
              label: '$500,000 - $1,200,000',
            },
            {
              value: 'USD min1200000_max9999999',
              label: '$1,200,000 - $9,999,999',
            },
          ],
        },
        type: 'string',
      },
    },
    required: ['income'],
  },
} as any;

export function CredentialRequestsEditorProvider(
  props: PropsWithChildren,
): React.JSX.Element {
  const form = useForm({
    defaultValues: {
      credentialRequests: [],
    },
  });
  return (
    <FormProvider {...form}>
      <Context.Provider value={{ credentialRequests: [], schemas: schemas }}>
        {props.children}
      </Context.Provider>
    </FormProvider>
  );
}
