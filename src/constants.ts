/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const BUSINESS_INFO = {
  name: "Talice Refrigeration",
  phone: "+27 67 983 3968",
  email: "masekobryan2@gmail.com",
  whatsapp: "27679833968",
  address: "South Africa",
};

export const SERVICES: Service[] = [
  {
    id: "fridge-repair",
    title: "Fridge & Cold Room Repair",
    description: "Expert repair services for domestic and commercial fridges and cold rooms.",
    icon: "Refrigerator",
  },
  {
    id: "deep-freezer",
    title: "Deep Freezer Repairs",
    description: "Fast fixes for deep freezers that aren't cooling properly.",
    icon: "Snowflake",
  },
  {
    id: "air-con",
    title: "Air Conditioner Repairs & Installation",
    description: "Professional AC servicing, repair, and new unit installations.",
    icon: "Wind",
  },
  {
    id: "compressor",
    title: "Compressor Replacement",
    description: "Reliable compressor testing and replacement for all major appliances.",
    icon: "Settings",
  },
  {
    id: "washing-machine",
    title: "Washing Machine Repairs",
    description: "Fixing leaks, drum issues, and electrical faults in all washing machine brands.",
    icon: "WashingMachine",
  },
  {
    id: "thermostat",
    title: "Thermostat Replacement",
    description: "Ensuring accurate temperature control with professional thermostat swaps.",
    icon: "Thermometer",
  },
  {
    id: "gas-refill",
    title: "Fridge Gas Refill",
    description: "Safe and efficient refrigerant regassing for optimal cooling performance.",
    icon: "Zap",
  },
  {
    id: "maintenance",
    title: "General Maintenance",
    description: "Preventative checks to keep your appliances running smoother for longer.",
    icon: "Wrench",
  },
];

export const TESTIMONIALS = [
  {
    name: "Sizwe Dlamini",
    rating: 5,
    text: "Talice fixed my double-door fridge in under 2 hours. Very professional and the price was fair. Highly recommend!",
    location: "Soweto"
  },
  {
    name: "Sarah Miller",
    rating: 5,
    text: "Fastest AC installation I've ever seen. The technician arrived on time and cleaned up everything after. Great job!",
    location: "Sandton"
  },
  {
    name: "John Mokoena",
    rating: 5,
    text: "Saved my washing machine when I thought it was dead. Honest technician who didn't try to overcharge me.",
    location: "Midrand"
  }
];

export const GALLERY_IMAGES = [
  { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600", title: "Fridge Repair" },
  { url: "https://images.unsplash.com/photo-1621905252507-b352220264b8?auto=format&fit=crop&q=80&w=600", title: "AC Maintenance" },
  { url: "https://images.unsplash.com/photo-1585962450531-1f9df2ac237e?auto=format&fit=crop&q=80&w=600", title: "Washing Machine" },
  { url: "https://images.unsplash.com/photo-1599690925451-1ae840bd3bbb?auto=format&fit=crop&q=80&w=600", title: "Cold Room Service" },
  { url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=600", title: "Technician Gear" },
  { url: "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?auto=format&fit=crop&q=80&w=600", title: "Professional Tools" },
];
