export interface EmergencyContact {
  city: string
  country: string
  police: string
  ambulance: string
  fire: string
  touristPolice?: string
  embassy?: string
  localHelpline?: string
}

export const emergencyContacts: EmergencyContact[] = [
  {
    city: 'New Delhi',
    country: 'India',
    police: '100',
    ambulance: '102',
    fire: '101',
    touristPolice: '+91-11-2334-1111',
    localHelpline: '1363 (Tourist Helpline)',
  },
  {
    city: 'Mumbai',
    country: 'India',
    police: '100',
    ambulance: '102',
    fire: '101',
    touristPolice: '+91-22-2262-0111',
    localHelpline: '1363 (Tourist Helpline)',
  },
  {
    city: 'Bangalore',
    country: 'India',
    police: '100',
    ambulance: '102',
    fire: '101',
    touristPolice: '+91-80-2294-2555',
    localHelpline: '1363 (Tourist Helpline)',
  },
  {
    city: 'London',
    country: 'United Kingdom',
    police: '999 or 112',
    ambulance: '999 or 112',
    fire: '999 or 112',
    touristPolice: '+44-20-7230-1212 (Met Police)',
  },
  {
    city: 'Paris',
    country: 'France',
    police: '17 or 112',
    ambulance: '15 or 112',
    fire: '18 or 112',
    touristPolice: '+33-1-53-71-53-71',
  },
  {
    city: 'New York',
    country: 'USA',
    police: '911',
    ambulance: '911',
    fire: '911',
    localHelpline: '311 (Non-emergency)',
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    police: '110',
    ambulance: '119',
    fire: '119',
    touristPolice: '+81-3-3501-0110',
    localHelpline: '+81-50-3816-2787 (Japan Visitor Hotline)',
  },
  {
    city: 'Dubai',
    country: 'UAE',
    police: '999',
    ambulance: '998',
    fire: '997',
    touristPolice: '901',
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    police: '999',
    ambulance: '995',
    fire: '995',
    touristPolice: '1800-255-0000',
  },
  {
    city: 'Barcelona',
    country: 'Spain',
    police: '112',
    ambulance: '112',
    fire: '112',
    touristPolice: '+34-932-562-430',
  },
]

export function getEmergencyContactsByCity(city: string): EmergencyContact | undefined {
  return emergencyContacts.find(
    (contact) => contact.city.toLowerCase() === city.toLowerCase()
  )
}
