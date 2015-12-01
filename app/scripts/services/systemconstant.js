'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.SystemConstant
 * @description
 * # SystemConstant
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
  .factory('SystemConstant', function () {
    // Service logic
    // ...

    var COUNTRIES = [
      {code: 'AF', name: 'Afghanistan'},
      {code: 'AL', name: 'Albania'},
      {code: 'DZ', name: 'Algeria'},
      {code: 'AS', name: 'American Samoa'},
      {code: 'AD', name: 'Andorra'},
      {code: 'AO', name: 'Angola'},
      {code: 'AI', name: 'Anguilla'},
      {code: 'AQ', name: 'Antarctica'},
      {code: 'AG', name: 'Antigua & Barbuda'},
      {code: 'AR', name: 'Argentina'},
      {code: 'AM', name: 'Armenia'},
      {code: 'AW', name: 'Aruba'},
      {code: 'A', name: 'Australia'},
      {code: 'AT', name: 'Austria'},
      {code: 'AZ', name: 'Azerbaijan'},
      {code: 'BS', name: 'Bahama'},
      {code: 'BH', name: 'Bahrain'},
      {code: 'BD', name: 'Bangladesh'},
      {code: 'BB', name: 'Barbados'},
      {code: 'BY', name: 'Belarus'},
      {code: 'BE', name: 'Belgium'},
      {code: 'BZ', name: 'Belize'},
      {code: 'BJ', name: 'Benin'},
      {code: 'BM', name: 'Bermuda'},
      {code: 'BT', name: 'Bhutan'},
      {code: 'BO', name: 'Bolivia'},
      {code: 'BA', name: 'Bosnia and Herzegovina'},
      {code: 'BW', name: 'Botswana'},
      {code: 'BV', name: 'Bouvet Island'},
      {code: 'BR', name: 'Brazil'},
      {code: 'IO', name: 'British Indian Ocean Territory'},
      {code: 'VG', name: 'British Virgin Islands'},
      {code: 'BN', name: 'Brunei Darussalam'},
      {code: 'BG', name: 'Bulgaria'},
      {code: 'BF', name: 'Burkina Faso'},
      {code: 'BI', name: 'Burundi'},
      {code: 'KH', name: 'Cambodia'},
      {code: 'CM', name: 'Cameroon'},
      {code: 'CA', name: 'Canada'},
      {code: 'CV', name: 'Cape Verde'},
      {code: 'KY', name: 'Cayman Islands'},
      {code: 'CF', name: 'Central African Republic'},
      {code: 'TD', name: 'Chad'},
      {code: 'CL', name: 'Chile'},
      {code: 'CN', name: 'China'},
      {code: 'CX', name: 'Christmas Island'},
      {code: 'CC', name: 'Cocos {code:Keeling) Islands'},
      {code: 'CO', name: 'Colombia'},
      {code: 'KM', name: 'Comoros'},
      {code: 'CG', name: 'Congo'},
      {code: 'CK', name: 'Cook Iislands'},
      {code: 'CR', name: 'Costa Rica'},
      {code: 'HR', name: 'Croatia'},
      {code: 'C', name: 'Cuba'},
      {code: 'CY', name: 'Cyprus'},
      {code: 'CZ', name: 'Czech Republic'},
      {code: 'DK', name: 'Denmark'},
      {code: 'DJ', name: 'Djibouti'},
      {code: 'DM', name: 'Dominica'},
      {code: 'DO', name: 'Dominican Republic'},
      {code: 'TP', name: 'East Timor'},
      {code: 'EC', name: 'Ecuador'},
      {code: 'EG', name: 'Egypt'},
      {code: 'SV', name: 'El Salvador'},
      {code: 'GQ', name: 'Equatorial Guinea'},
      {code: 'ER', name: 'Eritrea'},
      {code: 'EE', name: 'Estonia'},
      {code: 'ET', name: 'Ethiopia'},
      {code: 'FK', name: 'Falkland Islands {code:Malvinas)'},
      {code: 'FO', name: 'Faroe Islands'},
      {code: 'FJ', name: 'Fiji'},
      {code: 'FI', name: 'Finland'},
      {code: 'FR', name: 'France'},
      {code: 'FX', name: 'France, Metropolitan'},
      {code: 'GF', name: 'French Guiana'},
      {code: 'PF', name: 'French Polynesia'},
      {code: 'TF', name: 'French Southern Territories'},
      {code: 'GA', name: 'Gabon'},
      {code: 'GM', name: 'Gambia'},
      {code: 'GE', name: 'Georgia'},
      {code: 'DE', name: 'Germany'},
      {code: 'GH', name: 'Ghana'},
      {code: 'GI', name: 'Gibraltar'},
      {code: 'GR', name: 'Greece'},
      {code: 'GL', name: 'Greenland'},
      {code: 'GD', name: 'Grenada'},
      {code: 'GP', name: 'Guadeloupe'},
      {code: 'G', name: 'Guam'},
      {code: 'GT', name: 'Guatemala'},
      {code: 'GN', name: 'Guinea'},
      {code: 'GW', name: 'Guinea-Bissa'},
      {code: 'GY', name: 'Guyana'},
      {code: 'HT', name: 'Haiti'},
      {code: 'HM', name: 'Heard & McDonald Islands'},
      {code: 'HN', name: 'Honduras'},
      {code: 'HK', name: 'Hong Kong'},
      {code: 'H', name: 'Hungary'},
      {code: 'IS', name: 'Iceland'},
      {code: 'IN', name: 'India'},
      {code: 'ID', name: 'Indonesia'},
      {code: 'IQ', name: 'Iraq'},
      {code: 'IE', name: 'Ireland'},
      {code: 'IR', name: 'Islamic Republic of Iran'},
      {code: 'IL', name: 'Israel'},
      {code: 'IT', name: 'Italy'},
      {code: 'CI', name: 'Ivory Coast'},
      {code: 'JM', name: 'Jamaica'},
      {code: 'JP', name: 'Japan'},
      {code: 'JO', name: 'Jordan'},
      {code: 'KZ', name: 'Kazakhstan'},
      {code: 'KE', name: 'Kenya'},
      {code: 'KI', name: 'Kiribati'},
      {code: 'KP', name: "Korea, Democratic People's Republic of"},
      {code: 'KR', name: 'Korea, Republic of'},
      {code: 'KW', name: 'Kuwait'},
      {code: 'KG', name: 'Kyrgyzstan'},
      {code: 'LA', name: "Lao People's Democratic Republic"},
      {code: 'LV', name: 'Latvia'},
      {code: 'LB', name: 'Lebanon'},
      {code: 'LS', name: 'Lesotho'},
      {code: 'LR', name: 'Liberia'},
      {code: 'LY', name: 'Libyan Arab Jamahiriya'},
      {code: 'LI', name: 'Liechtenstein'},
      {code: 'LT', name: 'Lithuania'},
      {code: 'L', name: 'Luxembourg'},
      {code: 'MO', name: 'Maca'},
      {code: 'MG', name: 'Madagascar'},
      {code: 'MW', name: 'Malawi'},
      {code: 'MY', name: 'Malaysia'},
      {code: 'MV', name: 'Maldives'},
      {code: 'ML', name: 'Mali'},
      {code: 'MT', name: 'Malta'},
      {code: 'MH', name: 'Marshall Islands'},
      {code: 'MQ', name: 'Martinique'},
      {code: 'MR', name: 'Mauritania'},
      {code: 'M', name: 'Mauritius'},
      {code: 'YT', name: 'Mayotte'},
      {code: 'MX', name: 'Mexico'},
      {code: 'FM', name: 'Micronesia'},
      {code: 'MD', name: 'Moldova, Republic of'},
      {code: 'MC', name: 'Monaco'},
      {code: 'MN', name: 'Mongolia'},
      {code: 'MS', name: 'Monserrat'},
      {code: 'MA', name: 'Morocco'},
      {code: 'MZ', name: 'Mozambique'},
      {code: 'MM', name: 'Myanmar'},
      {code: 'NA', name: 'Namibia'},
      {code: 'NR', name: 'Naur'},
      {code: 'NP', name: 'Nepal'},
      {code: 'NL', name: 'Netherlands'},
      {code: 'AN', name: 'Netherlands Antilles'},
      {code: 'NC', name: 'New Caledonia'},
      {code: 'NZ', name: 'New Zealand'},
      {code: 'NI', name: 'Nicaragua'},
      {code: 'NE', name: 'Niger'},
      {code: 'NG', name: 'Nigeria'},
      {code: 'N', name: 'Niue'},
      {code: 'NF', name: 'Norfolk Island'},
      {code: 'MP', name: 'Northern Mariana Islands'},
      {code: 'NO', name: 'Norway'},
      {code: 'OM', name: 'Oman'},
      {code: 'PK', name: 'Pakistan'},
      {code: 'PW', name: 'Pala'},
      {code: 'PA', name: 'Panama'},
      {code: 'PG', name: 'Papua New Guinea'},
      {code: 'PY', name: 'Paraguay'},
      {code: 'PE', name: 'Per'},
      {code: 'PH', name: 'Philippines'},
      {code: 'PN', name: 'Pitcairn'},
      {code: 'PL', name: 'Poland'},
      {code: 'PT', name: 'Portugal'},
      {code: 'PR', name: 'Puerto Rico'},
      {code: 'QA', name: 'Qatar'},
      {code: 'RE', name: 'Reunion'},
      {code: 'RO', name: 'Romania'},
      {code: 'R', name: 'Russian Federation'},
      {code: 'RW', name: 'Rwanda'},
      {code: 'LC', name: 'Saint Lucia'},
      {code: 'WS', name: 'Samoa'},
      {code: 'SM', name: 'San Marino'},
      {code: 'ST', name: 'Sao Tome & Principe'},
      {code: 'SA', name: 'Saudi Arabia'},
      {code: 'SN', name: 'Senegal'},
      {code: 'SC', name: 'Seychelles'},
      {code: 'SL', name: 'Sierra Leone'},
      {code: 'SG', name: 'Singapore'},
      {code: 'SK', name: 'Slovakia'},
      {code: 'SI', name: 'Slovenia'},
      {code: 'SB', name: 'Solomon Islands'},
      {code: 'SO', name: 'Somalia'},
      {code: 'ZA', name: 'South Africa'},
      {code: 'GS', name: 'South Georgia and the South Sandwich Islands'},
      {code: 'ES', name: 'Spain'},
      {code: 'LK', name: 'Sri Lanka'},
      {code: 'SH', name: 'St. Helena'},
      {code: 'KN', name: 'St. Kitts and Nevis'},
      {code: 'PM', name: 'St. Pierre & Miquelon'},
      {code: 'VC', name: 'St. Vincent & the Grenadines'},
      {code: 'SD', name: 'Sudan'},
      {code: 'SR', name: 'Suriname'},
      {code: 'SJ', name: 'Svalbard & Jan Mayen Islands'},
      {code: 'SZ', name: 'Swaziland'},
      {code: 'SE', name: 'Sweden'},
      {code: 'CH', name: 'Switzerland'},
      {code: 'SY', name: 'Syrian Arab Republic'},
      {code: 'TW', name: 'Taiwan, Province of China'},
      {code: 'TJ', name: 'Tajikistan'},
      {code: 'TZ', name: 'Tanzania, United Republic of'},
      {code: 'TH', name: 'Thailand'},
      {code: 'TG', name: 'Togo'},
      {code: 'TK', name: 'Tokela'},
      {code: 'TO', name: 'Tonga'},
      {code: 'TT', name: 'Trinidad & Tobago'},
      {code: 'TN', name: 'Tunisia'},
      {code: 'TR', name: 'Turkey'},
      {code: 'TM', name: 'Turkmenistan'},
      {code: 'TC', name: 'Turks & Caicos Islands'},
      {code: 'TV', name: 'Tuval'},
      {code: 'UG', name: 'Uganda'},
      {code: 'UA', name: 'Ukraine'},
      {code: 'AE', name: 'United Arab Emirates'},
      {code: 'GB', name: 'United Kingdom {code:Great Britain)'},
      {code: 'UM', name: 'United States Minor Outlying Islands'},
      {code: 'US', name: 'United States of America'},
      {code: 'VI', name: 'United States Virgin Islands'},
      {code: 'UY', name: 'Uruguay'}, {code: 'UZ', name: 'Uzbekistan'},
      {code: 'V', name: 'Vanuat'},
      {code: 'VA', name: 'Vatican City State {code:Holy See)'},
      {code: 'VE', name: 'Venezuela'},
      {code: 'VN', name: 'Viet Nam'},
      {code: 'WF', name: 'Wallis & Futuna Islands'},
      {code: 'EH', name: 'Western Sahara'},
      {code: 'YE', name: 'Yemen'},
      {code: 'Y', name: 'Yugoslavia'},
      {code: 'ZR', name: 'Zaire'},
      {code: 'ZM', name: 'Zambia'},
      {code: 'ZW', name: 'Zimbabwe'}
    ];
    var GENDER_TYPE = [
      {code: 'M', name: 'Male'},
      {code: 'F', name: 'Female'},
      {code: 'I', name: 'I prefer not to disclose'}
    ];
    var CAREER_STATUS = [
      {code: '1', name: 'Entry Level'},
      {code: '2', name: 'Senior'},
      {code: '3', name: 'Manager'},
      {code: '4', name: 'Executive'},
      {code: '5', name: 'Retired'}
    ];
    var COMPANY_SIZE = [
      {code: '1', name: 'Self-employed'},
      {code: '2', name: '1-10'},
      {code: '3', name: '11-50'},
      {code: '4', name: '51-200'},
      {code: '5', name: '201-500'},
      {code: '6', name: '501-1000'},
      {code: '7', name: '5001-10,000'},
      {code: '8', name: '10,000+'}
    ];
    var JOB_FUNCTION = [
      {code: '1', name: 'Accounting'},
      {code: '2', name: 'Administrative'},
      {code: '3', name: 'Arts & Design'},
      {code: '4', name: 'Business Development'},
      {code: '5', name: 'Community & Social Services'},
      {code: '6', name: 'Consulting'},
      {code: '7', name: 'Education'},
      {code: '8', name: 'Engineering'},
      {code: '9', name: 'Entrepreneurship'},
      {code: '10', name: 'Finance'},
      {code: '11', name: 'Healthcare Services'},
      {code: '12', name: 'Human Resources'},
      {code: '13', name: 'Information Technology'},
      {code: '14', name: 'Legal'},
      {code: '15', name: 'Marketing'},
      {code: '16', name: 'Media & Communication'},
      {code: '17', name: 'Military & Protective Services'},
      {code: '18', name: 'Operations'},
      {code: '19', name: 'Product Management'},
      {code: '20', name: 'Program & Project Management'},
      {code: '21', name: 'Purchasing'},
      {code: '22', name: 'Quality Assurance'},
      {code: '23', name: 'Real Estate'},
      {code: '24', name: 'Research'},
      {code: '25', name: 'Sales'},
      {code: '26', name: 'Support'}
    ];
    var INDUSTRY = [
      {code: '1', name: 'Accounting'},
      {code: '2', name: 'Apparel & Fashion'},
      {code: '3', name: 'Arts'},
      {code: '4', name: 'Automotive'},
      {code: '5', name: 'Banking & Financial Services'},
      {code: '6', name: 'Civic & Social Organization'},
      {code: '7', name: 'Computer & Consumer Electronics'},
      {code: '8', name: 'Consulting Consumer Goods'},
      {code: '9', name: 'Design'},
      {code: '10', name: 'Education'},
      {code: '11', name: 'Entertainment'},
      {code: '12', name: 'Food & Beverages'},
      {code: '13', name: 'Government'},
      {code: '14', name: 'Health'},
      {code: '15', name: 'Wellness and Fitness'},
      {code: '16', name: 'Hospitality'},
      {code: '17', name: 'HumanResources'},
      {code: '18', name: 'Import and Export'},
      {code: '19', name: 'Information Technology and Services'},
      {code: '20', name: 'Insurance'},
      {code: '21', name: 'Internet'},
      {code: '22', name: 'Law & Legal Services'},
      {code: '23', name: 'Logistics and Supply Chain'},
      {code: '24', name: 'Luxury Goods & Jewelry'},
      {code: '25', name: 'Marketing and Advertising'},
      {code: '26', name: 'Market Research'},
      {code: '27', name: 'Media'},
      {code: '28', name: 'Magazines & Newspapers'},
      {code: '29', name: 'Medical & Healthcare'},
      {code: '30', name: 'Nonprofit Organization'},
      {code: '31', name: 'Photography'},
      {code: '32', name: 'Public Relations and Communications'},
      {code: '33', name: 'Real Estate'},
      {code: '34', name: 'Retail'},
      {code: '35', name: 'Transportation'},
      {code: '36', name: 'Venture Capital & Private Equity'},
      {code: '37', name: 'Wholesale'},
      {code: '38', name: 'Other'}
    ];
    var SOCIAL_TYPE = [
      {code: '1', name: 'Facebook'},
      {code: '2', name: 'Twitter'},
      {code: '3', name: 'Youtube'},
      {code: '4', name: 'Other'},
      {code: '0', name: 'None'}
    ];
    var LINKEDIN_CONNECTION=[
      {code:'1',name:'1-10'},
      {code:'2',name:'11-50'},
      {code:'3',name:'51-100'},
      {code:'4',name:'101-500'},
      {code:'5',name:'500+'}
    ];
    var OTHER_CONNECTION=[
      {code:'1',name:'1-50'},
      {code:'2',name:'51-100'},
      {code:'3',name:'101-500'},
      {code:'4',name:'501-1000'},
      {code:'5',name:'1000+'}
    ];

    var systemConstant = {};
    systemConstant.COUNTRIES = COUNTRIES;
    systemConstant.GENDER_TYPE = GENDER_TYPE;
    systemConstant.CAREER_STATUS = CAREER_STATUS;
    systemConstant.COMPANY_SIZE = COMPANY_SIZE;
    systemConstant.JOB_FUNCTION = JOB_FUNCTION;
    systemConstant.INDUSTRY = INDUSTRY;
    systemConstant.SOCIAL_TYPE = SOCIAL_TYPE;
    systemConstant.LINKEDIN_CONNECTION = LINKEDIN_CONNECTION;
    systemConstant.OTHER_CONNECTION = OTHER_CONNECTION;

    // Public API here
    return systemConstant;
  });
