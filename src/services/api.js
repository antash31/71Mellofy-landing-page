// API service layer using the configured axios instance
import { api, setAuthToken, removeAuthToken } from '@/lib/axios';
import { supabase } from '@/utils/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Email accounts services
export const emailAccountsService = {
  getAll: async () => {
    const response = await api.get('/email-accounts');
    return response.data;
  },

  listSmartleadAccounts: async () => {
    const response = await api.post('https://yofoleesojtwibrcfddx.supabase.co/functions/v1/list-smartlead-email-accounts',{},
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  },

  create: async (emailAccountData) => {
    // Use the specific Supabase endpoint for creating email accounts
    // The axios interceptor will automatically add the Authorization header
    const response = await api.post('https://yofoleesojtwibrcfddx.supabase.co/functions/v1/create-email-account', emailAccountData);
    return response.data;
  },

  update: async (id, emailAccountData) => {
    const response = await api.put(`/email-accounts/${id}`, emailAccountData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/email-accounts/${id}`);
    return response.data;
  },

  verify: async (emailAccountData) => {
    // Use the same endpoint as create for verification (since they seem to use the same endpoint)
    // The axios interceptor will automatically add the Authorization header
    const response = await api.post('https://yofoleesojtwibrcfddx.supabase.co/functions/v1/create-email-account', emailAccountData);
    return response.data;
  },
};

// Registration service
export const registrationService = {
  register: async (userData) => {
    const response = await api.post('https://yofoleesojtwibrcfddx.supabase.co/functions/v1/PostRegistrations', userData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvZm9sZWVzb2p0d2licmNmZGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NzUwMTYsImV4cCI6MjA2ODI1MTAxNn0.XMKrB0qx0oGzijMeJUegdmYcAB336rkrAiO2mR0cFrA'
      }
    });
    return response.data;
  },
};

export const campaignService = {

  // Create a campaign functions (Only for create campaign)
  createCampaign: async (campaignData) => {
    const response = await api.post(supabaseUrl + '/functions/v1/POST-Create-Campaign-Edge-Function', campaignData);
    return response.data;
  },

  //To update the campaign schedule
  updateCampaignSchedule: async (campaignSchedule) => {
    const response = await api.post(supabaseUrl + '/functions/v1/POST-Update-Campaign-Schedule-Edge-Function', campaignSchedule);
    return response.data;
  },

  //To update the campaign settings
  updateCampaignSettings: async (campaignSettings) => {
    const response = await api.post(supabaseUrl + '/functions/v1/POST-Update-Campaign-General-Settings-Edge-Function', campaignSettings);
    return response.data;
  },

  //To create the sequence and adding it to the campaign. 
  createSequence: async () => {
    const response = await api.post(supabaseUrl + '/functions/v1/POST-Save-Campaign-Sequence-Edge-Function');
    return response.data;
  },

  //To attach the email account to the campaign
  attachEmailAccountToCampaign: async (campaignData) => {
    const response = await api.post(supabaseUrl + '/functions/v1/POST-Attach-Email-Webhook-to-the-Campaign-Update-Domain', campaignData);
    return response.data;
  },

  // Helper function to build campaign data from form inputs
  buildCampaignData: (formData, selectedEmailAccount) => {
    const timestamp = Date.now();
    const campaignName = `Campaign_${formData.domain}_${timestamp}`;
    
    return {
      campaignName,
      domain: formData.domain,
      emailAccount: selectedEmailAccount,
      targetRegions: formData.targetRegions,
      meetingLink: formData.meetingLink || "",
      createdAt: new Date().toISOString()
    };
  },

  createCampaignTemplate: async (campaignData) => {
    try {
      const campaignResult = await campaignService.createCampaign({ 
        name: campaignData.campaignName 
      });
      
      const parallelCalls = [
        campaignService.updateCampaignSchedule({
          timezone: "Asia/Kolkata",
          days_of_the_week: [1, 2, 3, 4, 5], 
          start_hour: "09:00",
          end_hour: "17:00",
          min_time_btw_emails: 15,
          max_new_leads_per_day: 25
        }),

        campaignService.updateCampaignSettings({}),

        campaignService.createSequence(),

        campaignService.attachEmailAccountToCampaign({
          domain: campaignData.domain,
          meetingLink: campaignData.meetingLink
        })
      ];
      const parallelResults = await Promise.allSettled(parallelCalls);

      const [scheduleResult, settingsResult, sequenceResult, attachResult] = parallelResults;
      
      const failedCalls = parallelResults.filter(result => result.status === 'rejected');
      if (failedCalls.length > 0) {
        console.warn(`${failedCalls.length} parallel API calls failed:`, failedCalls);
      }

      return {
        campaign: campaignResult,
        parallelResults: {
          schedule: scheduleResult,
          settings: settingsResult,
          sequence: sequenceResult,
          attachment: attachResult
        },
        campaignData
      };

    } catch (error) {
      console.error('Error in campaign template creation:', error);
      throw error;
    }
  },

  getCampaignStatus: async () => {
    const response = await api.get(supabaseUrl + '/functions/v1/GET-Campaign-Exists-Check-Edge-Function');
    return response.data;
  },

  getCampaignAnalytics: async () => {
    const response = await api.get(supabaseUrl + '/functions/v1/Get-Campaign-Analytics-');
    return response.data;
  },

  getCampaignLeadStatistics: async (limit = 10, offset = 0) => {
    const response = await api.get(supabaseUrl + `/functions/v1/Get-Campaign-Lead-Statistics?limit=${limit}&offset=${offset}`);
    return response.data;
  },

  getCampaignMailboxStatistics: async () => {
    const response = await api.get(supabaseUrl + '/functions/v1/Get-Campaign-Mailbox-Statistics');
    return response.data;
  },

  takeActionOnCampaign: async (action) => {
    const response = await api.post(supabaseUrl + '/functions/v1/POST-CAMPAIGN-STATUS-UPDATE', { action });
    return response.data;
  }
};

// Location services for countries and states
export const locationService = {
  getAllCountries: async () => {
    // Using a comprehensive static list to avoid CORS issues
    return [
      { code: 'US', code3: 'USA', name: 'United States', flag: '🇺🇸', type: 'country' },
      { code: 'CA', code3: 'CAN', name: 'Canada', flag: '🇨🇦', type: 'country' },
      { code: 'GB', code3: 'GBR', name: 'United Kingdom', flag: '🇬🇧', type: 'country' },
      { code: 'AU', code3: 'AUS', name: 'Australia', flag: '🇦🇺', type: 'country' },
      { code: 'DE', code3: 'DEU', name: 'Germany', flag: '🇩🇪', type: 'country' },
      { code: 'FR', code3: 'FRA', name: 'France', flag: '🇫🇷', type: 'country' },
      { code: 'IN', code3: 'IND', name: 'India', flag: '🇮🇳', type: 'country' },
      { code: 'JP', code3: 'JPN', name: 'Japan', flag: '🇯🇵', type: 'country' },
      { code: 'CN', code3: 'CHN', name: 'China', flag: '🇨🇳', type: 'country' },
      { code: 'BR', code3: 'BRA', name: 'Brazil', flag: '🇧🇷', type: 'country' },
      { code: 'MX', code3: 'MEX', name: 'Mexico', flag: '🇲🇽', type: 'country' },
      { code: 'IT', code3: 'ITA', name: 'Italy', flag: '🇮🇹', type: 'country' },
      { code: 'ES', code3: 'ESP', name: 'Spain', flag: '🇪🇸', type: 'country' },
      { code: 'NL', code3: 'NLD', name: 'Netherlands', flag: '🇳🇱', type: 'country' },
      { code: 'CH', code3: 'CHE', name: 'Switzerland', flag: '🇨🇭', type: 'country' },
      { code: 'SE', code3: 'SWE', name: 'Sweden', flag: '🇸🇪', type: 'country' },
      { code: 'NO', code3: 'NOR', name: 'Norway', flag: '🇳🇴', type: 'country' },
      { code: 'DK', code3: 'DNK', name: 'Denmark', flag: '🇩🇰', type: 'country' },
      { code: 'FI', code3: 'FIN', name: 'Finland', flag: '🇫🇮', type: 'country' },
      { code: 'AT', code3: 'AUT', name: 'Austria', flag: '🇦🇹', type: 'country' },
      { code: 'BE', code3: 'BEL', name: 'Belgium', flag: '🇧🇪', type: 'country' },
      { code: 'IE', code3: 'IRL', name: 'Ireland', flag: '🇮🇪', type: 'country' },
      { code: 'PL', code3: 'POL', name: 'Poland', flag: '🇵🇱', type: 'country' },
      { code: 'PT', code3: 'PRT', name: 'Portugal', flag: '🇵🇹', type: 'country' },
      { code: 'GR', code3: 'GRC', name: 'Greece', flag: '🇬🇷', type: 'country' },
      { code: 'RU', code3: 'RUS', name: 'Russia', flag: '🇷🇺', type: 'country' },
      { code: 'UA', code3: 'UKR', name: 'Ukraine', flag: '🇺🇦', type: 'country' },
      { code: 'KR', code3: 'KOR', name: 'South Korea', flag: '🇰🇷', type: 'country' },
      { code: 'SG', code3: 'SGP', name: 'Singapore', flag: '🇸🇬', type: 'country' },
      { code: 'HK', code3: 'HKG', name: 'Hong Kong', flag: '🇭🇰', type: 'country' },
      { code: 'NZ', code3: 'NZL', name: 'New Zealand', flag: '🇳🇿', type: 'country' },
      { code: 'ZA', code3: 'ZAF', name: 'South Africa', flag: '🇿🇦', type: 'country' },
      { code: 'AR', code3: 'ARG', name: 'Argentina', flag: '🇦🇷', type: 'country' },
      { code: 'CL', code3: 'CHL', name: 'Chile', flag: '🇨🇱', type: 'country' },
      { code: 'CO', code3: 'COL', name: 'Colombia', flag: '🇨🇴', type: 'country' },
      { code: 'PE', code3: 'PER', name: 'Peru', flag: '🇵🇪', type: 'country' },
      { code: 'VE', code3: 'VEN', name: 'Venezuela', flag: '🇻🇪', type: 'country' },
      { code: 'EG', code3: 'EGY', name: 'Egypt', flag: '🇪🇬', type: 'country' },
      { code: 'NG', code3: 'NGA', name: 'Nigeria', flag: '🇳🇬', type: 'country' },
      { code: 'KE', code3: 'KEN', name: 'Kenya', flag: '🇰🇪', type: 'country' },
      { code: 'MA', code3: 'MAR', name: 'Morocco', flag: '🇲🇦', type: 'country' },
      { code: 'TH', code3: 'THA', name: 'Thailand', flag: '🇹🇭', type: 'country' },
      { code: 'VN', code3: 'VNM', name: 'Vietnam', flag: '🇻🇳', type: 'country' },
      { code: 'MY', code3: 'MYS', name: 'Malaysia', flag: '🇲🇾', type: 'country' },
      { code: 'ID', code3: 'IDN', name: 'Indonesia', flag: '🇮🇩', type: 'country' },
      { code: 'PH', code3: 'PHL', name: 'Philippines', flag: '🇵🇭', type: 'country' },
      { code: 'BD', code3: 'BGD', name: 'Bangladesh', flag: '🇧🇩', type: 'country' },
      { code: 'PK', code3: 'PAK', name: 'Pakistan', flag: '🇵🇰', type: 'country' },
      { code: 'LK', code3: 'LKA', name: 'Sri Lanka', flag: '🇱🇰', type: 'country' },
      { code: 'IL', code3: 'ISR', name: 'Israel', flag: '🇮🇱', type: 'country' },
      { code: 'AE', code3: 'ARE', name: 'United Arab Emirates', flag: '🇦🇪', type: 'country' },
      { code: 'SA', code3: 'SAU', name: 'Saudi Arabia', flag: '🇸🇦', type: 'country' },
      { code: 'TR', code3: 'TUR', name: 'Turkey', flag: '🇹🇷', type: 'country' },
      { code: 'IR', code3: 'IRN', name: 'Iran', flag: '🇮🇷', type: 'country' },
      { code: 'IQ', code3: 'IRQ', name: 'Iraq', flag: '🇮🇶', type: 'country' },
    ].sort((a, b) => a.name.localeCompare(b.name));
  },

  getCountryStates: async (countryCode) => {
    // Static state data for major countries to avoid external API dependencies
    const statesData = {
      'US': [
        { code: 'AL', name: 'Alabama', countryCode: 'US', type: 'state' },
        { code: 'AK', name: 'Alaska', countryCode: 'US', type: 'state' },
        { code: 'AZ', name: 'Arizona', countryCode: 'US', type: 'state' },
        { code: 'AR', name: 'Arkansas', countryCode: 'US', type: 'state' },
        { code: 'CA', name: 'California', countryCode: 'US', type: 'state' },
        { code: 'CO', name: 'Colorado', countryCode: 'US', type: 'state' },
        { code: 'CT', name: 'Connecticut', countryCode: 'US', type: 'state' },
        { code: 'DE', name: 'Delaware', countryCode: 'US', type: 'state' },
        { code: 'FL', name: 'Florida', countryCode: 'US', type: 'state' },
        { code: 'GA', name: 'Georgia', countryCode: 'US', type: 'state' },
        { code: 'HI', name: 'Hawaii', countryCode: 'US', type: 'state' },
        { code: 'ID', name: 'Idaho', countryCode: 'US', type: 'state' },
        { code: 'IL', name: 'Illinois', countryCode: 'US', type: 'state' },
        { code: 'IN', name: 'Indiana', countryCode: 'US', type: 'state' },
        { code: 'IA', name: 'Iowa', countryCode: 'US', type: 'state' },
        { code: 'KS', name: 'Kansas', countryCode: 'US', type: 'state' },
        { code: 'KY', name: 'Kentucky', countryCode: 'US', type: 'state' },
        { code: 'LA', name: 'Louisiana', countryCode: 'US', type: 'state' },
        { code: 'ME', name: 'Maine', countryCode: 'US', type: 'state' },
        { code: 'MD', name: 'Maryland', countryCode: 'US', type: 'state' },
        { code: 'MA', name: 'Massachusetts', countryCode: 'US', type: 'state' },
        { code: 'MI', name: 'Michigan', countryCode: 'US', type: 'state' },
        { code: 'MN', name: 'Minnesota', countryCode: 'US', type: 'state' },
        { code: 'MS', name: 'Mississippi', countryCode: 'US', type: 'state' },
        { code: 'MO', name: 'Missouri', countryCode: 'US', type: 'state' },
        { code: 'MT', name: 'Montana', countryCode: 'US', type: 'state' },
        { code: 'NE', name: 'Nebraska', countryCode: 'US', type: 'state' },
        { code: 'NV', name: 'Nevada', countryCode: 'US', type: 'state' },
        { code: 'NH', name: 'New Hampshire', countryCode: 'US', type: 'state' },
        { code: 'NJ', name: 'New Jersey', countryCode: 'US', type: 'state' },
        { code: 'NM', name: 'New Mexico', countryCode: 'US', type: 'state' },
        { code: 'NY', name: 'New York', countryCode: 'US', type: 'state' },
        { code: 'NC', name: 'North Carolina', countryCode: 'US', type: 'state' },
        { code: 'ND', name: 'North Dakota', countryCode: 'US', type: 'state' },
        { code: 'OH', name: 'Ohio', countryCode: 'US', type: 'state' },
        { code: 'OK', name: 'Oklahoma', countryCode: 'US', type: 'state' },
        { code: 'OR', name: 'Oregon', countryCode: 'US', type: 'state' },
        { code: 'PA', name: 'Pennsylvania', countryCode: 'US', type: 'state' },
        { code: 'RI', name: 'Rhode Island', countryCode: 'US', type: 'state' },
        { code: 'SC', name: 'South Carolina', countryCode: 'US', type: 'state' },
        { code: 'SD', name: 'South Dakota', countryCode: 'US', type: 'state' },
        { code: 'TN', name: 'Tennessee', countryCode: 'US', type: 'state' },
        { code: 'TX', name: 'Texas', countryCode: 'US', type: 'state' },
        { code: 'UT', name: 'Utah', countryCode: 'US', type: 'state' },
        { code: 'VT', name: 'Vermont', countryCode: 'US', type: 'state' },
        { code: 'VA', name: 'Virginia', countryCode: 'US', type: 'state' },
        { code: 'WA', name: 'Washington', countryCode: 'US', type: 'state' },
        { code: 'WV', name: 'West Virginia', countryCode: 'US', type: 'state' },
        { code: 'WI', name: 'Wisconsin', countryCode: 'US', type: 'state' },
        { code: 'WY', name: 'Wyoming', countryCode: 'US', type: 'state' },
        { code: 'DC', name: 'District of Columbia', countryCode: 'US', type: 'state' },
      ],
      'CA': [
        { code: 'AB', name: 'Alberta', countryCode: 'CA', type: 'state' },
        { code: 'BC', name: 'British Columbia', countryCode: 'CA', type: 'state' },
        { code: 'MB', name: 'Manitoba', countryCode: 'CA', type: 'state' },
        { code: 'NB', name: 'New Brunswick', countryCode: 'CA', type: 'state' },
        { code: 'NL', name: 'Newfoundland and Labrador', countryCode: 'CA', type: 'state' },
        { code: 'NS', name: 'Nova Scotia', countryCode: 'CA', type: 'state' },
        { code: 'ON', name: 'Ontario', countryCode: 'CA', type: 'state' },
        { code: 'PE', name: 'Prince Edward Island', countryCode: 'CA', type: 'state' },
        { code: 'QC', name: 'Quebec', countryCode: 'CA', type: 'state' },
        { code: 'SK', name: 'Saskatchewan', countryCode: 'CA', type: 'state' },
        { code: 'NT', name: 'Northwest Territories', countryCode: 'CA', type: 'state' },
        { code: 'NU', name: 'Nunavut', countryCode: 'CA', type: 'state' },
        { code: 'YT', name: 'Yukon', countryCode: 'CA', type: 'state' },
      ],
      'AU': [
        { code: 'NSW', name: 'New South Wales', countryCode: 'AU', type: 'state' },
        { code: 'QLD', name: 'Queensland', countryCode: 'AU', type: 'state' },
        { code: 'SA', name: 'South Australia', countryCode: 'AU', type: 'state' },
        { code: 'TAS', name: 'Tasmania', countryCode: 'AU', type: 'state' },
        { code: 'VIC', name: 'Victoria', countryCode: 'AU', type: 'state' },
        { code: 'WA', name: 'Western Australia', countryCode: 'AU', type: 'state' },
        { code: 'ACT', name: 'Australian Capital Territory', countryCode: 'AU', type: 'state' },
        { code: 'NT', name: 'Northern Territory', countryCode: 'AU', type: 'state' },
      ],
      'DE': [
        { code: 'BW', name: 'Baden-Württemberg', countryCode: 'DE', type: 'state' },
        { code: 'BY', name: 'Bavaria', countryCode: 'DE', type: 'state' },
        { code: 'BE', name: 'Berlin', countryCode: 'DE', type: 'state' },
        { code: 'BB', name: 'Brandenburg', countryCode: 'DE', type: 'state' },
        { code: 'HB', name: 'Bremen', countryCode: 'DE', type: 'state' },
        { code: 'HH', name: 'Hamburg', countryCode: 'DE', type: 'state' },
        { code: 'HE', name: 'Hesse', countryCode: 'DE', type: 'state' },
        { code: 'MV', name: 'Mecklenburg-Vorpommern', countryCode: 'DE', type: 'state' },
        { code: 'NI', name: 'Lower Saxony', countryCode: 'DE', type: 'state' },
        { code: 'NW', name: 'North Rhine-Westphalia', countryCode: 'DE', type: 'state' },
        { code: 'RP', name: 'Rhineland-Palatinate', countryCode: 'DE', type: 'state' },
        { code: 'SL', name: 'Saarland', countryCode: 'DE', type: 'state' },
        { code: 'SN', name: 'Saxony', countryCode: 'DE', type: 'state' },
        { code: 'ST', name: 'Saxony-Anhalt', countryCode: 'DE', type: 'state' },
        { code: 'SH', name: 'Schleswig-Holstein', countryCode: 'DE', type: 'state' },
        { code: 'TH', name: 'Thuringia', countryCode: 'DE', type: 'state' },
      ]
    };

    return statesData[countryCode] || [];
  },

  // Combined search for countries and states
  searchLocations: async (query, selectedCountry = null) => {
    try {
      const results = [];
      
      // Get countries
      const countries = await locationService.getAllCountries();
      const filteredCountries = countries.filter(country => 
        country.name.toLowerCase().includes(query.toLowerCase())
      );
      
      results.push(...filteredCountries.slice(0, 10)); // Limit to 10 countries
      
      // If a specific country is selected or query matches a country, get its states
      if (selectedCountry) {
        const states = await locationService.getCountryStates(selectedCountry);
        const filteredStates = states.filter(state => 
          state.name.toLowerCase().includes(query.toLowerCase())
        );
        results.push(...filteredStates.slice(0, 15)); // Limit to 15 states
      } else {
        // Search in major countries' states (US, CA, GB, AU)
        const majorCountries = ['US', 'CA', 'GB', 'AU'];
        for (const countryCode of majorCountries) {
          try {
            const states = await locationService.getCountryStates(countryCode);
            const filteredStates = states.filter(state => 
              state.name.toLowerCase().includes(query.toLowerCase())
            );
            results.push(...filteredStates.slice(0, 5)); // Limit to 5 per country
          } catch (err) {
            // Continue if one country fails
            continue;
          }
        }
      }
      
      return results;
    } catch (error) {
      console.error('Error searching locations:', error);
      return [];
    }
  }
};
